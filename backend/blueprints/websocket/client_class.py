from typing import List
from quart import Websocket


class Client:
    def __init__(self, id: int, ws: Websocket):
        self.id: int = id
        self.ws: Websocket = ws


    def __eq__(self, __o: object) -> bool:
        if isinstance(__o, int):
            return self.id == __o

        return False