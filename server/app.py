import json
from bson import json_util
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__) 
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
mongo = PyMongo(app)


@app.route("/index", methods=["GET"])
def index(): 
    return jsonify(message="Todo app is running.")

@app.route("/insert", methods=["POST"])
def insert():
    ls = request.form
    pairs = ls.items()
    pairs_iterator = iter(pairs)
    (_, todo_key) = next(pairs_iterator)
    (_, todo_value) = next(pairs_iterator)

    if (not todo_value):
        return jsonify(message="No task added")

    data = {todo_key : todo_value}

    with open('database.json', "r+") as f:
        f_data = json.load(f)
        f_data.update(data)
        f.seek(0)
        json.dump(f_data, f)

        return jsonify(message="Added a task!")

@app.route("/delete", methods=["POST"])
def delete():
    ls = request.form
    pairs = ls.items()
    pairs_iterator = iter(pairs)
    (_, todo_key) = next(pairs_iterator)
    (_, todo_value) = next(pairs_iterator)

    if (not todo_value):
        return jsonify(message="No task deleted")

    f_data  = json.load(open("database.json"))

    if todo_key in f_data and f_data[todo_key]:
        f_data.pop(todo_key)

    # Output the updated file with pretty JSON                                      
    open("database.json", "w").write(
        json.dumps(f_data, sort_keys=True, indent=4, separators=(',', ': '))
    )
    return jsonify(message="Deleted a task!")

@app.route("/read", methods=["GET"])
def read():
    with open('database.json', "r+") as f:
        f_data = json.load(f)
        return f_data

if __name__ == "__main__":
    app.run(port=4000, debug=True)
