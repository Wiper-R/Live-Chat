from datetime import timedelta
from quart import Blueprint, jsonify, request
import jwt
from config import JWT_ACCESS_SECRET
from constants import JWT_ALGORITHIM
from utils.helpers import UnAuthorized, get_response, utc_now, _set_cookie
from models.api import RelationShip, RelationshipType, User
from models.auth import AuthToken
from quart import g


def logged_in(func):
    async def wrapper(*args, **kwargs):
        try:
            tt, token = request.headers["AUTHORIZATION"].split(" ")
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
    user = await User.get(id=g.sub)
    return safe_user(user)


@bp.before_request
async def add_token_to_headers():
    token = request.cookies.get("token")
    refresh_token = request.cookies.get("refresh_token")

    g.access_token_renewed = False

    if not refresh_token:
        return

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

    pay = jwt.decode(token, JWT_ACCESS_SECRET, [JWT_ALGORITHIM])
    g.sub = pay["sub"]
    request.headers["AUTHORIZATION"] = f"Bearer {token}"


@bp.after_request
async def set_access_token_cookie_if_required(response):
    if g.access_token_renewed:
        _set_cookie(response, "token", g.renewed_access_token, timedelta(minutes=30))

    return response


@bp.post("/relationships/@me")
async def send_friend_request():
    data = await request.get_json()
    username = data["username"]

    if username.startswith("@"):
        username = username[1:]

    to = await User.get_or_none(username=username)

    if to is None:
        return get_response(status=404, message="Can't find user with that username.")

    relationship = await RelationShip.get_or_none(of_id=g.sub, to_id=to.id)
    relationship_other = await RelationShip.get_or_none(of_id=to.id, to_id=g.sub)

    if relationship and relationship.type == RelationshipType.pending_incoming:
        relationship.type = RelationshipType.friends
        await relationship.save()

        relationship_other.type = RelationshipType.friends
        await relationship_other.save()

    if not relationship:
        relationship = await RelationShip.create(
            of_id=g.sub,
            to_id=to.id,
            type=RelationshipType.pending_outgoing,
        )
        await RelationShip.create(
            of_id=to.id,
            to_id=g.sub,
            type=RelationshipType.pending_incoming,
        )

    serialized = {
        "id": relationship.id,
        "to": safe_user(to),
    }

    return get_response(**serialized)


@bp.get("/relationships/@me/friends")
@logged_in
async def fetch_friends():
    relationships = await RelationShip.filter(
        of_id=g.sub, type=RelationshipType.friends
    ).all()

    data = []

    for relationship in relationships:
        data.append({"id": relationship.id, "to": safe_user(await relationship.to)})

    return jsonify(data)


@bp.get("/relationships/@me/incoming")
@logged_in
async def fetch_incoming_relationships():
    relationships = await RelationShip.filter(
        of_id=g.sub, type=RelationshipType.pending_incoming
    ).all()

    data = []

    for relationship in relationships:
        data.append({"id": relationship.id, "to": safe_user(await relationship.to)})

    return jsonify(data)
