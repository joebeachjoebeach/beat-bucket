import datetime
from flask import Blueprint, current_app, g, jsonify, request
import bcrypt
from email_validator import validate_email, EmailNotValidError
from api.db import (get_db, connect_to_db, add_user, email_exists, get_user_by_email,
                    get_user_by_id)
from api.auth import (encode_auth_token, decode_auth_token, get_token,
                      get_data_from_token)


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
    access_token = encode_auth_token(
        'access',
        result['id'],
        datetime.timedelta(minutes=30),
        current_app.config['SECRET_KEY']
    )

    refresh_token = encode_auth_token(
        'refresh',
        result['id'],
        datetime.timedelta(weeks=1),
        current_app.config['SECRET_KEY']
    )

    return jsonify({
        'message': 'Success',
        'email': result['email'],
        'userId': result['id'],
        'accessToken': access_token.decode(),
        'refreshToken': refresh_token.decode()
    }), 200


@auth_bp.route('/auth/authenticate', methods=['GET'])
def authenticate():
    ''' Verifies a refresh token and generates an access token '''
    token_data = get_data_from_token(request.headers, current_app.config['SECRET_KEY'])
    if 'error' in token_data:
        return jsonify({'error': token_data['error']}), token_data['status_code']

    if token_data['type'] != 'refresh':
        return jsonify({'error': 'Invalid token'}), 401

    db_conn = get_db(current_app, g)
    user = get_user_by_id(db_conn, token_data['sub'])


    # create new access token
    access_token = encode_auth_token(
        'access',
        token_data['sub'],
        datetime.timedelta(minutes=30),
        current_app.config['SECRET_KEY']
    )

    response_data = {
        'message': 'Success',
        'userId': token_data['sub'],
        'email': user['email'],
        'accessToken': access_token.decode()
    }

    print(token_data['exp'])
    print(datetime.datetime.utcnow())

    # create a new refresh token if the current one is about to expire
    expiry_time = datetime.datetime.fromtimestamp(token_data['exp'])
    time_til_expiry = expiry_time - datetime.datetime.utcnow()
    if time_til_expiry <= datetime.timedelta(minutes=35):
        refresh_token = encode_auth_token(
            'refresh',
            token_data['sub'],
            datetime.timedelta(weeks=1),
            current_app.config['SECRET_KEY']
        )
        response_data['refreshToken'] = refresh_token.decode()

    return jsonify(response_data)
