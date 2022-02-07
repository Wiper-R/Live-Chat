import json, time
from datetime import timezone
from quart import Response
from datetime import datetime
from constants import DATETIME_FORMAT, EPOCH_MILLISECONDS

def get_response(status: int = 200, **kwargs):
    return Response(
        json.dumps(kwargs), status=status, mimetype="application/json"
    )

def dt_to_str(time: datetime) -> str:
    return time.strftime(DATETIME_FORMAT)

def str_to_dt(timestr: str) -> datetime:
    return datetime.strptime(timestr, DATETIME_FORMAT)


def utc_now() -> datetime:
    return datetime.now(tz=timezone.utc)


def snowflake(incr):
    return (round(time.time() * 1000) - EPOCH_MILLISECONDS) << 22 + incr
    

UnAuthorized = get_response(
    message="You are not authorized.",
    status=401,
)
