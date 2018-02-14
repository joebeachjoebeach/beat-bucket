''' Initialize the db tables: `users` and `projects` '''

import os
import psycopg2


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
            name VARCHAR(100) NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users,
            data JSON,
            shared BOOLEAN NOT NULL
        )
        '''
    )


def recreate_all():
    '''recreates all the tables'''
    main_db_url = os.getenv('DATABASE_URL', None)
    main_conn = psycopg2.connect(main_db_url)
    main_cur = main_conn.cursor()
    drop_projects(main_cur)
    drop_users(main_cur)
    create_users(main_cur)
    create_projects(main_cur)
    main_conn.commit()
    main_cur.close()
    main_conn.close()

    test_db_url = os.getenv('DATABASE_TEST_URL', None)
    if test_db_url is not None:
        test_conn = psycopg2.connect(test_db_url)
        test_cur = test_conn.cursor()
        drop_projects(test_cur)
        drop_users(test_cur)
        create_users(test_cur)
        create_projects(test_cur)
        test_conn.commit()
        test_cur.close()
        test_conn.close()


if __name__ == '__main__':
    recreate_all()
