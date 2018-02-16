import datetime
import json
import jwt

def post_save(data, auth_token, app):
    '''Sends POST to /save endpoint'''
    return app.post(
        '/save',
        data=json.dumps(data),
        content_type='application/json',
        headers=dict(Authorization=f'Bearer {auth_token}'))


def patch_save(data, auth_token, app):
    '''Sends PUT to /save endpoint'''
    return app.patch(
        '/save',
        data=json.dumps(data),
        content_type='application/json',
        headers=dict(Authorization=f'Bearer {auth_token}'))


def get_project(project_id, auth_token, app):
    '''Sends GET to /project/:id: endpoint'''
    return app.get(
        f'/project/{project_id}',
        headers=dict(Authorization=f'Bearer {auth_token}'))


def delete_project(project_id, auth_token, app):
    '''Sends DELETE to /project endpoint'''
    return app.delete(
        f'/project/{project_id}',
        headers=dict(Authorization=f'Bearer {auth_token}'))


def get_projects(auth_token, app):
    '''Sends GET to /projects endpoint'''
    return app.get(
        '/projects',
        headers=dict(Authorization=f'Bearer {auth_token}'))


def login(user, app):
    '''sends login request'''
    return app.post(
        '/auth/login',
        data=json.dumps(user),
        content_type='application/json')


def login_hello(app):
    '''Logs in as hello@goodbye.com'''
    user = {'email': 'hello@goodbye.com', 'password': 'goodbye'}
    res = login(user, app)
    res_data = json.loads(res.data)
    return res_data['accessToken']


def login_mackland(app):
    '''Logs in as bmackland@fbi.net'''
    user = {'email': 'bmackland@fbi.net', 'password': 'mackland'}
    res = login(user, app)
    res_data = json.loads(res.data)
    return res_data['accessToken']


def get_verify(auth_token, app):
    '''Posts GET to /auth/verify'''
    return app.get(
        '/auth/verify',
        headers=dict(Authorization=f'Bearer {auth_token}'))


def generate_expired_token(secret_key):
    '''Generates an expired jwt'''
    now = datetime.datetime.utcnow()
    token_payload = {
        'exp': now - datetime.timedelta(seconds=30),
        'iat': now - datetime.timedelta(minutes=1),
        'sub': 1
    }
    return jwt.encode(
        token_payload,
        secret_key,
        algorithm='HS256'
    )


def generate_invalid_token():
    '''Generates a token signed with the wrong key'''
    now = datetime.datetime.utcnow()
    token_payload = {
        'exp': now + datetime.timedelta(minutes=30),
        'iat': now,
        'sub': 1
    }
    return jwt.encode(
        token_payload,
        'kazaam!',
        algorithm='HS256'
    )
