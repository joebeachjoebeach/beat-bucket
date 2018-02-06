import json
import psycopg2
import psycopg2.extras


def get_all_projects(cursor, user_id):
    '''Gets all the projects (name, id) of a given user'''
    cursor.execute(
        '''
        SELECT id, name FROM projects
        WHERE user_id = %s
        ''',
        (user_id,)
    )
    result = cursor.fetchall()
    return result


def get_project_id(cursor, user_id, name):
    '''Gets the id of a project by user id and project name'''
    cursor.execute(
        '''
        SELECT id FROM projects
        WHERE user_id = %s and name = %s
        ''',
        (user_id, name)
    )
    return cursor.fetchone()


def get_project(cursor, project_id):
    '''Gets just basic project data'''
    cursor.execute(
        '''
        SELECT * FROM projects
        WHERE id = %s
        ''',
        (project_id,)
    )
    # if the project doesn't exist, we'll get an IndexError
    try:
        result = cursor.fetchall()[0]
        return result
    except IndexError:
        return None



def get_project_all(conn, project_id):
    '''Gets all the project data for a given project id'''
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute(
        '''
        SELECT * FROM projects
        WHERE id = %s
        ''',
        (project_id,)
    )
    # try to convert it to a dict. if it can't be converted, that means the project doesn't exist
    try:
        project = dict(cursor.fetchone())
    except TypeError:
        return None

    cursor.execute(
        '''
        SELECT * FROM tracks
        WHERE project_id = %s
        ''',
        (project_id,)
    )
    tracks = cursor.fetchall()
    cursor.close()
    project['tracks'] = [dict(track) for track in tracks]
    return project



def insert_project(cursor, project_dict):
    '''Inserts a new project into the database'''
    cursor.execute(
        '''
        INSERT INTO projects (name, bpm, user_id, shared)
        VALUES (%(name)s, %(bpm)s, %(user_id)s, %(shared)s)
        ''',
        project_dict
    )


def update_project(cursor, project_dict):
    '''Updates project values with those in the dict'''
    if 'name' in project_dict:
        cursor.execute(
            '''
            UPDATE projects
            SET name = %(name)s
            WHERE id = %(id)s
            ''',
            project_dict
        )

    if 'bpm' in project_dict:
        cursor.execute(
            '''
            UPDATE projects
            SET bpm = %(bpm)s
            WHERE id = %(id)s
            ''',
            project_dict
        )


def delete_project(cursor, project_id):
    '''Deletes the given project'''
    cursor.execute(
        '''
        DELETE FROM tracks
        WHERE project_id = %s
        ''',
        (project_id,)
    )

    cursor.execute(
        '''
        DELETE FROM projects
        WHERE id = %s
        ''',
        (project_id,)
    )
