from flask import Flask, request
from openai import OpenAI

import time

app = Flask(__name__)

@app.route('/members')
def members():
    print("in members")
    return {"username": "username"}

@app.route("/") 
def index(): 
    print("in index")
    return "Homepage of Website"

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route("/username", methods=['POST'])
def login():
    username = request.json["username"]
    #username = request.args.get('username')
    return {"username": 'This is the backend -- >'+ username }

@app.route('/upload', methods = ['POST'])
def upload_file():
    file = request.files['file']
    client = OpenAI()
    audio_file = open(file, "rb")
    transcription = client.audio.transcriptions.create(
    model="whisper-1",
    file=audio_file,
    response_format="text"
    )
    print(transcription)
    submit = "Take notes on the following lecture: " + transcription
    response = client.completions.create(
    model="gpt-3.5-turbo-0125",
    prompt= submit
    )
    return response

if __name__ == "__main__":
    app.run(debug=True) 
