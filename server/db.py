import psycopg2
import bcrypt

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
        INSERT INTO users (email, username, password, salt)
        VALUES (%(email)s, %(username)s, %(password)s, %(salt)s)
        ''',
        hashed_user_dict
    )


def username_exists(conn, username):
    '''Checks if a username already exists in the database'''
    cursor = conn.cursor()
    cursor.execute(
        '''
        SELECT username FROM users
        WHERE username = %s
        ''',
        (username,)
    )
    result = cursor.fetchone()
    cursor.close()
    if result is not None:
        return True
    return False


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


def connect_to_db(db_name):
    '''Initializes db connection'''
    return psycopg2.connect(
        host='localhost',
        port='5400',
        database=db_name,
        user='postgres',
        password='password'
    )
