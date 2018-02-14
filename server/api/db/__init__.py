import psycopg2

from api.db.auth import (get_user_by_email, add_user, create_hashed_user, insert_user,
                            email_exists, get_user_by_id)
from api.db.project import (get_all_projects, get_project_id, get_project, insert_project,
                            update_project, delete_project)
from api.db.track import insert_track, update_track, delete_track


def get_db(app, g):
    '''gets the db'''
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_to_db(app)
    return db


def connect_to_db(app):
    '''Initializes db connection'''
    return psycopg2.connect(
        host='bb-db',
        port='5432',
        database=app.config['DB_NAME'],
        user='postgres',
        password='password'
    )
