import datetime
import jwt
from server.auth import encode_auth_token, decode_auth_token


def test_encode_auth_token():
    '''Tests that a token can be encoded'''
    token = encode_auth_token(134, 'shazaam')
    assert isinstance(token, bytes)


def test_decode_auth_token():
    '''Tests that a token can be decoded'''
    token = encode_auth_token(123, 'shazaam')
    res = decode_auth_token(token, 'shazaam')
    assert res == 123


def test_decode_token_wrong_key():
    '''Tests that a token can't be decoded with the wrong key'''
    token = encode_auth_token(123, 'shazaam')
    res = decode_auth_token(token, 'kazaam')
    assert res is None


def test_decode_expired_token():
    '''Tests that an expired token can't be decoded'''
    now = datetime.datetime.utcnow()
    payload = {
        'exp': now - datetime.timedelta(seconds=30),
        'iat': now - datetime.timedelta(minutes=1),
        'sub': 123
    }
    token = jwt.encode(
        payload,
        'shazaam',
        algorithm='HS256'
    )
    res = decode_auth_token(token, 'shazaam')
    assert res is None
