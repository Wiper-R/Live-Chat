from quart import Blueprint, jsonify, request
import jwt
from config import JWT_ACCESS_SECRET
from constants import JWT_ALGORITHIM
from utils.helpers import UnAuthorized
from models.app import Friend
from models.auth import User


def logged_in(func):
    async def wrapper(*args, **kwargs):
        try:
            token = request.cookies["token"]
            jwt.decode(token, JWT_ACCESS_SECRET, [JWT_ALGORITHIM])
            return await func(*args, **kwargs)
        except (KeyError, jwt.PyJWTError):
            return UnAuthorized

    wrapper.__name__ = func.__name__

    return wrapper     



bp = Blueprint('App-Blueprint', __name__, url_prefix="/api")

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
        'id': friend.id,
        'of': friend.of_id,
        'user': safe_user(await friend.user),
    }
    return data

@bp.route("/friends", methods=("GET",))
@logged_in
async def fetch_friends():
    token = request.cookies["token"]
    payload = jwt.decode(token, JWT_ACCESS_SECRET, [JWT_ALGORITHIM])
    user_id = payload['sub']
    
    friends = await Friend.filter(of=user_id).all()

    data = []

    for friend in friends:
        data.append(
            await serialize_friend(friend)
        )  

    return jsonify(data)

@bp.route("/user", methods=("POST",))
@logged_in
async def fetch_user():
    token = request.cookies["token"]
    jwt.decode(token, JWT_ACCESS_SECRET, [JWT_ALGORITHIM])
    data = await request.get_json(force=True)
    user_id = data['user_id']
    user = await User.get_or_none(
        id=user_id
    )
    if user:
        return safe_user(user)
    else:
        return {}



