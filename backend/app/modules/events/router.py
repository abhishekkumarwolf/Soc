from fastapi import APIRouter
from app.core.mongodb import get_db

router = APIRouter(prefix="/events", tags=["Security Events"])


@router.get("/")
async def get_events(limit: int = 50):

    db = get_db()

    cursor = (
        db.security_events
        .find()
        .sort("created_at", -1)
        .limit(limit)
    )

    events = []

    async for event in cursor:
        event["_id"] = str(event["_id"])
        events.append(event)

    return events