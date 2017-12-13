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


def drop_projects(cursor):
    '''Drops the projects table'''
    cursor.execute('DROP TABLE IF EXISTS projects')


def create_projects(cursor):
    '''Creates the projects table'''
    cursor.execute(
        '''
        CREATE TABLE projects (
            id SERIAL PRIMARY KEY,
            name VARCHAR(25) NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users,
            bpm INTEGER NOT NULL
        )
        '''
    )


def drop_tracks(cursor):
    '''Drops the tracks table'''
    cursor.execute('DROP TABLE IF EXISTS tracks')


def create_tracks(cursor):
    '''Creates the tracks table'''
    cursor.execute(
        '''
        CREATE TABLE tracks (
            id SERIAL PRIMARY KEY,
            name VARCHAR(20) NOT NULL,
            project_id INTEGER NOT NULL REFERENCES projects,
            base_note INTEGER,
            muted BOOLEAN,
            soloed BOOLEAN,
            sequence JSON
        )
        '''
    )


def recreate_all():
    '''recreates all the tables'''
    main_conn = connect_to_db('beatbucket')
    test_conn = connect_to_db('beatbucket_test')

    main_cur = main_conn.cursor()
    test_cur = test_conn.cursor()

    drop_tracks(main_cur)
    drop_tracks(test_cur)
    drop_projects(main_cur)
    drop_projects(test_cur)
    drop_users(main_cur)
    drop_users(test_cur)
    create_users(main_cur)
    create_users(test_cur)
    create_projects(main_cur)
    create_projects(test_cur)
    create_tracks(main_cur)
    create_tracks(test_cur)

    main_conn.commit()
    test_conn.commit()

    main_cur.close()
    test_cur.close()
    main_conn.close()
    test_conn.close()


if __name__ == '__main__':
    recreate_all()
