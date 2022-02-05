from typing_extensions import Required
from tortoise import models
from tortoise import fields


# Message Model
class Message(models.Model):
    id = fields.BigIntField(auto=True, pk=True)
    content = fields.TextField()
    author = fields.ForeignKeyField("models.User", related_name="author")
    receiver = fields.ForeignKeyField("models.User", related_name="receiver")
    created_at = fields.DatetimeField(auto_now=True)


class Chat(models.Model):
    owner_id = fields.BigIntField(required=True)
    user_id = fields.BigIntField(required=True)
    created_at = fields.DatetimeField(auto_now=True)
    last_active = fields.DatetimeField()


class Friend(models.Model):
    of = fields.ForeignKeyField("models.User", related_name="of")
    user = fields.ForeignKeyField("models.User", related_name="user")
    

