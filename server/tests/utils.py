import json

def post_save(data, auth_token, app):
    '''Sends POST to /save endpoint'''
    return app.post(
        '/save',
        data=json.dumps(data),
        content_type='application/json',
        headers=dict(Authorization=f'Bearer {auth_token}'))


def get_project(project_id, auth_token, app):
    '''Sends GET to /project endpoint'''
    return app.get(
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
    return res_data['authToken']


def login_mackland(app):
    '''Logs in as bmackland@fbi.net'''
    user = {'email': 'bmackland@fbi.net', 'password': 'mackland'}
    res = login(user, app)
    res_data = json.loads(res.data)
    return res_data['authToken']
