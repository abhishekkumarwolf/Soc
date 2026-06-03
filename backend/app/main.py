from fastapi import FastAPI
from app.core.config import settings
from app.core.mongodb import connect_to_mongo, close_mongo_connection
from app.modules.antivirus.router import router as antivirus_router
from app.modules.events.router import router as events_router
from app.modules.alerts.router import router as alerts_router
from app.modules.streaming.router import router as stream_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION
)

# Routers
app.include_router(antivirus_router)
app.include_router(events_router)
app.include_router(alerts_router)
app.include_router(stream_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

# Shutdown
@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

# Health check
@app.get("/")
async def root():
    return {"message": "Enterprise Security Backend Running"}
