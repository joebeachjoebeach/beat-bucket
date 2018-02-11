FROM python:3.6.1

# install pipenv
RUN pip install pipenv

# set working directory
WORKDIR /usr/src/app

# add Pipfile
COPY ./Pipfile* ./

# install dependencies
RUN pipenv install

# add app
COPY . .

EXPOSE 5000

# run server
CMD ["pipenv", "run", "python", "run.py"]

