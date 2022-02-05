from tortoise.contrib.pydantic import pydantic_model_creator
from models.api import User

User_Pydantic = pydantic_model_creator(User)