import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

default_pricing = {
    "private": {
        "enabled": True,
        "firstAdult": 3600,
        "additionalAdult": 2200,
        "child": 1500
    },
    "shared": {
        "enabled": True,
        "adult": 2500,
        "child": 1700
    },
    "group": {
        "enabled": True,
        "tier1": {"min": 10, "max": 17, "pricePerPerson": 2200},
        "tier2": {"min": 18, "max": 25, "pricePerPerson": 2000}
    }
}

default_addons = [
    {
        "id": "addon-1",
        "name": "Pickup & Drop Off - Vijayawada",
        "description": "Round trip from Vijayawada",
        "price": 1800,
        "calculationType": "per_3_guests",
        "active": True
    },
    {
        "id": "addon-2",
        "name": "Pickup & Drop Off - Guntur",
        "description": "Round trip from Guntur",
        "price": 2300,
        "calculationType": "per_3_guests",
        "active": True
    },
    {
        "id": "addon-3",
        "name": "Special Puja Tickets",
        "description": "VIP temple access",
        "price": 500,
        "calculationType": "per_person",
        "active": True
    },
    {
        "id": "addon-4",
        "name": "Souvenir Kits",
        "description": "Cultural memory kits",
        "price": 1000,
        "calculationType": "per_adult",
        "active": True
    },
    {
        "id": "addon-5",
        "name": "Photography / Reels",
        "description": "10 photos + 2 reels",
        "price": 1500,
        "calculationType": "flat",
        "active": True
    }
]

default_availability = [
    {
        "date": "2025-02-15",
        "timeSlots": [
            {"time": "09:00", "available": True},
            {"time": "10:00", "available": True},
            {"time": "14:00", "available": True},
            {"time": "15:00", "available": True}
        ]
    }
]

async def update_schema():
    print("Updating experiences schema...")
    
    # Update all experiences with new fields
    result = await db.experiences.update_many(
        {},
        {
            "$set": {
                "bookingTypes": ["private", "shared", "group"],
                "pricing": default_pricing,
                "addOns": default_addons,
                "availability": default_availability
            }
        }
    )
    
    print(f"✓ Updated {result.modified_count} experiences")
    print("✅ Schema update completed!")

if __name__ == "__main__":
    asyncio.run(update_schema())
    client.close()
