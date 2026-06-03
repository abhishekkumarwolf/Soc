from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "security_db"

client = None
db = None


async def connect_to_mongo():
    global client, db

    client = AsyncIOMotorClient(MONGO_URL)
    db = client["soc_database"]

    print("✅ Connected to MongoDB")


def get_db():
    return db
