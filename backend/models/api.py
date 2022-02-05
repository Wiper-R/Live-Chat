from tortoise import models
from tortoise import fields
from utils.fields import EmailField


# Message Model
class Message(models.Model):
    id = fields.BigIntField(auto=True, pk=True)
    content = fields.TextField()
    author = fields.ForeignKeyField("api.User", related_name="author")
    receiver = fields.ForeignKeyField("api.User", related_name="receiver")
    created_at = fields.DatetimeField(auto_now=True)


class User(models.Model):
    username = fields.CharField(max_length=255, unique=True)
    firstname = fields.CharField(max_length=25)
    lastname = fields.CharField(max_length=25)
    email = EmailField(required=True, unique=True)
    password = fields.CharField(max_length=4096)

class Friend(models.Model):
    of = fields.ForeignKeyField("api.User", related_name="of")
    user = fields.ForeignKeyField("api.User", related_name="user")

class RelationShip(models.Model):
    id = fields.BigIntField(auto=True, pk=True)
    of = fields.ForeignKeyField("api.User")

    

