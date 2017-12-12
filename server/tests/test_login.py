import json
from fixtures import temp_app


def login(user, app):
    '''sends login request'''
    return app.post(
        '/login',
        data=json.dumps(user),
        content_type='application/json'
    )


def test_login_user(temp_app):
    '''Tests logging in a user.'''
    user = {
        'email': 'hello@goodbye.com',
        'password': 'goodbye'
    }
    res = login(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200, 'Response code should be 200 - OK'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert 'email' in res_data, 'Reponse must have email key'
    assert 'user_id' in res_data, 'Response must have user_id key'
    assert 'auth_token' in res_data, 'Response must have an auth token'
    assert isinstance(res_data['auth_token'], str)


def test_login_no_email(temp_app):
    '''Tests trying to log in with no email'''
    res = login({'password': 'testpass'}, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response code should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert 'error' in res_data, 'Response should have "error" key'
    assert res_data['error'] == 'Login request must have email and password'


def test_login_no_password(temp_app):
    '''Tests trying to log in with no password'''
    res = login({'email': 'hello@goodbye.com'}, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response code should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert 'error' in res_data, 'Response should have "error" key'
    assert res_data['error'] == 'Login request must have email and password'


def test_login_wrong_password(temp_app):
    '''Tests trying to log in with the wrong password'''
    user = {
        'email': 'hello@goodbye.com',
        'password': 'hellothere'
    }
    res = login(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response code should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert 'error' in res_data, 'Response should have "error" key'
    assert res_data['error'] == 'Invalid email address or password'


def test_login_nonexistent_user(temp_app):
    '''Tests trying to log in with the wrong email'''
    user = {
        'email': 'fake@user.com',
        'password': 'hellothere'
    }
    res = login(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response code should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert 'error' in res_data, 'Response should have "error" key'
    assert res_data['error'] == 'Invalid email address or password'
