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


def create_projects(cursor):
    '''Creates the projects table'''
    cursor.execute(
        '''
        CREATE TABLE projects (
            id SERIAL PRIMARY KEY,
            name VARCHAR(25) NOT NULL,
            user_id INTEGER FOREIGN KEY NOT NULL,
            bpm INTEGER NOT NULL
        )
        '''
    )


def create_tracks(cursor):
    '''Creates the tracks table'''
    cursor.execute(
        '''
        CREATE TABLE tracks (
            id SERIAL PRIMARY KEY,
            name VARCHAR(20) NOT NULL,
            project_id INTEGER FOREIGN KEY NOT NULL,
            base_note INTEGER,
            muted BOOLEAN,
            soloed BOOLEAN,
            sequence JSON
        )
        '''
    )


if __name__ == '__main__':
    recreate_users('beatbucket')
    recreate_users('beatbucket_test')
