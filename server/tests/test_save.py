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
    assert res_data['message'] == 'Project saved successfully'
    assert isinstance(res_data['project_id'], int)

    # ensure it's in the database
    cursor = temp_db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute('SELECT * FROM projects WHERE id = %(project_id)s', res_data)
    db_project = cursor.fetchall()[0]
    assert db_project['bpm'] == 120
    assert db_project['name'] == 'My New Project'

    cursor.execute('SELECT * FROM tracks WHERE project_id = %(project_id)s', res_data)
    db_tracks = cursor.fetchall()
    assert len(db_tracks) == 2
    assert db_tracks[0]['name'] == 'Track 1'
    assert db_tracks[1]['name'] == 'Track 2'

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
    '''Tests making changes to an existing project'''

    # tests making changes only to project globals
    auth_token = login_hello(temp_app)
    data = {
        'id': 1,
        'payload': {
            'bpm': 110,
            'name': 'Dope Beats'
        }
    }
    res = patch_save(data, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'

    cursor = temp_db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute('SELECT * FROM projects WHERE id = %(id)s', data)
    db_project = cursor.fetchone()
    assert db_project['name'] == 'Dope Beats'
    assert db_project['bpm'] == 110

    # tests making changes only to tracks
    cursor.execute('SELECT * FROM tracks WHERE project_id = %(id)s', data)
    db_tracks = cursor.fetchall()
    id1 = db_tracks[0]['id']
    id2 = db_tracks[1]['id']
    data = {
        'id': 1,
        'payload': {
            'tracks': [
                {
                    'id': id1,
                    'name': 'High synth',
                    'baseNote': 2
                },
                {
                    'id': id2,
                    'name': 'Low synth',
                    'muted': False,
                    'sequence': [['C4'], ['G4']]
                }
            ]
        }
    }

    res = patch_save(data, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'

    cursor.execute('SELECT * FROM tracks WHERE project_id = %(id)s', data)
    db_tracks = cursor.fetchall()
    track1 = db_tracks[0]
    track2 = db_tracks[1]
    assert track1['name'] == 'High synth'
    assert track1['base_note'] == 2
    assert track2['name'] == 'Low synth'
    assert not track2['muted']
    assert 'C4' in track2['sequence'][0]
    assert not 'G4' in track2['sequence'][0]
    assert 'G4' in track2['sequence'][1]

    # tests making changes to both tracks and globals
    data = {
        'id': 1,
        'payload': {
            'bpm': 150,
            'tracks': [{'id': id2, 'muted': True}]
        }
    }
    res = patch_save(data, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'

    cursor.execute('SELECT * FROM projects WHERE id = %(id)s', data)
    db_project = cursor.fetchall()[0]
    cursor.execute('SELECT * FROM tracks WHERE project_id = %(id)s', data)
    db_tracks = cursor.fetchall()
    assert db_project['bpm'] == 150
    assert db_tracks[1]['muted'] is True

    # tests deleting a track
    data = {
        'id': 1,
        'payload': {
            'tracks': [{'id': id1, 'deleted': True}]
        }
    }
    res = patch_save(data, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'

    cursor.execute('SELECT * FROM tracks WHERE project_id = %(id)s', data)
    db_tracks = cursor.fetchall()
    assert len(db_tracks) == 1

    # tests adding a track
    data = {
        'id': 1,
        'payload': {
            'tracks': [{
                'name': 'Deedle Dee',
                'baseNote': 1,
                'muted': False,
                'soloed': False,
                'sequence': [['C6', 'B6', 'A6']]
            }]
        }
    }
    res = patch_save(data, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'

    cursor.execute('SELECT * FROM tracks WHERE project_id = %(id)s', data)
    db_tracks = cursor.fetchall()
    assert len(db_tracks) == 2
    assert db_tracks[1]['name'] == 'Deedle Dee'
    assert all(note in db_tracks[1]['sequence'][0] for note in ('C6', 'B6', 'A6'))

    # tests deleting a track, adding a track, modifying a track, and modifying globals
    id1 = db_tracks[0]['id']
    id2 = db_tracks[1]['id']
    data = {
        'id': 1,
        'payload': {
            'name': 'Best Project Ever',
            'tracks': [
                {
                    'id': id1,
                    'deleted': True
                },
                {
                    'id': id2,
                    'muted': True
                },
                {
                    'name': 'Dunun',
                    'baseNote': 3,
                    'muted': False,
                    'soloed': False,
                    'sequence': [['C2'], ['D2']]
                }
            ]
        }
    }
    res = patch_save(data, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 200
    assert res_data['message'] == 'Success'

    cursor.execute('SELECT * FROM tracks WHERE project_id = %(id)s', data)
    db_tracks = cursor.fetchall()
    assert len(db_tracks) == 2
    assert db_tracks[0]['muted'] is True
    assert db_tracks[1]['name'] == 'Dunun'
    assert 'C2' in db_tracks[1]['sequence'][0]
    assert 'D2' in db_tracks[1]['sequence'][1]

    cursor.execute('SELECT * FROM projects WHERE id = %(id)s', data)
    db_project = cursor.fetchall()[0]
    assert db_project['name'] == 'Best Project Ever'
    assert db_project['bpm'] == 150

    cursor.close()


def test_save_existing_project_fail(temp_app, temp_db):
    '''Tests various failure cases when saving an existing project'''

    # Tests trying to save a project created by a different user
    auth_token = login_mackland(temp_app)
    data = {
        'id': 1,
        'payload': {
            'name': 'New Track Name'
        }
    }
    res = patch_save(data, auth_token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: project belongs to another user'

    # Tests trying to save a project with no auth header
    data = {
        'id': 1,
        'payload': {
            'name': 'Blah blah blah'
        }
    }
    res = temp_app.patch(
        '/save',
        data=json.dumps(data),
        content_type='application/json'
    )
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'

    # Tests trying to save a project with no auth token
    res = patch_save(data, '', temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Forbidden: no authentication provided'

    # Tests trying to save a project with an expired auth token
    token = generate_expired_token(temp_app.application.config['SECRET_KEY'])
    res = patch_save(data, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'

    # Tests trying to save a project with an invalid auth token
    token = generate_invalid_token()
    res = patch_save(data, token, temp_app)
    res_data = json.loads(res.data)
    assert res.status_code == 403
    assert res_data['error'] == 'Invalid token'
