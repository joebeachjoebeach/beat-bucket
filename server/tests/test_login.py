import json
from fixtures import temp_app


def test_login_user(temp_app):
    '''Tests logging in a user.'''
    user = {
        'email': 'hello@goodbye.com',
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
    assert 'email' in res_data, 'Reponse must have email key'
    assert 'user_id' in res_data, 'Response must have user_id key'


def test_login_no_email(temp_app):
    user = {'password': 'testpass'}
    res = temp_app.post(
        '/login',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response code should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert 'error' in res_data, 'Response should have "error" key'
    assert res_data['error'] == 'Login request must have email and password'


def test_login_no_password(temp_app):
    user = {'email': 'hello@goodbye.com'}
    res = temp_app.post(
        '/login',
        data=json.dumps(user),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 400, 'Response code should be 400 - BAD REQUEST'
    assert isinstance(res_data, dict), 'Response data must be in json'
    assert 'error' in res_data, 'Response should have "error" key'
    assert res_data['error'] == 'Login request must have email and password'

# todo: session?
