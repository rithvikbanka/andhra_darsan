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

experiences_data = [
    {
        "id": 1,
        "title": "Handloom Heritage – Mangalagiri",
        "category": "Handlooms & Handicrafts",
        "location": "Amaravati – Vijayawada",
        "duration": "4 hours",
        "price": 2500,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1759738101532-0c2726bf68af",
        "featured": True,
        "description": "Immerse yourself in the ancient art of Mangalagiri handloom weaving. Meet master weavers, understand the intricate process, and witness the creation of iconic cotton sarees.",
        "highlights": [
            "Visit to traditional weaving workshops",
            "Interaction with master weavers",
            "Hands-on weaving demonstration",
            "Understanding of traditional dyeing techniques",
            "Purchase authentic handloom products directly"
        ],
        "whoIsThisFor": "Culture enthusiasts, textile lovers, professionals, NRIs",
        "included": [
            "Expert cultural facilitator",
            "Workshop entry fees",
            "Traditional refreshments",
            "Handloom souvenir sample",
            "Water and snacks",
            "Photo documentation"
        ],
        "images": [
            "https://images.unsplash.com/photo-1759738101532-0c2726bf68af",
            "https://images.pexels.com/photos/30776831/pexels-photo-30776831.jpeg",
            "https://images.unsplash.com/photo-1615640325967-af4cfa4c0c6a"
        ],
        "instagramReels": [
            {
                "url": "https://www.instagram.com/reel/sample1/",
                "embedUrl": "https://www.instagram.com/reel/sample1/embed"
            },
            {
                "url": "https://www.instagram.com/reel/sample2/",
                "embedUrl": "https://www.instagram.com/reel/sample2/embed"
            },
            {
                "url": "https://www.instagram.com/reel/sample3/",
                "embedUrl": "https://www.instagram.com/reel/sample3/embed"
            }
        ]
    },
    {
        "id": 2,
        "title": "Culinary Andhra – Amaravati",
        "category": "Culinary",
        "location": "Amaravati – Vijayawada",
        "duration": "3 hours",
        "price": 2200,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1728910156510-77488f19b152",
        "featured": True,
        "description": "A gastronomic journey through authentic Andhra cuisine. Learn traditional recipes, understand spice combinations, and savor the flavors that define Andhra culture.",
        "highlights": [
            "Traditional home cooking experience",
            "Learn authentic Andhra recipes",
            "Spice market visit",
            "Hands-on cooking session",
            "Full traditional meal"
        ],
        "whoIsThisFor": "Food lovers, cooking enthusiasts, families, NRIs",
        "included": [
            "Cultural food facilitator",
            "All ingredients and materials",
            "Recipe booklet",
            "Full traditional meal",
            "Spice kit takeaway",
            "Bottled water"
        ],
        "images": [
            "https://images.unsplash.com/photo-1728910156510-77488f19b152",
            "https://images.unsplash.com/photo-1515931215890-366d3990cf8d",
            "https://images.pexels.com/photos/35041654/pexels-photo-35041654.jpeg"
        ],
        "instagramReels": [
            {
                "url": "https://www.instagram.com/reel/sample4/",
                "embedUrl": "https://www.instagram.com/reel/sample4/embed"
            },
            {
                "url": "https://www.instagram.com/reel/sample5/",
                "embedUrl": "https://www.instagram.com/reel/sample5/embed"
            },
            {
                "url": "https://www.instagram.com/reel/sample6/",
                "embedUrl": "https://www.instagram.com/reel/sample6/embed"
            }
        ]
    },
    {
        "id": 3,
        "title": "RK Beach Cultural Walk – Vizag",
        "category": "Heritage",
        "location": "Vizag",
        "duration": "2 hours",
        "price": 1800,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1608820655002-9cb7b2e7de72",
        "featured": True,
        "description": "Experience the vibrant coastal culture of Visakhapatnam. Walk along the iconic RK Beach, understand local maritime traditions, and witness the daily life of fishing communities.",
        "highlights": [
            "Sunrise/sunset beach walk",
            "Local fishing community interaction",
            "Maritime history storytelling",
            "Beach culture and traditions",
            "Local snacks tasting"
        ],
        "whoIsThisFor": "Nature lovers, photographers, families, cultural travelers",
        "included": [
            "Expert cultural guide",
            "Local snacks and beverages",
            "Photography spots guidance",
            "Cultural narratives",
            "Bottled water"
        ],
        "images": [
            "https://images.unsplash.com/photo-1608820655002-9cb7b2e7de72",
            "https://images.unsplash.com/photo-1689733325483-7fbc938a8cfc",
            "https://images.pexels.com/photos/32471935/pexels-photo-32471935.jpeg"
        ]
    },
    {
        "id": 4,
        "title": "Tirupati City Cultural Tour",
        "category": "Temples & Spirituality",
        "location": "Tirupati",
        "duration": "5 hours",
        "price": 3200,
        "rating": 4.9,
        "image": "https://images.pexels.com/photos/8230161/pexels-photo-8230161.jpeg",
        "featured": True,
        "description": "Beyond the main temple - discover the hidden spiritual and cultural gems of Tirupati. Explore ancient temples, sacred tanks, and understand the rich mythology of this holy city.",
        "highlights": [
            "Visit to lesser-known ancient temples",
            "Sacred tank and ritual sites",
            "Mythology and storytelling sessions",
            "Traditional prasadam experience",
            "Local spiritual practices"
        ],
        "whoIsThisFor": "Spiritual seekers, history enthusiasts, professionals, families",
        "included": [
            "Cultural spiritual facilitator",
            "Temple entry fees",
            "Traditional prasadam",
            "Sacred items kit",
            "Bottled water and snacks",
            "Photo documentation"
        ],
        "images": [
            "https://images.pexels.com/photos/8230161/pexels-photo-8230161.jpeg",
            "https://images.unsplash.com/photo-1566915682737-3e97a7eed93b",
            "https://images.pexels.com/photos/12517431/pexels-photo-12517431.jpeg"
        ]
    },
    {
        "id": 5,
        "title": "Kondapalli Toys Experience",
        "category": "Handlooms & Handicrafts",
        "location": "Amaravati – Vijayawada",
        "duration": "3 hours",
        "price": 2000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1615640325967-af4cfa4c0c6a",
        "featured": True,
        "description": "Witness the centuries-old craft of Kondapalli toy making. Meet artisan families, understand the traditional techniques, and create your own wooden toy.",
        "highlights": [
            "Artisan village visit",
            "Traditional toy-making demonstration",
            "Hands-on toy painting workshop",
            "Understanding of natural dyes",
            "Take home your creation"
        ],
        "whoIsThisFor": "Families with kids, art lovers, culture enthusiasts, travelers",
        "included": [
            "Cultural craft facilitator",
            "Workshop materials",
            "Your handmade toy",
            "Traditional snacks",
            "Bottled water",
            "Photo opportunities"
        ],
        "images": [
            "https://images.unsplash.com/photo-1615640325967-af4cfa4c0c6a",
            "https://images.pexels.com/photos/30776831/pexels-photo-30776831.jpeg",
            "https://images.unsplash.com/photo-1759738101532-0c2726bf68af"
        ]
    },
    {
        "id": 6,
        "title": "Kondapalli Fort Visit",
        "category": "Heritage",
        "location": "Amaravati – Vijayawada",
        "duration": "3 hours",
        "price": 1900,
        "rating": 4.6,
        "image": "https://images.pexels.com/photos/12517431/pexels-photo-12517431.jpeg",
        "featured": True,
        "description": "Explore the historic Kondapalli Fort, perched atop a hill. Discover 14th-century architecture, panoramic views, and tales of royal dynasties.",
        "highlights": [
            "Guided fort exploration",
            "14th-century architecture study",
            "Panoramic valley views",
            "Royal history and storytelling",
            "Archaeological insights"
        ],
        "whoIsThisFor": "History buffs, photographers, adventure seekers, families",
        "included": [
            "Expert heritage guide",
            "Fort entry fees",
            "Historical narrative booklet",
            "Bottled water and snacks",
            "Photography assistance"
        ],
        "images": [
            "https://images.pexels.com/photos/12517431/pexels-photo-12517431.jpeg",
            "https://images.unsplash.com/photo-1566915682737-3e97a7eed93b",
            "https://images.pexels.com/photos/8230161/pexels-photo-8230161.jpeg"
        ]
    },
    {
        "id": 7,
        "title": "Krishna Yaan",
        "category": "Nature",
        "location": "Amaravati – Vijayawada",
        "duration": "2 hours",
        "price": 1500,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1689733325483-7fbc938a8cfc",
        "featured": False,
        "description": "A serene boat journey on the sacred Krishna River. Experience the spiritual significance, witness riverside temples, and understand the river's cultural importance.",
        "highlights": [
            "Private boat ride on Krishna River",
            "Riverside temple views",
            "Cultural significance narratives",
            "Sunset river experience",
            "Local snacks on boat"
        ],
        "whoIsThisFor": "Nature lovers, spiritual seekers, couples, photographers",
        "included": [
            "Private boat with guide",
            "Life jackets",
            "Traditional snacks",
            "Cultural storytelling",
            "Bottled water"
        ],
        "images": [
            "https://images.unsplash.com/photo-1689733325483-7fbc938a8cfc",
            "https://images.unsplash.com/photo-1608820655002-9cb7b2e7de72",
            "https://images.pexels.com/photos/32471935/pexels-photo-32471935.jpeg"
        ]
    },
    {
        "id": 8,
        "title": "Buddhist Stupa Visit",
        "category": "Heritage",
        "location": "Amaravati – Vijayawada",
        "duration": "3 hours",
        "price": 2100,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1550996982-2036faf777d2",
        "featured": False,
        "description": "Journey through ancient Buddhist heritage at Amaravati. Explore the historic stupa site, understand early Buddhist art and architecture, and discover archaeological treasures.",
        "highlights": [
            "Ancient stupa exploration",
            "Buddhist art and sculpture study",
            "Archaeological site tour",
            "Early Buddhist history",
            "Museum visit"
        ],
        "whoIsThisFor": "History enthusiasts, spiritual seekers, researchers, cultural travelers",
        "included": [
            "Expert heritage archaeologist",
            "Site and museum entry",
            "Historical documentation",
            "Refreshments",
            "Bottled water",
            "Photo opportunities"
        ],
        "images": [
            "https://images.unsplash.com/photo-1550996982-2036faf777d2",
            "https://images.pexels.com/photos/35739391/pexels-photo-35739391.jpeg",
            "https://images.unsplash.com/photo-1566915682737-3e97a7eed93b"
        ]
    },
    {
        "id": 9,
        "title": "Lakshmi Narasimha Temple Experience",
        "category": "Temples & Spirituality",
        "location": "Amaravati – Vijayawada",
        "duration": "2.5 hours",
        "price": 2800,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1566915682737-3e97a7eed93b",
        "featured": False,
        "description": "Experience the spiritual grandeur of Mangalagiri's Lakshmi Narasimha Temple. VIP darshan, sacred rituals, and deep cultural narratives of this ancient hilltop shrine.",
        "highlights": [
            "VIP darshan and skip queues",
            "Cultural storytelling walk",
            "Ritual participation and chanting",
            "Hidden temple narratives",
            "Sacred panakam offering"
        ],
        "whoIsThisFor": "Spiritual seekers, NRIs, professionals, families, cultural travelers",
        "included": [
            "VIP temple tickets",
            "Cultural facilitator",
            "Panakam and prasadam",
            "Sacred cloth and kumkum",
            "Photo documentation",
            "Bottled water and snack",
            "Insider cultural insights"
        ],
        "images": [
            "https://images.unsplash.com/photo-1566915682737-3e97a7eed93b",
            "https://images.pexels.com/photos/12517431/pexels-photo-12517431.jpeg",
            "https://images.pexels.com/photos/8230161/pexels-photo-8230161.jpeg"
        ]
    }
]

async def seed_database():
    print("Starting database seeding...")
    
    # Clear existing data
    await db.experiences.delete_many({})
    print("✓ Cleared existing experiences")
    
    # Insert experiences
    await db.experiences.insert_many(experiences_data)
    print(f"✓ Inserted {len(experiences_data)} experiences")
    
    # Create admin user if not exists
    from auth import get_password_hash
    admin_email = "admin@andhradarsan.com"
    admin_exists = await db.users.find_one({"email": admin_email})
    
    if not admin_exists:
        admin_user = {
            "id": "admin-001",
            "email": admin_email,
            "name": "Admin User",
            "phone": "+91 9491204654",
            "hashed_password": get_password_hash("admin123"),
            "is_admin": True,
            "created_at": "2025-01-28T00:00:00"
        }
        await db.users.insert_one(admin_user)
        print(f"✓ Created admin user: {admin_email} / admin123")
    else:
        print("✓ Admin user already exists")
    
    print("\n✅ Database seeding completed!")
    print(f"📊 Total experiences: {await db.experiences.count_documents({})}")
    print(f"👥 Total users: {await db.users.count_documents({})}")

if __name__ == "__main__":
    asyncio.run(seed_database())
    client.close()
