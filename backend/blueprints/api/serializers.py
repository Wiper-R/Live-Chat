from utils.helpers import dt_to_str


async def message_serializer(message):
    return {
        "id": str(message.id),
        "content": message.content,
        "created_at": dt_to_str(message.created_at),
        "author_id": str(message.author_id),
        "channel_id": str(message.channel_id),
    }
