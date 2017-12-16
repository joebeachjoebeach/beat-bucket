import json
from fixtures import temp_app, temp_db
from utils import login


def test_login_user(temp_app, temp_db):
    '''Tests logging in a user.'''
    user = {
        'email': 'hello@goodbye.com',
        'password': 'goodbye'
    }
    res = login(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200, 'Response code should be 200 - OK'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert res_data['message'] == 'Success', 'Message should read "Success"'
    assert 'email' in res_data, 'Reponse must have email key'
    assert 'userId' in res_data, 'Response must have user_id key'
    assert 'authToken' in res_data, 'Response must have an auth token'
    assert isinstance(res_data['authToken'], str)


def test_login_fail(temp_app, temp_db):
    '''Tests various login failure cases'''

    # Tests trying to log in with no email
    res = login({'password': 'testpass'}, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response code should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert res_data['error'] == 'Login request must have email and password'

    # Tests trying to log in with no password
    res = login({'email': 'hello@goodbye.com'}, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response code should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert res_data['error'] == 'Login request must have email and password'

    # Tests trying to log in with the wrong password
    user = {
        'email': 'hello@goodbye.com',
        'password': 'hellothere'
    }
    res = login(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response code should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert res_data['error'] == 'Invalid email address or password'

    # Tests trying to log in with the wrong email
    user = {
        'email': 'fake@user.com',
        'password': 'hellothere'
    }
    res = login(user, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response code should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert res_data['error'] == 'Invalid email address or password'
