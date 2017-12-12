import datetime
import jwt


def encode_auth_token(user_id, secret_key):
    '''takes a user id and generates an auth token'''
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


'''
def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'
'''