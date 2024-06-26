from tortoise import models
from tortoise import fields
from utils.fields import EmailField, SnowflakeField
from enum import IntEnum
from utils.helpers import snowflake


class RelationshipType(IntEnum):
    friends = 1
    pending_incoming = 2
    pending_outgoing = 3


class Message(models.Model):
    id = SnowflakeField(pk=True)
    content = fields.TextField()
    author = fields.ForeignKeyField("api.User", related_name="author")
    channel = fields.ForeignKeyField("api.Channel", related_name="channel")
    created_at = fields.DatetimeField(auto_now=True)


class User(models.Model):
    id = SnowflakeField(pk=True)
    username = fields.CharField(max_length=255, unique=True)
    firstname = fields.CharField(max_length=25)
    lastname = fields.CharField(max_length=25)
    email = EmailField(required=True, unique=True)
    password = fields.CharField(max_length=4096)


class RelationShip(models.Model):
    id = SnowflakeField(pk=True)
    of = fields.ForeignKeyField("api.User", related_name="of")
    to = fields.ForeignKeyField("api.User", related_name="to")
    type = fields.IntEnumField(RelationshipType)

    class Meta:
        unique_together = ("of_id", "to_id", "type")


class Channel(models.Model):
    id = SnowflakeField(pk=True)
    recipients = fields.ManyToManyField("api.User", related_name="recipients")
