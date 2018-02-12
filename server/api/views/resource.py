import json
import psycopg2.extras
from flask import Blueprint, current_app, g, jsonify, request
from api.db import (get_db, insert_project, get_project_id, insert_track, get_all_projects,
                       get_project, update_project, update_track, delete_track,
                       delete_project)
from api.auth import decode_auth_token, get_token, get_user_id_from_token


resource_bp = Blueprint('resource_bp', __name__)


@resource_bp.route('/projects', methods=['GET'])
def projects_get():
    '''Gets all projects for a given user'''
    user_dict = get_user_id_from_token(request.headers, current_app.config['SECRET_KEY'])
    if 'error' in user_dict:
        return jsonify({'error': user_dict['error']}), user_dict['status_code']

    db_conn = get_db(current_app, g)
    cursor = db_conn.cursor()
    projects = get_all_projects(cursor, user_dict['user_id'])
    cursor.close()
    return jsonify({'message': 'Success', 'projects': projects}), 200


@resource_bp.route('/project/<int:project_id>', methods=['GET'])
def project_get(project_id):
    '''Gets a project from the database'''
    user_dict = get_user_id_from_token(request.headers, current_app.config['SECRET_KEY'])
    if 'error' in user_dict:
        return jsonify({'error': user_dict['error']}), user_dict['status_code']

    db_conn = get_db(current_app, g)
    project = get_project(db_conn, project_id)

    if project is None:
        return jsonify({'error': 'Project does not exist'}), 400

    if project['user_id'] != user_dict['user_id']:
        return jsonify({'error': 'Forbidden: project belongs to another user'}), 403

    return jsonify({
        'message': 'Success',
        'project': project['data'],
        'id': project['id']
    }), 200


@resource_bp.route('/project/<int:project_id>', methods=['DELETE'])
def project_delete(project_id):
    '''Deletes a project'''
    user_dict = get_user_id_from_token(request.headers, current_app.config['SECRET_KEY'])
    if 'error' in user_dict:
        return jsonify({'error': user_dict['error']}), user_dict['status_code']

    db_conn = get_db(current_app, g)
    project = get_project(db_conn, project_id)

    if project is None:
        return jsonify({'error': 'Project does not exist'}), 400

    if project['user_id'] != user_dict['user_id']:
        return jsonify({'error': 'Forbidden: project belongs to another user'}), 403

    delete_project(db_conn, project_id)
    db_conn.commit()

    return jsonify({'message': 'Success'}), 200


@resource_bp.route('/save', methods=['POST'])
def save_project():
    '''Saves a brand new project'''
    user_dict = get_user_id_from_token(request.headers, current_app.config['SECRET_KEY'])
    if 'error' in user_dict:
        return jsonify({'error': user_dict['error']}), user_dict['status_code']

    json_data = request.get_json()
    db_conn = get_db(current_app, g)

    # return an error if the user already has a project with that name
    if get_project_id(db_conn, user_dict['user_id'], json_data['name']):
        return jsonify({'error': 'A project with that name already exists'}), 400

    project = {
        'name': json_data['name'],
        'user_id': user_dict['user_id'],
        'shared': json_data['shared'],
        'data': json.dumps(json_data)
    }

    insert_project(db_conn, project)

    project_id = get_project_id(db_conn, user_dict['user_id'], json_data['name'])[0]

    db_conn.commit()

    return jsonify({
        'message': 'Success',
        'projectId': project_id
    }), 201


@resource_bp.route('/save', methods=['PATCH'])
def project_update():
    '''Makes changes to an existing project'''
    user_dict = get_user_id_from_token(request.headers, current_app.config['SECRET_KEY'])
    if 'error' in user_dict:
        return jsonify({'error': user_dict['error']}), user_dict['status_code']

    json_data = request.get_json()
    db_conn = get_db(current_app, g)
    project = get_project(db_conn, json_data['id'])

    if project is None:
        return jsonify({'error': 'Project does not exist'}), 400

    if user_dict['user_id'] != project['user_id']:
        return jsonify({'error': 'Forbidden: project belongs to another user'}), 403

    updated_project = {
        'id': json_data['id'],
        'name': json_data['name'],
        'shared': json_data['shared'],
        'data': json.dumps(json_data)
    }

    update_project(db_conn, updated_project)

    db_conn.commit()

    return jsonify({'message': 'Success'}), 200
