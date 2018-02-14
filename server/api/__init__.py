import os
from flask import Flask, g, jsonify
from flask_cors import CORS
from api.views.auth import auth_bp
from api.views.resource import resource_bp


def create_app(conf_obj_path):
    '''app factory'''
    app = Flask(__name__, static_folder='../dist', template_folder='../dist')
    CORS(app)

    app.config.from_object(conf_obj_path)
    app.register_blueprint(auth_bp)
    app.register_blueprint(resource_bp)

    @app.errorhandler(404)
    def page_not_found(e):
        return jsonify({'error': '404: Page not found.'}), 404

    @app.teardown_appcontext
    def teardown_db(exception):
        '''Tears down the database connection after a request'''
        db = getattr(g, '_database', None)
        if db is not None:
            db.close()

    return app
