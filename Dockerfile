# this Dockerfile is for deployment of ./server to Heroku

FROM python:3.6.1

# install pipenv
RUN pip install pipenv

# set working directory
WORKDIR /usr/src/app

# add Pipfile
COPY ./server/Pipfile ./
COPY ./server/Pipfile.lock ./

# generate requirements.txt and install dependencies
# trying to do this with `pipenv install` leads to permissions issues w/ Heroku
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt

# add app
COPY ./server .

ENV SECRET_KEY=${SECRET_KEY} DATABASE_URL=${DATABASE_URL} APP_SETTINGS="api.config.ProdConfig"

RUN useradd -m myuser
USER myuser

CMD gunicorn -b 0.0.0.0:$PORT run:app
