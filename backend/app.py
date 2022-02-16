import asyncio
from quart import Quart
from tortoise import Tortoise
from config import TORTOISE
from blueprints import register_blueprints


app = Quart(__name__, static_folder="./static/")
register_blueprints(app)


@app.before_serving
async def _do_startup_tasks():
    # Initiating tortoise
    await Tortoise.init(TORTOISE)
    app.con = Tortoise.get_connection("default")
    await Tortoise.generate_schemas()


@app.route("/")
async def home():
    return "Hello"


@app.after_serving
async def _do_cleanup():
    await Tortoise.close_connections()
    # Closed Tortoise Connection


if __name__ == "__main__":
    task = app.run_task()
    asyncio.run(task)
