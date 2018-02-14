#!/usr/bin/env python3.6
import os

from api import create_app
app = create_app(os.getenv('APP_SETTINGS', 'api.config.DevConfig'))

if __name__ == '__main__':
    app.run(host='0.0.0.0')
