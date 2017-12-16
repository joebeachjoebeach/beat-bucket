import psycopg2.extras
from flask import Blueprint, current_app, g, jsonify, request
from jwt import ExpiredSignatureError, InvalidTokenError
from server.db import (get_db, insert_project, get_project_id, insert_track, get_all_projects,
                       get_project, get_project_all, update_project, update_track, delete_track,
                       delete_project)
from server.auth import decode_auth_token


resource_bp = Blueprint('resource_bp', __name__)


def get_token(headers):
    '''Gets the auth token from the headers if it exists'''
    auth_header = headers.get('Authorization')
    if auth_header:
        return auth_header.split(' ')[1]
    return ''


@resource_bp.route('/projects', methods=['GET'])
def projects_get():
    '''Gets all projects for a given user'''
    auth_token = get_token(request.headers)
    if not auth_token:
        return jsonify({'error': 'Forbidden: no authentication provided'}), 403

    user_id = decode_auth_token(auth_token, current_app.config['SECRET_KEY'])

    if user_id is None:
        return jsonify({'error': 'Invalid token'}), 403

    db_conn = get_db(current_app, g)
    cursor = db_conn.cursor()
    projects = get_all_projects(cursor, user_id)
    cursor.close()
    return jsonify({'message': 'Success', 'projects': projects}), 200


@resource_bp.route('/project/<int:project_id>', methods=['GET'])
def project_get(project_id):
    '''Gets a project from the database'''
    auth_token = get_token(request.headers)
    if not auth_token:
        return jsonify({'error': 'Forbidden: no authentication provided'}), 403

    user_id = decode_auth_token(auth_token, current_app.config['SECRET_KEY'])

    if user_id is None:
        return jsonify({'error': 'Invalid token'}), 403

    db_conn = get_db(current_app, g)
    project = get_project_all(db_conn, project_id)

    if project is None:
        return jsonify({'error': 'Project does not exist'}), 400

    if project['user_id'] != user_id:
        return jsonify({'error': 'Forbidden: project belongs to another user'}), 403

    return jsonify({'message': 'Success', 'project': project}), 200


@resource_bp.route('/project/<int:project_id>', methods=['DELETE'])
def project_delete(project_id):
    '''Deletes a project'''
    auth_token = get_token(request.headers)
    if not auth_token:
        return jsonify({'error': 'Forbidden: no authentication provided'}), 403

    user_id = decode_auth_token(auth_token, current_app.config['SECRET_KEY'])

    if user_id is None:
        return jsonify({'error': 'Invalid token'}), 403

    db_conn = get_db(current_app, g)
    cursor = db_conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    project = get_project(cursor, project_id)

    if project is None:
        return jsonify({'error': 'Project does not exist'}), 400

    if project['user_id'] != user_id:
        return jsonify({'error': 'Forbidden: project belongs to another user'}), 403

    delete_project(cursor, project_id)
    db_conn.commit()

    cursor.close()
    return jsonify({'message': 'Success'}), 200


@resource_bp.route('/save', methods=['POST'])
def save_project():
    '''Saves a brand new project'''
    auth_token = get_token(request.headers)
    if not auth_token:
        return jsonify({'error': 'Forbidden: no authentication provided'}), 403

    json_data = request.get_json()

    user_id = decode_auth_token(auth_token, current_app.config['SECRET_KEY'])
    if user_id is None:
        return jsonify({'error': 'Invalid token'}), 403

    json_data['user_id'] = user_id

    tracks = json_data['tracks']
    del json_data['tracks']

    db_conn = get_db(current_app, g)
    cursor = db_conn.cursor()

    # return error if that user already has a project with that name
    if get_project_id(cursor, user_id, json_data['name']):
        return jsonify({'error': 'A project with that name already exists'}), 400

    insert_project(cursor, json_data)

    project_id = get_project_id(cursor, json_data['user_id'], json_data['name'])[0]

    for track in tracks:
        track['project_id'] = project_id
        insert_track(cursor, track)

    db_conn.commit()
    cursor.close()

    return jsonify({
        'message': 'Project saved successfully',
        'project_id': project_id
    }), 201


@resource_bp.route('/save', methods=['PATCH'])
def project_update():
    '''Makes changes to an existing project'''
    auth_token = get_token(request.headers)
    if not auth_token:
        return jsonify({'error': 'Forbidden: no authentication provided'}), 403
    json_data = request.get_json()
    user_id = decode_auth_token(auth_token, current_app.config['SECRET_KEY'])
    if user_id is None:
        return jsonify({'error': 'Invalid token'}), 403

    project_id = json_data['id']
    payload = json_data['payload']

    db_conn = get_db(current_app, g)
    cursor = db_conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    project = get_project(cursor, project_id)

    if project is None:
        return jsonify({'error': 'Project does not exist'}), 400

    if user_id != project['user_id']:
        return jsonify({'error': 'Forbidden: project belongs to another user'}), 403

    payload['id'] = project_id
    update_project(cursor, payload)

    tracks = payload.get('tracks')
    if tracks is not None:
        for track in tracks:
            deleted = track.get('deleted')
            # track to delete
            if deleted:
                delete_track(cursor, track['id'])
            # new track
            if not 'id' in track:
                track['project_id'] = project_id
                insert_track(cursor, track)
            # existing track
            else:
                update_track(cursor, track)

    db_conn.commit()
    cursor.close()

    return jsonify({'message': 'Success'}), 200
