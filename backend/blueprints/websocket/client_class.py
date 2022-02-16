from typing import List
from quart import Websocket


class Client:
    def __init__(self, id: int, refresh_token: str, ws: Websocket):
        self.id: int = id
        self.refresh_token = refresh_token
        self.ws: Websocket = ws

    def __eq__(self, __o: object) -> bool:
        if isinstance(__o, int):
            return self.refresh_token == __o.refresh_token
        return False
