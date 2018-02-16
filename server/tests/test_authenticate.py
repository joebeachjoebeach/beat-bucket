import datetime
import json
import jwt
from fixtures import temp_app, temp_db
from utils import (login_hello, generate_expired_token, generate_invalid_token,
                   get_authenticate)
from api.auth import encode_auth_token

def test_get_access_token(temp_app, temp_db):
    '''Tests verifying a valid jwt'''
    login_res = login_hello(temp_app)
    auth_token = login_res['refreshToken']
    res = get_authenticate(auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert set(['message', 'userId', 'email', 'accessToken']) == set(res_data)
    assert res_data['email'] == 'hello@goodbye.com'


def test_get_new_refresh_token(temp_app, temp_db):
    '''Tests sending a refresh token that's about to expire, and getting a new one'''
    auth_token = encode_auth_token(
        'refresh',
        1,
        datetime.timedelta(minutes=30),
        temp_app.application.config['SECRET_KEY']
    )
    res = get_authenticate(auth_token.decode(), temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    keys = ['message', 'userId', 'email', 'accessToken', 'refreshToken']
    assert set(keys) == set(res_data)
    assert res_data['email'] == 'hello@goodbye.com'


def test_authenticate_fail(temp_app, temp_db):
    '''Tests various failure cases when verifying a jwt'''

    # Tests verifying with no auth header
    res = temp_app.get('auth/authenticate')
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'No authentication provided'

    # Tests verifying with no auth token
    res = get_authenticate('', temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'No authentication provided'

    # Tests trying to verify with an expired token
    auth_token = generate_expired_token(
        'refresh',
        temp_app.application.config['SECRET_KEY']
    )
    res = get_authenticate(auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'Invalid token'

    # Tests trying to verify with a token signed with the wrong key
    auth_token = generate_invalid_token('refresh')
    res = get_authenticate(auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'Invalid token'
