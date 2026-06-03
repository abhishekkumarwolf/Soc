from datetime import datetime
from app.core.mongodb import get_db
from app.core.event_manager import EventManager
from app.models.event_model import SecurityEvent, SeverityLevel


async def scan_file(file_name: str):

    db = get_db()

    if db is None:
        raise Exception("Database not initialized")

    is_malware = "virus" in file_name.lower()

    scan_result = {
        "file_name": file_name,
        "malicious": is_malware,
        "scanned_at": datetime.utcnow()
    }

    result = await db.file_scans.insert_one(scan_result)

    # -------------------------
    # CREATE SECURITY EVENT
    # -------------------------
    if is_malware:
        event = SecurityEvent(
            event_type="malware_detected",
            source="antivirus",
            severity=SeverityLevel.HIGH,
            message=f"Malicious file detected: {file_name}",
            metadata={"file": file_name}
        )

        await EventManager.create_event(event)

    # ✅ make JSON safe
    scan_result["_id"] = str(result.inserted_id)
    scan_result["scanned_at"] = scan_result["scanned_at"].isoformat()

    return {
        "status": "scan_completed",
        "result": scan_result
    }