from fastapi import APIRouter
from app.core.mongodb import get_db

router = APIRouter(prefix="/alerts", tags=["Security Alerts"])

@router.get("/")
async def get_alerts(limit: int = 50):
    db = get_db()
    
    cursor = (
        db.security_alerts
        .find()
        .sort("created_at", -1)
        .limit(limit)
    )

    alerts = []

    async for alert in cursor:
        alert["_id"] = str(alert["_id"])
        alerts.append(alert)

    return alerts