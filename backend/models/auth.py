from tortoise import models
from tortoise import fields


class AuthToken(models.Model):
    id = fields.IntField(pk=True)
    user_id = fields.BigIntField()  # User-ID
    token = fields.TextField(null=True)  # The Token itself
    refresh_token = fields.TextField(null=True)  # The Refresh Token
    expires = fields.DatetimeField()
