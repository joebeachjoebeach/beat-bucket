import psycopg2
import psycopg2.extras
import bcrypt


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


def connect_to_db(db_name):
    '''Initializes db connection'''
    return psycopg2.connect(
        host='localhost',
        port='5400',
        database=db_name,
        user='postgres',
        password='password'
    )
