import json
from fixtures import temp_app, temp_db
from utils import (login_hello, generate_expired_token, generate_invalid_token,
                   get_authenticate)

def test_verify_jwt(temp_app, temp_db):
    '''Tests verifying a valid jwt'''
    login_res = login_hello(temp_app)
    auth_token = login_res['refreshToken']
    res = get_authenticate(auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert 'userId' in res_data
    assert res_data['email'] == 'hello@goodbye.com'


def test_verify_fail(temp_app, temp_db):
    '''Tests various failure cases when verifying a jwt'''

    # Tests verifying with no auth header
    res = temp_app.get('auth/verify')
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'No authentication provided'

    # Tests verifying with no auth token
    res = get_authenticate('', temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'No authentication provided'

    # Tests trying to verify with an expired token
    auth_token = generate_expired_token(temp_app.application.config['SECRET_KEY'])
    res = get_authenticate(auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'Invalid token'

    # Tests trying to verify with a token signed with the wrong key
    auth_token = generate_invalid_token()
    res = get_authenticate(auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'Invalid token'
