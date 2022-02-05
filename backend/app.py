import asyncio
from quart import Quart
from quart_cors import cors
from tortoise import Tortoise
from config import TORTOISE
from blueprints import register_blueprints



app = Quart(__name__, static_folder="./static/")
register_blueprints(app)


@app.before_serving
async def _do_startup_tasks():
    # Initiating tortoise
    await Tortoise.init(TORTOISE)
    await Tortoise.generate_schemas()
    print("Initiated Tortoise")


@app.route("/")
async def home():
    return "Hello"


@app.after_serving
async def _do_cleanup():
    await Tortoise.close_connections()
    # Closed Tortoise Connection


async def main():
    try:
        await app.run_task()
    finally:
        print("App done serving now closing.")


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
