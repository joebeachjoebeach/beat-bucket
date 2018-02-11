#!/usr/bin/env python3.6

from api import create_app
app = create_app()
app.run(host='0.0.0.0')
