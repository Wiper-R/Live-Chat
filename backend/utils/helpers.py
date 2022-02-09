import json, time
from datetime import timedelta, timezone
from quart import Response
from datetime import datetime
from constants import DATETIME_FORMAT, EPOCH_MILLISECONDS
from utils.snowflake import Snowflake


def get_response(status: int = 200, **kwargs):
    return Response(json.dumps(kwargs), status=status, mimetype="application/json")


def dt_to_str(time: datetime) -> str:
    return time.strftime(DATETIME_FORMAT)


def str_to_dt(timestr: str) -> datetime:
    return datetime.strptime(timestr, DATETIME_FORMAT)


def utc_now() -> datetime:
    return datetime.now(tz=timezone.utc)


def _set_cookie(response: Response, key: str, value: str, max_age: timedelta):
    response.set_cookie(
        key=key,
        value=value,
        httponly=True,
        samesite="None",
        secure=True,
        max_age=max_age,
    )


UnAuthorized = get_response(
    message="You are not authorized.",
    status=401,
)

snowflake = Snowflake(EPOCH_MILLISECONDS)
