from flask import Flask

app = Flask(__name__)

@app.route('/members')
def members():
    print("in members")
    return {"username": "username"}

@app.route("/") 
def index(): 
    print("in index")
    return "Homepage of GeeksForGeeks"

if __name__ == "__main__":
    app.run(debug=True) 