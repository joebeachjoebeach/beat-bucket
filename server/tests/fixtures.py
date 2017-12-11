from pytest import fixture
from server import create_app
from server.db import create_hashed_user, connect_to_db, insert_user

def create_test_app():
    '''Returns an app configured for testing'''
    return create_app(TESTING=True, DEBUG=False, DB_NAME='beatbucket_test')


@fixture
def temp_app():
    '''Sets up the test app and populates the test database.'''
    test_app = create_test_app()

    user_a = create_hashed_user({
        'username': 'hello',
        'password': 'goodbye',
        'email': 'hello@goodbye.com'
    })

    user_b = create_hashed_user({
        'username': 'bert',
        'password': 'mackland',
        'email': 'bmackland@fbi.net'
    })

    conn = connect_to_db('beatbucket_test')
    cursor = conn.cursor()
    insert_user(cursor, user_a)
    insert_user(cursor, user_b)
    conn.commit()
    cursor.close()
    conn.close()

    yield test_app.test_client()

    conn = connect_to_db('beatbucket_test')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM users')
    conn.commit()
    cursor.close()
    conn.close()
