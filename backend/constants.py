from datetime import datetime, timezone


DATETIME_FORMAT = "%d-%m-%Y %H:%M:%S"
BASE_TIME = datetime(2022, 1, 1, 0, 0, 0, 0, tzinfo=timezone.utc)
JWT_ALGORITHIM = "HS256"
EPOCH_MILLISECONDS = 1640995200000