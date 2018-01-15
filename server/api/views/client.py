'''
Front-end client views that render HTML
'''

from flask import Blueprint, render_template

client_bp = Blueprint('client_bp', __name__)

@client_bp.route('/')
def index():
    '''Index'''
    return render_template('index.html')
