import datetime
import json
import jwt
from fixtures import temp_app, temp_db
from test_login import login
from utils import (get_project, login_hello, login_mackland, generate_expired_token,
                   generate_invalid_token)


def test_get_project(temp_app, temp_db):
    '''Tests getting a specific project (with tracks)'''
    auth_token = login_hello(temp_app)
    res = get_project(1, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert isinstance(res_data['project'], dict)
    assert isinstance(res_data['project']['tracks'], list)
    assert 'id' in res_data['project']


def test_get_project_fail(temp_app, temp_db):
    '''Tests various failure cases when getting a project'''

    # Tests trying to get a project created by a different user
    auth_token = login_mackland(temp_app)
    res = get_project(1, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: project belongs to another user'

    # Tests trying to get projects with no auth header
    res = temp_app.get('/project/1')
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'

    # Tests trying to get projects with no auth token
    res = temp_app.get(
        '/project/1',
        headers=dict(Authorization='Bearer ')
    )
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'

    # Tests trying to get projects with an expired token
    token = generate_expired_token(temp_app.application.config['SECRET_KEY'])
    res = get_project(1, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'

    # Tests trying to get projects with a token signed with the wrong key
    token = generate_invalid_token()
    res = get_project(1, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'
