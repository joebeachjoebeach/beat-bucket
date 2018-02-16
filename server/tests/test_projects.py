import datetime
import json
from fixtures import temp_app, temp_db
from utils import (get_projects, login_hello, login_mackland, generate_expired_token,
                   generate_invalid_token)
from api.auth import encode_auth_token


def test_get_projects(temp_app, temp_db):
    '''Tests getting all projects by an authenticated user'''
    login_res = login_hello(temp_app)
    auth_token = login_res['accessToken']
    res = get_projects(auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'
    assert isinstance(res_data['projects'], list)


def test_get_projects_none(temp_app, temp_db):
    '''Tests getting all projects by a user with no projects'''
    login_res = login_mackland(temp_app)
    auth_token = login_res['accessToken']
    res = get_projects(auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'
    assert isinstance(res_data['projects'], list)
    assert not res_data['projects'], '"projects" should be an empty list here'


def test_get_projects_fail(temp_app, temp_db):
    '''Tests getting projects with various failure cases'''

    # Tests trying to get projects with no auth header
    res = temp_app.get('/projects')
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'No authentication provided'

    # Tests trying to get projects with no auth header
    res = temp_app.get(
        '/projects',
        headers=dict(Authorization='Bearer ')
    )
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'No authentication provided'

    # Tests trying to get projects with an expired token
    token = generate_expired_token('access', temp_app.application.config['SECRET_KEY'])
    res = get_projects(token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'Invalid token'

    # Tests trying to get projects with a token signed with the wrong key
    token = generate_invalid_token('access')
    res = get_projects(token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'Invalid token'

    # Tests trying to use a refresh token to access projects
    token = encode_auth_token(
        'refresh',
        1,
        datetime.timedelta(days=3),
        temp_app.application.config['SECRET_KEY']
    )
    res = get_projects(token.decode(), temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'Invalid token type'
