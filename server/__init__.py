from flask import (Blueprint, current_app, Flask, g, jsonify, make_response, render_template,
                   request, url_for)
import psycopg2
import psycopg2.extras
import bcrypt
from email_validator import validate_email, EmailNotValidError
from server.db import connect_to_db, add_user, email_exists, get_user_by_email


def create_app(**config_overrides):
    '''app factory'''
    app = Flask(__name__, static_folder='../dist', template_folder='../dist')

    app.config.from_object('server.config')
    app.config.update(config_overrides)
    app.register_blueprint(bb)

    @app.teardown_appcontext
    def teardown_db(exception):
        '''Tears down the database connection after a request'''
        db = getattr(g, '_database', None)
        if db is not None:
            db.close()

    return app


def get_db(app):
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_to_db(app.config['DB_NAME'])
    return db


bb = Blueprint('bb', __name__)


@bb.route('/')
def index():
    '''Index'''
    return render_template('index.html')


@bb.route('/register', methods=['POST'])
def register():
    '''Register a new user'''
    json_data = request.get_json()
    if not json_data:
        return make_response(
            jsonify({'error': 'Request body must be json.'}), 400
        )

    if not all(k in json_data for k in ('email', 'password')):
        return make_response(
            jsonify({'error': 'Request must contain email and password'}), 400
        )

    if len(json_data['password']) < 6:
        return make_response(
            jsonify({'error': 'Password must be at least six characters'}), 400
        )

    try:
        v_email = validate_email(json_data['email'])
        email = v_email['email']
    except EmailNotValidError as err:
        return make_response(
            jsonify({'error': str(err)}), 400
        )

    if email_exists(get_db(current_app), email):
        return make_response(
            jsonify({'error': 'A user with that email already exists'}), 400
        )

    json_data['email'] = email

    add_user(get_db(current_app), json_data)
    return jsonify({'message': 'Account created', 'email': json_data['email']}), 201


@bb.route('/login', methods=['POST'])
def login():
    '''Log a user in'''
    json_data = request.get_json()
    if not json_data:
        return make_response(
            jsonify({'error': 'Request body must be json.'}), 400
        )

    if not all(k in json_data for k in ('email', 'password')):
        return make_response(
            jsonify({'error': 'Login request must have email and password'}), 400
        )

    result = get_user_by_email(get_db(current_app), json_data['email'])
    salt = bytes(result['salt'])
    db_pass = bytes(result['password'])
    req_pass = bcrypt.hashpw(json_data['password'].encode('utf-8'), salt)
    if req_pass != db_pass:
        return make_response(
            jsonify({'error': 'Incorrect email or password'})
        )
    return jsonify({
        'email': result['email'],
        'user_id': result['id']
    }), 200


@bb.route('/logout')
def logout():
    '''Log a user out'''
    return render_template('index.html')
