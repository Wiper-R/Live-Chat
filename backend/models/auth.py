from tortoise import models
from tortoise import fields


class AuthToken(models.Model):
    id = fields.IntField(pk=True)  # User-ID
    token = fields.TextField(null=True)  # The Token itself
    refresh_token = fields.TextField(null=True)  # The Refresh Token
