import os

class BaseConfig:
    ''' base configuration '''
    DEBUG = False
    TESTING = False
    DB_URL = os.getenv('DATABASE_URL')
    SECRET_KEY = os.getenv('SECRET_KEY', 'shazaam')


class DevConfig(BaseConfig):
    ''' development configuration '''
    DEBUG = True


class TestConfig(BaseConfig):
    ''' testing configuration '''
    DEBUG = True
    TESTING = True
    DB_URL = os.getenv('DATABASE_TEST_URL')


class ProdConfig(BaseConfig):
    ''' production config '''
    DEBUG = False
