import json
import datetime
import jwt
from fixtures import temp_app, temp_db
from utils import login_hello, post_save
from dummy_data import temp_project

# todo: change this so that it uses Authorization: Bearer <token>

def test_save_new_project(temp_app, temp_db):
    '''Tests saving a new project'''
    auth_token = login_hello(temp_app)

    data = dict(temp_project)

    res = post_save(data, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 201
    assert isinstance(res_data, dict)
    assert 'message' in res_data
    assert res_data['message'] == 'Project saved successfully'
    assert 'project_id' in res_data


def test_save_new_project_dupe_name(temp_app, temp_db):
    '''Tests trying to save a project with a duplicate name under the same user'''
    auth_token = login_hello(temp_app)

    data = dict(temp_project)
    data['name'] = 'New Project 1'

    res = post_save(data, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400
    assert res_data['error'] == 'A project with that name already exists'

# todo:
# save new project with expired token
# save new project with invalid token
# save new project with no token
# save new project with no auth header

def test_save_new_project_no_auth(temp_app, temp_db):
    '''Tests trying to get projects with no auth header'''
    data = dict(temp_project)
    res = temp_app.post(
        '/save',
        data=json.dumps(data),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'


def test_save_new_project_no_token(temp_app, temp_db):
    '''Tests trying to get projects with no auth header'''
    data = dict(temp_project)
    res = post_save(data, '', temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'


def test_save_new_project_expired_token(temp_app, temp_db):
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
    data = dict(temp_project)
    res = post_save(data, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'


def test_save_new_project_invalid_token(temp_app, temp_db):
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
    data = dict(temp_project)
    res = post_save(data, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'
