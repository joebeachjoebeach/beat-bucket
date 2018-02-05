from flask import Blueprint, current_app, g, jsonify, request
import bcrypt
from email_validator import validate_email, EmailNotValidError
from api.db import (get_db, connect_to_db, add_user, email_exists, get_user_by_email,
                    get_user_by_id)
from api.auth import encode_auth_token, decode_auth_token, get_token


auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/auth/register', methods=['POST'])
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

    db_conn = get_db(current_app, g)

    if email_exists(db_conn, email):
        return jsonify({'error': 'A user with that email already exists'}), 400

    json_data['email'] = email

    add_user(db_conn, json_data)
    return jsonify({'message': 'Success', 'email': json_data['email']}), 201


@auth_bp.route('/auth/login', methods=['POST'])
def login():
    '''Log a user in'''
    json_data = request.get_json()
    if not json_data:
        return jsonify({'error': 'Request body must be json.'}), 400

    if not all(k in json_data for k in ('email', 'password')):
        return jsonify({'error': 'Login request must have email and password'}), 400

    db_conn = get_db(current_app, g)

    result = get_user_by_email(db_conn, json_data['email'])

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
        'message': 'Success',
        'email': result['email'],
        'userId': result['id'],
        'authToken': auth_token.decode()
    }), 200


@auth_bp.route('/auth/verify', methods=['GET'])
def verify():
    '''Verifies a jwt'''
    auth_token = get_token(request.headers)
    if not auth_token:
        return jsonify({'error': 'Forbidden: no authentication provided'}), 403

    user_id = decode_auth_token(auth_token, current_app.config['SECRET_KEY'])

    if user_id is None:
        return jsonify({'error': 'Invalid token'}), 403

    db_conn = get_db(current_app, g)
    user = get_user_by_id(db_conn, user_id)
    return jsonify({'message': 'Success', 'userId': user_id, 'email': user['email']})



@auth_bp.route('/auth/logout')
def logout():
    '''Log a user out'''
    return 'logout'
