from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>Flask Stats</h1><p>App is running.</p>'

if __name__ == '__main__':
    app.run(debug=True)
