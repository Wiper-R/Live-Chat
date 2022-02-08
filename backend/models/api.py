from tortoise import models
from tortoise import fields
from utils.fields import EmailField
from enum import IntEnum
from utils.helpers import snowflake

class RelationshipType(IntEnum):
    friends = 1
    pending_incoming = 2
    pending_outgoing = 3

class Message(models.Model):
    id = fields.BigIntField(pk=True, default=snowflake.__next__)
    content = fields.TextField()
    author = fields.ForeignKeyField("api.User", related_name="author")
    recipient = fields.ForeignKeyField("api.User", related_name="recipient")
    created_at = fields.DatetimeField(auto_now=True)

class User(models.Model):
    id = fields.BigIntField(pk=True, default=snowflake.__next__)
    username = fields.CharField(max_length=255, unique=True)
    firstname = fields.CharField(max_length=25)
    lastname = fields.CharField(max_length=25)
    email = EmailField(required=True, unique=True)
    password = fields.CharField(max_length=4096)

class RelationShip(models.Model):
    id = fields.BigIntField(default=snowflake.__next__, pk=True)
    of = fields.ForeignKeyField("api.User")
    user = fields.ForeignKeyField("api.User", related_name="with")
    type = fields.IntEnumField(RelationshipType)

    

