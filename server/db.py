import psycopg2
import psycopg2.extras
import bcrypt
import json


def get_user_by_email(conn, email):
    '''Retrieves user data by email'''
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute(
        '''
        SELECT * FROM users
        WHERE email = %s
        ''',
        (email,)
    )
    result = cursor.fetchone()
    cursor.close()
    return result


def add_user(conn, user_dict):
    '''Add a user to the database'''
    cursor = conn.cursor()
    user_data = create_hashed_user(user_dict)
    insert_user(cursor, user_data)
    conn.commit()
    cursor.close()


def create_hashed_user(user_dict):
    '''
    Takes a user dict {username, email, password}
    and returns a fresh dict {username, email, password, salt}
    in which the password is hashed with the salt
    '''
    salt = bcrypt.gensalt()
    pword = bcrypt.hashpw(user_dict['password'].encode('utf-8'), salt)
    hashed_user = dict(user_dict)
    hashed_user['password'] = pword
    hashed_user['salt'] = salt
    return hashed_user


def insert_user(cursor, hashed_user_dict):
    '''
    Inserts a dict {username, email, password, salt} with hashed password
    into the users table
    '''
    cursor.execute(
        '''
        INSERT INTO users (email, password, salt)
        VALUES (%(email)s, %(password)s, %(salt)s)
        ''',
        hashed_user_dict
    )


def email_exists(conn, email):
    '''Checks if an email already exists in the database'''
    cursor = conn.cursor()
    cursor.execute(
        '''
        SELECT email FROM users
        WHERE email = %s
        ''',
        (email,)
    )
    result = cursor.fetchone()
    cursor.close()
    if result is not None:
        return True
    return False


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
    cursor.close()
    return result


def get_project(conn, project_id):
    '''Gets all the project data for a given project id'''
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute(
        '''
        SELECT * FROM projects
        WHERE id = %s
        ''',
        (project_id,)
    )
    project = dict(cursor.fetchone())
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
        INSERT INTO projects (name, bpm, user_id)
        VALUES (%(name)s, %(bpm)s, %(user_id)s)
        ''',
        project_dict
    )


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


def insert_track(cursor, track_dict):
    '''Inserts a track into the database'''
    track_dict['sequence'] = json.dumps(track_dict['sequence'])

    cursor.execute(
        '''
        INSERT INTO tracks (name, base_note, muted, soloed, sequence, project_id)
        VALUES (%(name)s, %(baseNote)s, %(muted)s, %(soloed)s, %(sequence)s, %(project_id)s)
        ''',
        track_dict
    )


def connect_to_db(db_name):
    '''Initializes db connection'''
    return psycopg2.connect(
        host='localhost',
        port='5400',
        database=db_name,
        user='postgres',
        password='password'
    )
