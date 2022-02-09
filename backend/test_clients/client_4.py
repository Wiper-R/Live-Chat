import aiohttp, random


ids = [1, 2, 3]


async def main():
    session = aiohttp.ClientSession()
    ws = await session.ws_connect("http://127.0.0.1:5000/ws")

    await ws.send_json({"client_id": 4})
    while True:
        await ws.send_json(
            {
                "content": "Hi How are you!",
                "target_id": random.choice(ids),
            }
        )
        d = await ws.receive_json()
        print(d)
        await asyncio.sleep(2)


import asyncio

asyncio.get_event_loop().run_until_complete(main())
