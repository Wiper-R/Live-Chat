from datetime import timedelta
from quart import Blueprint, jsonify, request
import jwt
from config import JWT_ACCESS_SECRET
from constants import JWT_ALGORITHIM
from utils.helpers import UnAuthorized, utc_now
from models.api import Friend, User
from models.auth import AuthToken
from quart import g


def logged_in(func):
    async def wrapper(*args, **kwargs):
        try:
            tt, token = request.headers['AUTHORIZATION'].split(' ')
            g.access_token = token
            jwt.decode(token, JWT_ACCESS_SECRET, [JWT_ALGORITHIM])
            return await func(*args, **kwargs)
        except (KeyError, jwt.PyJWTError, IndexError):
            return UnAuthorized

    wrapper.__name__ = func.__name__

    return wrapper


bp = Blueprint("App-Blueprint", __name__, url_prefix="/api")


def safe_user(user):
    fields = (
        "username",
        "firstname",
        "lastname",
        "id",
    )
    data = {}

    for field in fields:
        data[field] = getattr(user, field)

    return data


async def serialize_friend(friend):
    data = {
        "id": friend.id,
        "of": friend.of_id,
        "user": safe_user(await friend.user),
    }
    return data


@bp.route("/friends", methods=("GET",))
@logged_in
async def fetch_friends():
    token = g.access_token
    payload = jwt.decode(token, JWT_ACCESS_SECRET, [JWT_ALGORITHIM])
    user_id = payload["sub"]

    friends = await Friend.filter(of=user_id).all()

    data = []

    for friend in friends:
        data.append(await serialize_friend(friend))

    return jsonify(data)


@bp.route("/user/<int:user>", methods=("GET",))
@logged_in
async def fetch_user(user: int):
    token = g.access_token
    jwt.decode(token, JWT_ACCESS_SECRET, [JWT_ALGORITHIM])
    user = await User.get_or_none(id=user)
    if user:
        return safe_user(user)
    else:
        return {}


@bp.route("/user/@me", methods=("GET",))
@logged_in
async def get_current_user():
    token = g.access_token
    payload = jwt.decode(token, JWT_ACCESS_SECRET, [JWT_ALGORITHIM])
    sub = payload["sub"]
    user = await User.get(id=sub)
    return safe_user(user)


@bp.before_request
async def add_token_to_headers():
    token = request.cookies.get("token")
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        return

    g.access_token_renewed = False

    if token:
        try:
            jwt.decode(token, JWT_ACCESS_SECRET, [JWT_ALGORITHIM])
        except jwt.ExpiredSignatureError:
            token = None
        except jwt.InvalidTokenError:
            return
    
    if not token:
        ## Token is expired, renew it.
        atk = await AuthToken.get_or_none(refresh_token=refresh_token)

        if not atk:
            return

        expires = utc_now() + timedelta(minutes=30)

        payload = {
            "token_type": "access",
            "sub": atk.id,
            "exp": expires,
            "iat": utc_now(),
        }

        token = jwt.encode(payload, JWT_ACCESS_SECRET, JWT_ALGORITHIM)
        atk.token = token
        await atk.save()
        g.access_token_renewed = True
        g.renewed_access_token = token

    request.headers['AUTHORIZATION'] = f'Bearer {token}'

@bp.after_request
async def set_access_token_cookie_if_required(response):
    if g.access_token_renewed:
        response.set_cookie(
            key="token",
            value=g.renewed_access_token,
            httponly=True,
            samesite="None",
            secure=True,
            max_age=timedelta(minutes=30),
        )
    
    return response


    
