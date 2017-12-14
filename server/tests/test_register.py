import psycopg2.extras
import json
from fixtures import temp_app, temp_db


def post_register(user, app):
    return app.post(
        '/auth/register',
        data=json.dumps(user),
        content_type='application/json'
    )

def test_register_user(temp_app, temp_db):
    '''Tests getting a single user.'''
    user = {
        'email': 'krampus@krampus.com',
        'password': 'santa_claus'
    }
    res = post_register(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 201, 'Response code must be 201 - CREATED'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'email' in res_data, 'Response must have email key'
    assert not 'password' in res_data, 'Response must not contain password'
    assert res_data['message'] == 'Account created', 'Message should read "Account created"'

    # ensure the user is in the database
    cursor = temp_db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute('SELECT * FROM users WHERE email = %(email)s', user)
    db_user = cursor.fetchone()
    assert db_user['email'] == 'krampus@krampus.com'
    assert 'id' in db_user
    assert isinstance(db_user['salt'], object)
    assert isinstance(db_user['password'], object)

    cursor.close()


def test_register_fail(temp_app, temp_db):
    '''Tests various registration failure cases'''

    # Tests adding a user with a pre-existing email
    user = {
        'email': 'bmackland@fbi.net',
        'password': 'freeze!',
    }
    res = post_register(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert res_data['error'] == 'A user with that email already exists'

    # Tests adding a user with no email
    user = {'password': 'freeze!'}
    res = post_register(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert res_data['error'] == 'Request must contain email and password'

    # Tests adding a user with no email
    user = {'email': 'cold@freeze.com'}
    res = post_register(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert res_data['error'] == 'Request must contain email and password'

    # Tests registering an account with an invalid email string
    user = {
        'email': 'coldfreeze.com',
        'password': 'testpass',
    }
    res = post_register(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert res_data['error'] == 'The email address is not valid. It must have exactly one @-sign.'

    # Tests submitting a password that's too short
    user = {
        'email': 'user@coldfreeze.com',
        'password': 'qqqqq',
    }
    res = post_register(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert res_data['error'] == 'Password must be at least six characters'
