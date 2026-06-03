from fastapi import APIRouter
from app.modules.antivirus.service import scan_file

router = APIRouter(prefix="/antivirus", tags=["Antivirus"])


@router.post("/scan")
async def scan_endpoint(file_name: str):
    result = await scan_file(file_name)
    return result