from random import randint
from quart import Blueprint, websocket
from .client_class import Client
from typing import List


clients: List[Client] = []

async def add_client(client: Client):
    pc = get_client_with_id(client.id)
    if pc is not None:
        await pc.ws.close(0)
        print("Closed Previous Connection")
        clients.remove(pc)
    clients.append(client)
    print("Appended Client")

def get_client_with_id(id: int):
    for client in clients:
        if client.id == id:
            return client

    return None

bp = Blueprint("Websocket-Blueprint", __name__)


# Send Message Function
async def send_message(author_id: int, target_id: int, content: str):
    client = get_client_with_id(target_id)
    if client is not None:
        await client.ws.send_json(
            {
                "event": "message_received",
                "content": content,
                "author_id": author_id,
            }
        )

        return True

    return False


@bp.websocket("/ws")
async def ws():
    wd = await websocket.receive_json()
    # token = wd['token']
    # client_id = data['id']
    client_id = wd['client_id']
    client = Client(
           client_id,
           websocket._get_current_object()
       ) 
    await add_client(client)
    while True:
        data = await websocket.receive_json()
        print(data)
        res = await send_message(client_id, data["target_id"], data["content"])
        # await websocket.send_json(
        #     {
        #         "status": 200,
        #         "message": "Message sent successfully." if res else "Message not delivered."
        #     }
        # )
        print("Message Sending")

