from flask import Blueprint, current_app, g, jsonify, request
import bcrypt
from email_validator import validate_email, EmailNotValidError
from server.db import connect_to_db, add_user, email_exists, get_user_by_email
from server.auth import encode_auth_token


def get_db(app):
    '''gets the db'''
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_to_db(app.config['DB_NAME'])
    return db


auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    '''Register a new user'''
    json_data = request.get_json()
    if not json_data:
        return jsonify({'error': 'Request body must be json.'}), 400

    if not all(k in json_data for k in ('email', 'password')):
        return jsonify({'error': 'Request must contain email and password'}), 400

    if len(json_data['password']) < 6:
        return jsonify({'error': 'Password must be at least six characters'}), 400

    try:
        v_email = validate_email(json_data['email'])
        email = v_email['email']
    except EmailNotValidError as err:
        return jsonify({'error': str(err)}), 400

    if email_exists(get_db(current_app), email):
        return jsonify({'error': 'A user with that email already exists'}), 400

    json_data['email'] = email

    add_user(get_db(current_app), json_data)
    return jsonify({'message': 'Account created', 'email': json_data['email']}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    '''Log a user in'''
    json_data = request.get_json()
    if not json_data:
        return jsonify({'error': 'Request body must be json.'}), 400

    if not all(k in json_data for k in ('email', 'password')):
        return jsonify({'error': 'Login request must have email and password'}), 400

    result = get_user_by_email(get_db(current_app), json_data['email'])

    # check that user exists
    if result is None:
        return jsonify({'error': 'Invalid email address or password'}), 400

    # verify password
    salt = bytes(result['salt'])
    db_pass = bytes(result['password'])
    req_pass = bcrypt.hashpw(json_data['password'].encode('utf-8'), salt)
    if req_pass != db_pass:
        return jsonify({'error': 'Invalid email address or password'}), 400

    # generate jwt
    auth_token = encode_auth_token(result['id'], current_app.config['SECRET_KEY'])

    return jsonify({
        'email': result['email'],
        'user_id': result['id'],
        'auth_token': auth_token.decode()
    }), 200


@auth_bp.route('/logout')
def logout():
    '''Log a user out'''
    return 'logout'
