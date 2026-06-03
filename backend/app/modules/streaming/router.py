from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.stream_manager import stream_manager

router = APIRouter()


@router.websocket("/ws/soc")
async def websocket_endpoint(websocket: WebSocket):

    await stream_manager.connect(websocket)

    try:
        while True:
            # keep connection alive
            await websocket.receive_text()

    except WebSocketDisconnect:
        stream_manager.disconnect(websocket)