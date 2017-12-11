import json
from fixtures import temp_app

#
# Tests for /register route
#

def test_register_user(temp_app):
    '''Tests getting a single user.'''
    user = {
        'username': 'krampus',
        'password': 'santa_claus',
        'email': 'naughty@nice.com'
    }
    res = temp_app.post(
        '/register',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 201, 'Response code must be 201 - CREATED'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'username' in res_data, 'Response must have username key'
    assert 'email' in res_data, 'Response must have email key'
    assert not 'password' in res_data, 'Response must not contain password'


def test_register_dupe_username(temp_app):
    '''Tests adding a pre-existing user'''
    user = {
        'username': 'hello',
        'password': 'pass12345',
        'email': 'ciao@hola.com'
    }
    res = temp_app.post(
        '/register',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'Username already taken'


def test_register_caps_dupe_username(temp_app):
    '''Makes sure that usernames are case-insensitive'''
    user = {
        'username': 'hEllo',
        'password': 'pass12345',
        'email': 'ciao@hola.com'
    }
    res = temp_app.post(
        '/register',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'Username already taken'


def test_register_dupe_email(temp_app):
    '''Tests adding a user with a pre-existing email'''
    user = {
        'username': 'fbiagent',
        'password': 'freeze!',
        'email': 'bmackland@fbi.net'
    }
    res = temp_app.post(
        '/register',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'A user with that email already exists'


def test_register_no_email(temp_app):
    '''Tests adding a user with no email'''
    user = {
        'username': 'fbiagent',
        'password': 'freeze!'
    }
    res = temp_app.post(
        '/register',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'Request must contain username, password, and email'


def test_register_no_username(temp_app):
    '''Tests adding a user with no email'''
    user = {
        'password': 'freeze!',
        'email': 'cold@freeze.com'
    }
    res = temp_app.post(
        '/register',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'Request must contain username, password, and email'


def test_register_no_password(temp_app):
    '''Tests adding a user with no email'''
    user = {
        'username': 'newuser',
        'email': 'cold@freeze.com'
    }
    res = temp_app.post(
        '/register',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'Request must contain username, password, and email'


def test_register_invalid_email(temp_app):
    '''Tests registering an account with an invalid email string'''
    user = {
        'username': 'newuser',
        'password': 'testpass',
        'email': 'coldfreeze.com'
    }
    res = temp_app.post(
        '/register',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'The email address is not valid. It must have exactly one @-sign.'


def test_short_password(temp_app):
    '''Tests submitting a password which is too short'''
    user = {
        'username': 'newuser',
        'password': 'qqqqq',
        'email': 'user@coldfreeze.com'
    }
    res = temp_app.post(
        '/register',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be json object'
    assert 'error' in res_data, 'Response must have "error" in the json data'
    assert res_data['error'] == 'Password must be at least six characters'


# def test_invalid_username(temp_app):




def test_login_user(temp_app):
    '''Tests logging in a user.'''
    user = {
        'username': 'hello',
        'password': 'goodbye'
    }
    res = temp_app.post(
        '/login',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 200, 'Response code should be 200 - OK'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert 'username' in res_data, 'Reponse must have username key'
    assert 'user_id' in res_data, 'Response must have user_id key'
    # todo: session?
