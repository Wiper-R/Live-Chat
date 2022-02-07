import os
import time
from constants import EPOCH_MILLISECONDS


TIMESTAMP_LEFT_SHIFT = 22
INTERNAL_WORKER_ID_LEFT_SHIFT = 17
INTERNAL_PROCESS_ID_LEFT_SHIFT = 12


class Snowflake:
    def __init__(self, epoch_ms: int):
        self.epoch_ms = epoch_ms
        self._counter = 0
        self.worker_id = 0
        self.process_id = os.getpid()

    def __next__(self):
        timestamp = round(time.time() * 1000 - self.epoch_ms)
        self._counter += 1
        return (
            timestamp << 22 | self.worker_id << 17 | self.process_id << 12 | (self._counter % 4096)
        )

    def __iter__(self):
        while True:
            yield self.__next__()

