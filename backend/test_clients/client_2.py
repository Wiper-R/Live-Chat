import aiohttp, random
import json

ids = [1, 3, 4]


async def main():
    session = aiohttp.ClientSession()
    ws = await session.ws_connect("http://127.0.0.1:5000/ws")

    await ws.send_json({"client_id": 2})
    while True:
        # d = await ws.receive_json()
        message = await ws.receive()
        d = json.loads(message.data)
        print(d)
        await ws.send_json(
            {
                "content": d["content"],
                "target_id": 1,
            }
        )


import asyncio

asyncio.get_event_loop().run_until_complete(main())
