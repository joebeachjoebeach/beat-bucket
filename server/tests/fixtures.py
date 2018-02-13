''' Pytest Fixtures '''

import json
from pytest import fixture
from api import create_app
from api.db import create_hashed_user, connect_to_db
from dummy_data import generate_temp_project

def create_test_app():
    '''Returns an app configured for testing'''
    return create_app(TESTING=True, DEBUG=False, DB_NAME='beatbucket_test')


@fixture
def temp_app():
    '''Sets up the test app and populates the test database.'''
    return create_test_app().test_client()


@fixture
def temp_db():
    '''Populates the db with dummy data and yields the db connection'''
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

    db_conn = connect_to_db('beatbucket_test')
    cursor = db_conn.cursor()

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

    project_data = generate_temp_project()
    project_data['name'] = 'New Project 1'
    json_data = json.dumps(project_data)
    project = {
        'name': 'New Project 1',
        'id': 1,
        'user_id': 1,
        'data': json_data,
        'shared': False
    }

    cursor.execute(
        '''
        INSERT INTO projects (id, name, user_id, data, shared)
        VALUES (%(id)s, %(name)s, %(user_id)s, %(data)s, %(shared)s)
        ''',
        project
    )

    project['shared'] = True
    project['name'] = 'Test Project'
    project['id'] = 2
    project_data['shared'] = True
    project_data['name'] = 'Test Project'
    project_data['id'] = 2
    project['data'] = json.dumps(project_data)

    cursor.execute(
        '''
        INSERT INTO projects (id, name, user_id, data, shared)
        VALUES (%(id)s, %(name)s, %(user_id)s, %(data)s, %(shared)s)
        ''',
        project
    )

    db_conn.commit()
    cursor.close()

    yield db_conn

    cursor = db_conn.cursor()
    cursor.execute('DELETE FROM projects')
    cursor.execute('DELETE FROM users')
    db_conn.commit()
    cursor.close()
    db_conn.close()
