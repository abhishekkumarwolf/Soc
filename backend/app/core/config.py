from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Enterprise Security Backend"
    VERSION: str = "1.0.0"

    # MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    DB_NAME: str = "security_db"

    class Config:
        env_file = ".env"


settings = Settings()