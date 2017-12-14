from pytest import fixture
from server import create_app
from server.db import (create_hashed_user, connect_to_db, get_project_id,
                       insert_track)
from dummy_data import temp_project

def create_test_app():
    '''Returns an app configured for testing'''
    return create_app(TESTING=True, DEBUG=False, DB_NAME='beatbucket_test')


@fixture
def temp_app():
    '''Sets up the test app and populates the test database.'''
    return create_test_app().test_client()


@fixture
def temp_db():
    '''Populates the db with dummy data'''
    user_a = create_hashed_user({
        'email': 'hello@goodbye.com',
        'password': 'goodbye'
    })
    user_a['id'] = 1

    user_b = create_hashed_user({
        'email': 'bmackland@fbi.net',
        'password': 'mackland'
    })
    user_b['id'] = 2

    conn = connect_to_db('beatbucket_test')
    cursor = conn.cursor()

    cursor.execute(
        '''
        INSERT INTO users (id, email, password, salt)
        VALUES (%(id)s, %(email)s, %(password)s, %(salt)s)
        ''',
        user_a
    )
    cursor.execute(
        '''
        INSERT INTO users (id, email, password, salt)
        VALUES (%(id)s, %(email)s, %(password)s, %(salt)s)
        ''',
        user_b
    )

    project = dict(temp_project)
    project['name'] = 'New Project 1'
    tracks = project['tracks']
    del project['tracks']
    project['id'] = 1
    project['user_id'] = 1

    cursor.execute(
        '''
        INSERT INTO projects (id, name, bpm, user_id)
        VALUES (%(id)s, %(name)s, %(bpm)s, %(user_id)s)
        ''',
        project
    )

    for track in tracks:
        track['project_id'] = project['id']
        insert_track(cursor, track)

    conn.commit()
    cursor.close()
    # conn.close()

    yield conn

    # conn = connect_to_db('beatbucket_test')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tracks')
    cursor.execute('DELETE FROM projects')
    cursor.execute('DELETE FROM users')
    conn.commit()
    cursor.close()
    conn.close()
