import datetime
import json
import jwt
from fixtures import temp_app, temp_db
from test_login import login
from utils import get_project, login_hello, login_mackland


def test_get_project(temp_app, temp_db):
    '''Tests getting a specific project (with tracks)'''
    auth_token = login_hello(temp_app)
    res = get_project(1, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert isinstance(res_data['project'], dict)
    assert isinstance(res_data['project']['tracks'], list)


def test_get_project_wrong_user(temp_app, temp_db):
    '''Tests trying to get a project created by a different user'''
    auth_token = login_mackland(temp_app)
    res = get_project(1, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: project belongs to another user'


def test_get_project_no_auth(temp_app, temp_db):
    '''Tests trying to get projects with no auth header'''
    res = temp_app.get('/project/1')
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'


def test_get_project_no_token(temp_app, temp_db):
    '''Tests trying to get projects with no auth header'''
    res = temp_app.get(
        '/project/1',
        headers=dict(Authorization='Bearer ')
    )
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'


def test_get_project_expired_token(temp_app, temp_db):
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
    res = get_project(1, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'


def test_get_project_invalid_token(temp_app, temp_db):
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
    res = get_project(1, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'
