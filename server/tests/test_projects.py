import json
import datetime
import jwt
from test_login import login
from fixtures import temp_app, temp_db
from utils import get_projects, login_hello, login_mackland


def test_get_projects(temp_app, temp_db):
    '''Tests getting all projects by an authenticated user'''
    auth_token = login_hello(temp_app)
    res = get_projects(auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'
    assert isinstance(res_data['projects'], list)


def test_get_no_projects(temp_app, temp_db):
    '''Tests getting all projects by a user with no projects'''
    auth_token = login_mackland(temp_app)
    res = get_projects(auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'
    assert isinstance(res_data['projects'], list)
    assert not res_data['projects'], '"projects" should be an empty list here'


def test_get_projects_no_auth(temp_app, temp_db):
    '''Tests trying to get projects with no auth header'''
    res = temp_app.get('/projects')
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'


def test_get_projects_no_token(temp_app, temp_db):
    '''Tests trying to get projects with no auth header'''
    res = temp_app.get(
        '/projects',
        headers=dict(Authorization='Bearer ')
    )
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'


def test_get_projects_expired_token(temp_app, temp_db):
    '''Tests trying to get projects with an expired token'''
    now = datetime.datetime.utcnow()
    token_payload = {
        'exp': now - datetime.timedelta(seconds=30),
        'iat': now - datetime.timedelta(minutes=1),
        'sub': 1
    }
    token = jwt.encode(
        token_payload,
        temp_app.application.config['SECRET_KEY'],
        algorithm='HS256'
    )
    res = get_projects(token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'


def test_get_projects_invalid_token(temp_app, temp_db):
    '''Tests trying to get projects with a token signed with the wrong key'''
    now = datetime.datetime.utcnow()
    token_payload = {
        'exp': now - datetime.timedelta(seconds=30),
        'iat': now - datetime.timedelta(minutes=1),
        'sub': 1
    }
    token = jwt.encode(
        token_payload,
        'shazaam',
        algorithm='HS256'
    )
    res = get_projects(token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'