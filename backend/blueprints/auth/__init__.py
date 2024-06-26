import jwt, secrets
from quart import Blueprint, request
from config import JWT_ACCESS_SECRET, JWT_REFRESH_SECRET
from constants import BASE_TIME, JWT_ALGORITHIM
from utils.helpers import UnAuthorized, get_response, snowflake, utc_now
from models.auth import AuthToken
from models.api import User
from serializers import User_Pydantic
from datetime import datetime, timedelta
from tortoise.query_utils import Q
from tortoise.exceptions import DoesNotExist
from utils.helpers import snowflake, _set_cookie
from ..api import logged_in

bp = Blueprint("Auth-Blueprint", __name__, url_prefix="/api/auth")


@bp.errorhandler(jwt.PyJWTError)
async def py_jwt_error(e):
    return UnAuthorized


# Some helper methods
async def find_user_with_id_pass(username_or_email: str, password: str):
    try:
        user = await User.get(
            Q(username=username_or_email) | Q(email=username_or_email)
        )

        if password != user.password:
            raise DoesNotExist()

        return user

    except DoesNotExist:
        return None


def _expires_sec(expires: datetime) -> int:
    return round((expires - BASE_TIME).total_seconds())


async def serialize_user(user: User) -> dict:
    return (await User_Pydantic.from_tortoise_orm(user)).dict()


@bp.route("/signup", methods=("POST",))
async def signup():
    """
    # Basic Structure
    {
    "username": "Shivang97",
    "firstname": "Shivang",
    "lastname": "Rathore",
    "password": "test",
    "email": "rshivang12345@gmail.com"
    }
    """
    data = await request.get_json(force=True)

    try:
        username = data.pop("username")
        firstname = data.pop("firstname")
        lastname = data.pop("lastname")
        email = data.pop("email")
        password = data.pop("password")
    except KeyError as e:
        return get_response(
            message=f'You forgot to pass "{e.args[0]}" in JSON payload.',
            status=400,
        )

    # Check if unique keys are present already
    if await User.filter(username=username).count():
        return get_response(
            message="This username already exists!",
            status=422,
        )

    if await User.filter(email=email).count():
        return get_response(
            message="A account with this email already exists!",
            status=422,
        )
    user = await User.create(
        id=next(snowflake),
        username=username,
        firstname=firstname,
        lastname=lastname,
        email=email,
        password=password,
    )
    return get_response(
        message="Signup successfull, new user created!",
        user={
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "firstname": user.firstname,
            "lastname": user.lastname,
        },
        status=201,
    )


@bp.route("/login", methods=("POST",))
async def login():
    data = await request.get_json(force=True)
    try:
        password = data.pop("password")
    except KeyError:
        password = None

    if not password:
        return get_response(
            message="Password can't be empty.",
            status=400,
        )

    username_or_email = data.get("username")

    if username_or_email is None:
        username_or_email = data.get("email")

    if username_or_email is None:
        return get_response(
            message="You haven't specify either username or email.",
            status=400,
        )
    user = await find_user_with_id_pass(username_or_email, password)

    if not user:
        print("HEre")
        return get_response(
            message="This user doesn't exists.",
            status=404,
        )

    token_expires = utc_now() + timedelta(minutes=30)

    payload = {
        "token_type": "access",
        "sub": user.id,
        "exp": token_expires,
        "iat": utc_now(),
    }

    token = jwt.encode(payload, JWT_ACCESS_SECRET, JWT_ALGORITHIM)

    ## Refresh Token
    refresh_token_expires = utc_now() + timedelta(days=30)  ## One Month

    payload = {
        "sub": secrets.token_urlsafe(32),
        "token_type": "refresh",
        "exp": refresh_token_expires,
        "iat": utc_now(),
    }

    refresh_token = jwt.encode(payload, JWT_REFRESH_SECRET, JWT_ALGORITHIM)

    data = {
        "token": token,
        "refresh_token": refresh_token,
        "exp": _expires_sec(token_expires),
        "iat": utc_now(),
    }

    # Finding Token in Database
    await AuthToken.create(
        user_id=user.id,
        token=token,
        refresh_token=refresh_token,
        expires=refresh_token_expires,
    )

    res = get_response()
    _set_cookie(res, "token", token, timedelta(minutes=30))
    _set_cookie(res, "refresh_token", refresh_token, timedelta(days=30))
    return res


@bp.route("/protected", methods=("POST",))
async def protected():
    access_token = request.cookies.get("token")

    try:
        refresh_token = request.cookies["refresh_token"]
    except KeyError:
        return UnAuthorized

    atk = await AuthToken.get_or_none(refresh_token=refresh_token)

    if (
        not atk
        or not atk.token
        or not atk.refresh_token
        or refresh_token != atk.refresh_token
    ):
        return UnAuthorized

    if not access_token:
        try:
            jwt.decode(atk.token, JWT_ACCESS_SECRET, [JWT_ALGORITHIM])
            return UnAuthorized
        except jwt.PyJWTError:
            jwt.decode(refresh_token, JWT_REFRESH_SECRET, [JWT_ALGORITHIM])

        res = get_response(200)

        # Generate new token
        expires = utc_now() + timedelta(minutes=30)
        payload = {
            "token_type": "access",
            "sub": atk.user_id,
            "exp": expires,
            "iat": utc_now(),
        }
        newtoken = jwt.encode(payload, JWT_ACCESS_SECRET, JWT_ALGORITHIM)
        atk.token = newtoken
        await atk.save()
        _set_cookie(res, "token", newtoken, timedelta(minutes=30))
        return res
    else:
        return get_response()


@bp.get("/logout")
async def logout():
    refresh_token = request.cookies["refresh_token"]
    count = await AuthToken.filter(refresh_token=refresh_token).delete()
    print(count)
    response = get_response(203)
    _set_cookie(response, "token", "", timedelta())
    _set_cookie(response, "refresh_token", "", timedelta())
    return response


@bp.delete("/logout/all")
async def logout_all():
    refresh_token = request.cookies["refresh_token"]

    authtoken = await AuthToken.get_or_none(refresh_token=refresh_token)

    if not authtoken:
        return UnAuthorized

    payload = jwt.decode(refresh_token, JWT_REFRESH_SECRET, [JWT_ALGORITHIM])

    await AuthToken.filter(user_id=authtoken.user_id).delete()

    return get_response(203)
