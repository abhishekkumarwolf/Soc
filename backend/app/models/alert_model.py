from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
from typing import Optional, Dict, Any


class AlertStatus(str, Enum):
    OPEN = "OPEN"
    INVESTIGATING = "INVESTIGATING"
    RESOLVED = "RESOLVED"


class SecurityAlert(BaseModel):
    title: str
    severity: str
    source: str

    event_type: str
    message: str

    metadata: Optional[Dict[str, Any]] = {}

    status: AlertStatus = AlertStatus.OPEN

    created_at: datetime = Field(default_factory=datetime.utcnow)