import datetime
import jwt


def encode_auth_token(user_id, secret_key):
    '''Takes a user id and generates an auth token'''
    now = datetime.datetime.utcnow()
    payload = {
        'exp': now + datetime.timedelta(days=1),
        'iat': now,
        'sub': user_id
    }
    return jwt.encode(
        payload,
        secret_key,
        algorithm='HS256'
    )


def decode_auth_token(auth_token, secret_key):
    '''Decodes the auth token'''
    try:
        payload = jwt.decode(
            auth_token,
            secret_key,
            algorithms=['HS256']
        )
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def get_token(headers):
    '''Gets the auth token from the headers if it exists'''
    auth_header = headers.get('Authorization')
    if auth_header:
        return auth_header.split(' ')[1]
    return ''

# does this need to return both the token and the id?
def get_user_id_from_token(headers, secret_key):
    '''
    Tries to get the user_id from the auth token in the headers
    If it fails, it returns a dict with 'error' and 'status_code' keys
    '''
    auth_token = get_token(headers)
    if not auth_token:
        return {'error': 'No authentication provided', 'status_code': 401}

    user_id = decode_auth_token(auth_token, secret_key)

    if user_id is None:
        return {'error': 'Invalid token', 'status_code': 401}

    return {'user_id': user_id}
