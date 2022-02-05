DATABASE_USER = "postgres"
DATABASE_PASSWORD = "postgres"
DATABASE_HOST = "localhost"
DATABASE_PORT = "5432"
DATABASE_NAME = ""


TORTOISE = {
    "connections": {
        "default": f"sqlite://database.sqlite3"
    },
    "apps": {
        "models": {
            "models": ("aerich.models",)
        },
        "auth": {
            "models": ("models.auth",),
            "default_connection": "default",
        },
        "api": {
            "models": ("models.api",),
            "default_connection": "default",
        }
    },
}


# Security

JWT_ACCESS_SECRET = b'8rInTXuvtGz9wixEdyr8MJhd1DzIR7_DcIjU1nI5wb4='
JWT_REFRESH_SECRET = b''
FERNET_KEY = b'8rInTXuvtGz9wixEdyr8MJhd1DzIR7_DcIjU1nI5wb4='
