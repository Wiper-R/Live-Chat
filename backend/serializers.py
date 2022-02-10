from tortoise.contrib.pydantic import pydantic_model_creator
from models.api import User, RelationShip

RelationShip_Pydantic = pydantic_model_creator(RelationShip)
User_Pydantic = pydantic_model_creator(User)
