from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
from typing import Optional, Dict, Any


# -----------------------------
# Severity Levels
# -----------------------------
class SeverityLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


# -----------------------------
# Event Schema
# -----------------------------
class SecurityEvent(BaseModel):
    event_type: str
    source: str  # antivirus / firewall / edr
    severity: SeverityLevel

    message: str

    metadata: Optional[Dict[str, Any]] = {}

    timestamp: datetime = Field(default_factory=datetime.utcnow)