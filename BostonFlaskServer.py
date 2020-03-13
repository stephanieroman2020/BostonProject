from flask import Flask, render_template
import sqlite3
import pandas as pd
from flask import request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('webpage_d3 - 3.0.html')

if __name__ == "__main__":
    app.run(debug=True)



@app.route('/trash', methods=('GET', 'POST'))
def trash():
    connection = sqlite3.connect("boston.db")
    if request.method == 'GET':
        df3 = pd.read_sql_query("select * from TrashTable limit 5;", connection)
       
    return render_template('webpage_d3 - 2.1.html')
   #return df3.to_json()

