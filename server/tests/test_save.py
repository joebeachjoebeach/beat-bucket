import pprint
import json
import datetime
import psycopg2.extras
import jwt
from fixtures import temp_app, temp_db
from utils import (login_hello, post_save, generate_expired_token, generate_invalid_token,
                   get_project, patch_save, login_mackland)
from dummy_data import generate_temp_project

# todo: change this so that it uses Authorization: Bearer <token>

def test_save_new_project(temp_app, temp_db):
    '''Tests saving a new project'''
    auth_token = login_hello(temp_app)

    data = generate_temp_project()

    res = post_save(data, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 201
    assert isinstance(res_data, dict)
    assert res_data['message'] == 'Success'
    assert isinstance(res_data['projectId'], int)

    # ensure it's in the database
    cursor = temp_db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute('SELECT * FROM projects WHERE id = %(projectId)s', res_data)
    db_project = cursor.fetchall()[0]
    assert db_project['name'] == 'My New Project'
    assert db_project['data']['bpm'] == 120

    cursor.close()


def test_save_new_project_fail(temp_app, temp_db):
    '''Tests various failure cases when trying to save a new project'''

    # Tests trying to save a project with a duplicate name under the same user
    auth_token = login_hello(temp_app)

    data = generate_temp_project()
    data['name'] = 'New Project 1'

    res = post_save(data, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400
    assert res_data['error'] == 'A project with that name already exists'

    # Tests trying to save project with no auth header
    data = generate_temp_project()
    res = temp_app.post(
        '/save',
        data=json.dumps(data),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'

    # Tests trying to save project with no auth token
    res = post_save(data, '', temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'

    # Tests trying to save project with an expired token
    token = generate_expired_token(temp_app.application.config['SECRET_KEY'])
    res = post_save(data, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'

    # Tests trying to save project with a token signed with the wrong key
    token = generate_invalid_token()
    res = post_save(data, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'


def test_save_existing_project(temp_app, temp_db):
    ''' Tests making changes to an existing project '''

    auth_token = login_hello(temp_app)
    project = generate_temp_project()
    project['name'] = 'Fancy Beatz'
    project['shared'] = True
    project['id'] = 1

    res = patch_save(project, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'

    cursor = temp_db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute('SELECT * FROM projects WHERE id = %(id)s', project)
    db_project = cursor.fetchone()
    assert db_project['name'] == 'Fancy Beatz'
    assert db_project['shared'] is True
    assert db_project['data']['bpm'] == 120
    assert db_project['data']['name'] == 'Fancy Beatz'

    cursor.close()


def test_save_existing_project_fail(temp_app, temp_db):
    '''Tests various failure cases when saving an existing project'''

    # Tests trying to save a nonexistent project
    auth_token = login_mackland(temp_app)
    project = generate_temp_project()
    project['id'] = 0
    res = patch_save(project, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 400
    assert res_data['error'] == 'Project does not exist'

    # Tests trying to save a project created by a different user
    project['id'] = 1
    res = patch_save(project, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: project belongs to another user'

    # Tests trying to save a project with no auth header
    res = temp_app.patch(
        '/save',
        data=json.dumps(project),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'

    # Tests trying to save a project with no auth token
    res = patch_save(project, '', temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'

    # Tests trying to save a project with an expired auth token
    token = generate_expired_token(temp_app.application.config['SECRET_KEY'])
    res = patch_save(project, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'

    # Tests trying to save a project with an invalid auth token
    token = generate_invalid_token()
    res = patch_save(project, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'
