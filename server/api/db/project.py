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


def get_project_id(conn, user_id, name):
    '''Gets the id of a project by user id and project name'''
    cursor = conn.cursor()
    cursor.execute(
        '''
        SELECT id FROM projects
        WHERE user_id = %s and name = %s
        ''',
        (user_id, name)
    )
    result = cursor.fetchone()
    cursor.close()
    return result


def get_project(conn, project_id):
    '''Gets project data'''
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
        cursor.close()
        return None

    cursor.close()
    return project


def insert_project(conn, project_dict):
    '''Inserts a new project into the database'''
    cursor = conn.cursor()
    cursor.execute(
        '''
        INSERT INTO projects (name, user_id, shared, data)
        VALUES (%(name)s, %(user_id)s, %(shared)s, %(data)s)
        ''',
        project_dict
    )
    cursor.close()


def update_project(conn, project_dict):
    ''' Updates project data '''
    cursor = conn.cursor()
    cursor.execute(
        '''
        UPDATE projects
        SET name = %(name)s,
            shared = %(shared)s,
            data = %(data)s
        WHERE id = %(id)s
        ''',
        project_dict
    )
    cursor.close()



def delete_project(conn, project_id):
    '''Deletes the given project'''
    cursor = conn.cursor()
    cursor.execute(
        '''
        DELETE FROM projects
        WHERE id = %s
        ''',
        (project_id,)
    )
    cursor.close()
