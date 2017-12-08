from flask import Blueprint, current_app, Flask, g, render_template, url_for
import psycopg2
import psycopg2.extras
import pprint
from server.db import connect_to_db


def create_app(**config_overrides):
    app = Flask(__name__, static_folder='../dist', template_folder='../dist')
    
    app.config.from_object('server.config')
    app.config.update(config_overrides)
    app.register_blueprint(bb)

    @app.teardown_appcontext
    def teardown_db(e):
        db = getattr(g, '_database', None)
        if db is not None:
            db.close()

    return app


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_to_db(current_app.config['DB_NAME'])
    return db


bb = Blueprint('bb', __name__)


@bb.route('/')
def index():
    return render_template('index.html')


@bb.route('/register')
def register():
    return render_template('index.html')


@bb.route('/login')
def login():
    db = get_db()
    # pprint.pprint(current_app.config)
    cursor = db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute('SELECT * FROM test')
    res = cursor.fetchone()
    print(res['name'])
    print(res)
    return render_template('index.html')


@bb.route('/logout')
def logout():
    return render_template('index.html')

