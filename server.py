from flask import Flask, render_template, url_for

app = Flask(__name__, static_folder='./dist', template_folder='./dist')

@app.route('/')
def index():
  return render_template('index.html')

if __name__ == '__main__':
  # this is for running on c9.io:
  app.run(host='0.0.0.0', port=8080, debug=True)
  # this is for running in a local dev environment:
  # app.run(debug=True)
