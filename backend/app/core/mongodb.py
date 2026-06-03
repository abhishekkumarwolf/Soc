
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client = None
db = None


# -----------------------
# CONNECT
# -----------------------
async def connect_to_mongo():
    global client, db

    client = AsyncIOMotorClient(settings.MONGODB_URL)
    db = client[settings.DB_NAME]

    print("✅ Connected to MongoDB")


# -----------------------
# CLOSE
# -----------------------
async def close_mongo_connection():
    global client

    if client:
        client.close()
        print("❌ MongoDB connection closed")


# -----------------------
# GET DATABASE
# -----------------------
def get_db():
    return db

