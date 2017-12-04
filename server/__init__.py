from flask import Flask, render_template, url_for

app = Flask(__name__, static_folder='../dist', template_folder='../dist')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/register')
def register():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('index.html')


@app.route('/logout')
def logout():
    return render_template('index.html')

