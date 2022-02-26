from quart import Quart
from quart_cors import cors


def _cors(bp):
    return cors(bp, allow_origin=["http://localhost:3000", "http://localhost:3005"], allow_credentials=True)


def register_blueprints(app: Quart):
    # Auth Blueprints
    from . import auth

    app.register_blueprint(_cors(auth.bp))
    print("Registered Auth Blurprint")

    # App Blueprints
    from . import api

    app.register_blueprint(_cors(api.bp))
    print("Registered App Blueprint")

    # Websocket Blueprints
    from . import websocket

    app.register_blueprint(websocket.bp)
    print("Registered Websocket Blueprint")
