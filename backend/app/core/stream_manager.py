from fastapi import WebSocket
from typing import List
import json


class StreamManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    # -----------------------------
    # Connection Handling
    # -----------------------------
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    # -----------------------------
    # Broadcast Message
    # -----------------------------
    async def broadcast(self, message: dict):

        dead_connections = []

        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps(message))
            except:
                dead_connections.append(connection)

        # cleanup broken sockets
        for dc in dead_connections:
            self.disconnect(dc)


# Global streaming instance
stream_manager = StreamManager()