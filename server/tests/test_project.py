import datetime
import pprint
import json
import psycopg2.extras
from fixtures import temp_app, temp_db
from utils import (get_project, login_hello, login_mackland, generate_expired_token,
                   generate_invalid_token, delete_project)


def test_get_project(temp_app, temp_db):
    '''Tests getting a specific project (with tracks)'''
    login_res = login_hello(temp_app)
    auth_token = login_res['accessToken']
    res = get_project(1, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert isinstance(res_data['project'], dict)
    assert 'id' in res_data
    assert 'name' not in res_data


def test_get_project_fail(temp_app, temp_db):
    '''Tests various failure cases when getting a project'''

    # Tests trying to get nonexistent project
    login_res = login_mackland(temp_app)
    auth_token = login_res['accessToken']
    res = get_project(0, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400
    assert res_data['error'] == 'Project does not exist'

    # Tests trying to get a project created by a different user
    res = get_project(1, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: project belongs to another user'

    # Tests trying to get a project with no auth header
    res = temp_app.get('/project/1')
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'No authentication provided'

    # Tests trying to get a project with no auth token
    res = temp_app.get(
        '/project/1',
        headers=dict(Authorization='Bearer ')
    )
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'No authentication provided'

    # Tests trying to get a project with an expired token
    token = generate_expired_token(temp_app.application.config['SECRET_KEY'])
    res = get_project(1, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'Invalid token'

    # Tests trying to get a project with a token signed with the wrong key
    token = generate_invalid_token()
    res = get_project(1, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'Invalid token'


def test_delete_project(temp_app, temp_db):
    '''Tests deleting a project'''
    login_res = login_hello(temp_app)
    auth_token = login_res['accessToken']
    res = delete_project(1, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'

    cursor = temp_db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute('SELECT * FROM projects WHERE id = %s', (1,))
    db_project = cursor.fetchall()
    assert not db_project


def test_delete_project_fail(temp_app, temp_db):
    '''Tests various failure cases when trying to delete a project'''

    # Tests trying to delete a nonexistent project'''
    login_res = login_mackland(temp_app)
    auth_token = login_res['accessToken']
    res = delete_project(0, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400
    assert res_data['error'] == 'Project does not exist'

    # Tests trying to delete a project created by a different user
    res = delete_project(1, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: project belongs to another user'

    # Tests trying to delete project with no auth header
    res = temp_app.delete('/project/1')
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'No authentication provided'

    # Tests trying to delete project with no auth token
    res = temp_app.delete(
        '/project/1',
        headers=dict(Authorization='Bearer ')
    )
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'No authentication provided'

    # Tests trying to delete project with an expired token
    token = generate_expired_token(temp_app.application.config['SECRET_KEY'])
    res = delete_project(1, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'Invalid token'

    # Tests trying to delete project with a token signed with the wrong key
    token = generate_invalid_token()
    res = delete_project(1, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 401
    assert res_data['error'] == 'Invalid token'


def test_get_shared_project(temp_app, temp_db):
    ''' Tests getting a shared project '''
    res = temp_app.get('/project/shared/2')
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert isinstance(res_data['project'], dict)
    assert 'id' not in res_data
    assert 'name' not in res_data


def test_get_shared_project_fail(temp_app, temp_db):
    ''' Tests various failure cases getting a shared project '''

    # get a project that exists, but isn't shared
    res = temp_app.get('/project/shared/1')
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: Project is private'

    # get a project that doesn't exist
    res = temp_app.get('/project/shared/100')
    res_data = json.loads(res.data)
    assert res.status_code == 404
    assert res_data['error'] == 'Project does not exist'
