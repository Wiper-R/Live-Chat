import asyncio
from os import abort
from quart import Blueprint, websocket
from config import JWT_REFRESH_SECRET
from constants import JWT_ALGORITHIM
from models.auth import AuthToken
from .client_class import Client
from typing import List
import jwt


clients: List[Client] = []


def add_client(client: Client):
    clients.append(client)


def remove_client(client: Client):
    clients.remove(client)


def get_clients_with_id(id: int):
    return list(filter(lambda x: int(x.id) == int(id), clients))


bp = Blueprint("Websocket-Blueprint", __name__)


# Send Message Function
async def send_ws_message(target_id: int, event: str, payload: dict = None):
    if not payload:
        payload = {}

    clients = get_clients_with_id(target_id)

    sended = []

    for client in clients:
        await client.ws.send_json(
            {
                "e": event,
                "p": payload,
            }
        )
        sended.append(client)
    return sended


@bp.websocket("/ws")
async def ws():
    refresh_token = websocket.cookies.get("refresh_token")

    if not refresh_token:
        return abort(403)

    try:
        payload = jwt.decode(refresh_token, JWT_REFRESH_SECRET, [JWT_ALGORITHIM])
    except jwt.PyJWTError:
        return abort(403)

    authtoken = await AuthToken.get_or_none(refresh_token=refresh_token)

    if not authtoken:
        return abort(403)

    await websocket.accept()

    client = Client(
        id=authtoken.user_id,
        refresh_token=refresh_token,
        ws=websocket._get_current_object(),
    )

    add_client(client)

    while True:
        try:
            data = await websocket.receive_json()
            print(data)
        except asyncio.CancelledError:
            clients.remove(client)
            raise
