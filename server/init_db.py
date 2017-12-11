from db import connect_to_db

def drop_users(cursor):
    '''Drops the users table'''
    cursor.execute('DROP TABLE IF EXISTS users')


def create_users(cursor):
    '''Creates the users table'''
    cursor.execute(
        '''
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(50) NOT NULL UNIQUE,
            password BYTEA NOT NULL,
            salt BYTEA NOT NULL
        )
        '''
    )


def recreate_users(database_name):
    '''recreates the users table'''
    db_conn = connect_to_db(database_name)
    cursor = db_conn.cursor()
    drop_users(cursor)
    create_users(cursor)
    db_conn.commit()
    cursor.close()
    db_conn.close()


if __name__ == '__main__':
    recreate_users('beatbucket')
    recreate_users('beatbucket_test')
