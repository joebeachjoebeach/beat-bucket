from server.auth import encode_auth_token

def test_encode_auth_token():
    token = encode_auth_token(134, 'shazaam')
    assert isinstance(token, bytes)
