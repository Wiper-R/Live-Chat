from quart import Quart
from quart_cors import cors


def _cors(bp):
    return cors(bp, allow_origin='http://localhost:3000', allow_credentials=True)


def register_blueprints(app: Quart):
    # Auth Blueprints
    from .auth import auth_blueprint 

    app.register_blueprint(_cors(auth_blueprint.bp))
    print("Registered Auth Blurprint")


    # App Blueprints
    from ._app import app_blueprint
    app.register_blueprint(_cors(app_blueprint.bp))
    print("Registered App Blueprint")

    # Websocket Blueprints
    from .websocket import websocket_blueprint

    app.register_blueprint(websocket_blueprint.bp)
    print("Registered Websocket Blueprint")
