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
    mongo.db["todolist"].insert_one({"todo_key" : "todo_value"})
    return jsonify(message="Todo app is running.")
    print(request.form)
    ls = request.form
    # ls = request.get_json()
    #Check if not empty
    if (not ls):
        return jsonify(message="No task added")
    
    #Add first pair
    pairs = ls.items()
    print("get pairs")
    pairs_iterator = iter(pairs)
    print("get iter")
    (todo_key, todo_value) = next(pairs_iterator)
    print("get pair")
    print(todo_key)
    print(todo_value)
    mongo.db["todolist"].insert_one({"todo_key" : "todo_value"})
    # mongo.db["todolist"].insert_one({todo_key : todo_value})
    print("inserting")
    return jsonify(message="Added a task!")

@app.route("/delete", methods=["GET"])
def delete():
    ls = request.get_json()
    #Check if not empty
    if (not ls):
        return jsonify(message="No task deleted")
    
    #Delete one if matching
    pairs = ls.items()
    pairs_iterator = iter(pairs)
    (todo_key, todo_value) = next(pairs_iterator)

    result = mongo.db["todolist"].delete_one({todo_key : todo_value})
    
    return jsonify(message="Deleted " + str(result.deleted_count) + " from collection!")

@app.route("/read", methods=["GET"])
def read():
    result = mongo.db["todolist"].find({})
    docs = {}

    for doc in result:
        doc.pop("_id")
        docs.update(doc)

    return json.loads(json_util.dumps(docs))

if __name__ == "__main__":
    app.run(port=4000, debug=True)