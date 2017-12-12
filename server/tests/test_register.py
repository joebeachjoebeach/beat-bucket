import json
from fixtures import temp_app


def post_register(user, app):
    return app.post(
        '/auth/register',
        data=json.dumps(user),
        content_type='application/json'
    )

def test_register_user(temp_app):
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
    assert 'message' in res_data, 'Response should have a message'
    assert res_data['message'] == 'Account created', 'Message should read "Account created"'


def test_register_dupe_email(temp_app):
    '''Tests adding a user with a pre-existing email'''
    user = {
        'email': 'bmackland@fbi.net',
        'password': 'freeze!',
    }
    res = post_register(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'A user with that email already exists'


def test_register_no_email(temp_app):
    '''Tests adding a user with no email'''
    user = {'password': 'freeze!'}
    res = post_register(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'Request must contain email and password'


def test_register_no_password(temp_app):
    '''Tests adding a user with no email'''
    user = {'email': 'cold@freeze.com'}
    res = post_register(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'Request must contain email and password'


def test_register_invalid_email(temp_app):
    '''Tests registering an account with an invalid email string'''
    user = {
        'email': 'coldfreeze.com',
        'password': 'testpass',
    }
    res = post_register(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'The email address is not valid. It must have exactly one @-sign.'


def test_short_password(temp_app):
    '''Tests submitting a password which is too short'''
    user = {
        'email': 'user@coldfreeze.com',
        'password': 'qqqqq',
    }
    res = post_register(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'Password must be at least six characters'
