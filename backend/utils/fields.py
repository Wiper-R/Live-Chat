import re

from tortoise.fields import Field
from typing import Any

EMAIL_REGEX = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"


class EmailField(Field, str):
    def __init__(self, **kwargs: Any) -> None:
        self.SQL_TYPE = "VARCHAR(320)"
        super().__init__(**kwargs)

    def validate(self, value: Any):
        if re.fullmatch(EMAIL_REGEX, value):
            return True
        return False
