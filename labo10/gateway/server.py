import json
from flask import Flask, request

# created after this
from auth import validate
from auth_svc import access

server = Flask(__name__)
# referencing RabbitMQ host


@server.route("/login", methods=["POST"])
def login():
    token, err = access.login(request)

    if not err:
        return token
    else:
        return err


@server.route("/upload", methods=["POST"])
def upload():
    access, err = validate.token(request)
    access = json.loads(access)
    if access.get("admin", False):
        if len(request.files) > 1 or len(request.files) < 1:
            return "exactly 1 file is required", 400

        # only 1
        for _, f in request.files.items():
            print("we doen voorlopig gewoon alsof de file hier is verstuurd")
            print("volgende keer voorzien we de queue")
        return "success!", 200
    else:
        return "not authorized", 401

@server.route("/download", methods=["GET"])
def download():
    pass

if __name__ == '__main__':
    server.run(host="0.0.0.0", port=8080)
