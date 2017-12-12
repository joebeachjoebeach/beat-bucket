from fixtures import temp_app

def test_app_is_testing(temp_app):
    conf = temp_app.application.config
    assert conf['TESTING'] is True
    assert conf['DB_NAME'] == 'beatbucket_test'
    assert conf['SECRET_KEY'] != 'shazaam'
