from flask import Flask, render_template
import sqlite3
import pandas as pd
from flask import request
import json

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('webpage_consolidated - 5.0.html')

@app.route('/trash')
def trash():
    trash_file=open("static/data/Trash.geojson", 'r')
    trash_json=json.load(trash_file)
    return json.dumps(trash_json)

@app.route('/noise')
def noise():
    noise_file=open("static/data/Noise2.geojson", 'r')
    noise_json=json.load(noise_file)
    return json.dumps(noise_json)

@app.route('/rodents')
def rodents():
    rodents_file=open("static/data/RodentsPests.geojson", 'r')
    rodents_json=json.load(rodents_file)
    return json.dumps(rodents_json)

@app.route('/neighborhoods')
def neighborhoods():
    neighborhoods_file=open("static/data/Boston_Neighborhoods.geojson", 'r')
    neighborhoods_json=json.load(neighborhoods_file)
    return json.dumps(neighborhoods_json)

if __name__ == "__main__":
    app.run(debug=True)
