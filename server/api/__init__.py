from flask import Blueprint, current_app, Flask, g, jsonify, render_template, request
from flask_cors import CORS
from api.views.auth import auth_bp
from api.views.resource import resource_bp


def create_app(**config_overrides):
    '''app factory'''
    app = Flask(__name__, static_folder='../dist', template_folder='../dist')
    CORS(app)

    app.config.from_object('api.config')
    app.config.update(config_overrides)
    app.register_blueprint(auth_bp)
    app.register_blueprint(resource_bp)

    @app.teardown_appcontext
    def teardown_db(exception):
        '''Tears down the database connection after a request'''
        db = getattr(g, '_database', None)
        if db is not None:
            db.close()

    return app
