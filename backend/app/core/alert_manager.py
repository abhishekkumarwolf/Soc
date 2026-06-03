from app.core.mongodb import get_db
from app.models.alert_model import SecurityAlert


class AlertManager:

    @staticmethod
    async def create_alert(alert: SecurityAlert):
        alert_dict = alert.model_dump()

        db = get_db()
        await db.security_alerts.insert_one(alert_dict)

        print(f"🚨 ALERT CREATED: {alert.title}")

        return alert_dict
    