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
        payload = jwt.decode(auth_token, secret_key)
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
