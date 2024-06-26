import numpy as np
from flask import Flask,render_template,request,jsonify
import pickle

model = pickle.load(open('./model/model.pkl','rb'))

app = Flask(__name__)

@app.get('/')
def home():
    return render_template("index.html")

@app.post('/predict')
def predict():
    gender = int(request.form['gender'])
    age = int(request.form['age'])
    workout = int(request.form['workout'])
    weight = int(request.form['weight'])
    height = int(request.form['height'])
    temperature = int(request.form['temperature'])
    heartrate = int(request.form['heartrate'])
    input_data = np.array([gender,age,height,weight,workout,heartrate,temperature])
    input_df = input_data.reshape(1,-1)
    result = model.predict(input_df)
    return jsonify({
        'status': 200,
        'data': int(result[0])
    })

if __name__=='__main__': 
    app.run(debug=True)

