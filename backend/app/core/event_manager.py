from app.core.mongodb import get_db
from app.models.event_model import SecurityEvent, SeverityLevel
from app.core.alert_manager import AlertManager
from app.models.alert_model import SecurityAlert
from app.core.stream_manager import stream_manager


class EventManager:

    @staticmethod
    async def create_event(event: SecurityEvent):

        db = get_db()

        event_dict = event.model_dump()

        await db.security_events.insert_one(event_dict)

        # 🔴 REAL-TIME BROADCAST
        broadcast_data = event_dict.copy()
        broadcast_data["timestamp"] = event_dict["timestamp"].isoformat()
        
        await stream_manager.broadcast({
            "type": "security_event",
            "data": broadcast_data
        })

        # ALERT CREATION
        if event.severity in [
            SeverityLevel.HIGH,
            SeverityLevel.CRITICAL,
        ]:
            alert = SecurityAlert(
                title=f"{event.event_type} detected",
                severity=event.severity,
                source=event.source,
                event_type=event.event_type,
                message=event.message,
                metadata=event.metadata,
            )

            await AlertManager.create_alert(alert)

        return event_dict