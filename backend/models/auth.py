from tortoise import models
from tortoise import fields
from datetime import datetime
from utils.fields import EmailField


class User(models.Model):
    username = fields.CharField(max_length=255, unique=True)
    firstname = fields.CharField(max_length=25)
    lastname = fields.CharField(max_length=25)
    email = EmailField(required=True, unique=True)
    password = fields.CharField(max_length=4096)


class AuthToken(models.Model):
    id = fields.IntField(pk=True) # User-ID
    token = fields.TextField(null=True) # The Token itself
    refresh_token = fields.TextField(null=True) # The Refresh Token