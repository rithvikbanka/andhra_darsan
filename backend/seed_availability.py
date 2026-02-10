import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def seed_availability():
    print("Seeding availability for all experiences...")
    
    # Generate next 30 days
    availability = []
    today = datetime.now()
    
    for i in range(30):
        date = (today + timedelta(days=i)).strftime('%Y-%m-%d')
        availability.append({
            "date": date,
            "timeSlots": [
                {
                    "time": "09:00",
                    "bookingType": "private",
                    "maxCapacity": 2,
                    "currentBookings": 0,
                    "available": True
                },
                {
                    "time": "10:00",
                    "bookingType": "shared",
                    "maxCapacity": 5,
                    "currentBookings": 0,
                    "available": True
                },
                {
                    "time": "14:00",
                    "bookingType": "private",
                    "maxCapacity": 2,
                    "currentBookings": 0,
                    "available": True
                },
                {
                    "time": "15:00",
                    "bookingType": "group",
                    "maxCapacity": 3,
                    "currentBookings": 0,
                    "available": True
                }
            ]
        })
    
    # Update all experiences
    result = await db.experiences.update_many(
        {},
        {"$set": {"availability": availability}}
    )
    
    print(f"✓ Updated {result.modified_count} experiences with 30 days availability")
    print("✅ Availability seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_availability())
    client.close()
