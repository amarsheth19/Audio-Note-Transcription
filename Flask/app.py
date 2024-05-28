from flask import Flask, request, session
from openai import OpenAI
import os
#import pyrebase
from werkzeug.utils import secure_filename
import time
import send2trash


UPLOAD_FOLDER = 'C:/Users/AmarS/CapstoneFinalProject/Capstone-Final-Project/Flask'
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
transcribed_files = {}
"""firebaseConfig = {
  'apiKey': "AIzaSyAoHqmKxapjNj2_KI1PCwmYEpBhDzplwqI",
  'authDomain': "note-taker-b550d.firebaseapp.com",
  'projectId': "note-taker-b550d",
  'storageBucket': "note-taker-b550d.appspot.com",
  'messagingSenderId': "508381657343",
  'appId': "1:508381657343:web:49f24213e68cf0693a74ca",
  'measurementId': "G-ZB5LKXBKZ7"
}
firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()


@app.route('/signup')
def signup():
    email = input("Enter email: ")
    password = input("Enter password: ")
    user = auth.create_user_with_email_and_password(email,password)"""

@app.route("/username", methods=['POST'])
def login():
    username = request.json["username"]
    #username = request.args.get('username')
    return {"username": 'This is the backend -- >'+ username }

@app.route('/upload', methods = ['POST'])
def upload_file():
    target=os.path.join(UPLOAD_FOLDER,'audio_files')
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file']
    id_token = request.form['id_token']
    #filename = secure_filename(file.filename)
    filename = "audiofile.mp3"
    destination="/".join([target, filename])
    file.save(destination)
    client = OpenAI(api_key="sk-proj-PxVo3vm1XoSzFH3fY1mvT3BlbkFJEKnKRuQHjqbJnnizM7xA")
    audio_file = open("Flask/audio_files/audiofile.mp3", "rb")
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file,
        response_format="text"
    )
    transcribed_files[secure_filename(file.filename)] = transcription
    #return transcription
    submit = transcription
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
        {"role": "system", "content": "You are summarizing text."},
        {"role": "user", "content": "take notes on this: "  +transcription},
        ]
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    app.run(debug=True) 
