from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import timedelta
from typing import List, Optional

from models import (
    User, UserCreate, UserLogin, UserInDB, Token,
    Experience, ExperienceCreate, ExperienceUpdate,
    Booking, BookingCreate, BookingUpdate,
    NewsletterSubscriber, NewsletterSubscribe
)
from auth import (
    get_password_hash, verify_password, create_access_token,
    get_current_user, get_current_admin_user, ACCESS_TOKEN_EXPIRE_MINUTES
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============ AUTH ROUTES ============

@api_router.post("/auth/register", response_model=Token)
async def register(user: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    del user_dict['password']
    
    user_in_db = UserInDB(**user_dict, hashed_password=hashed_password)
    await db.users.insert_one(user_in_db.dict())
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.post("/auth/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.users.find_one({"email": form_data.username})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.get("/auth/me", response_model=User)
async def get_me(current_user: User = Depends(lambda token: get_current_user(token, db))):
    return current_user


# ============ EXPERIENCE ROUTES ============

@api_router.get("/experiences", response_model=List[Experience])
async def get_experiences(
    category: Optional[str] = None,
    location: Optional[str] = None,
    min_price: Optional[int] = None,
    max_price: Optional[int] = None
):
    query = {}
    if category:
        query["category"] = category
    if location:
        query["location"] = location
    if min_price is not None or max_price is not None:
        query["price"] = {}
        if min_price is not None:
            query["price"]["$gte"] = min_price
        if max_price is not None:
            query["price"]["$lte"] = max_price
    
    experiences = await db.experiences.find(query).to_list(1000)
    return [Experience(**exp) for exp in experiences]

@api_router.get("/experiences/{experience_id}", response_model=Experience)
async def get_experience(experience_id: int):
    experience = await db.experiences.find_one({"id": experience_id})
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return Experience(**experience)

@api_router.post("/experiences", response_model=Experience)
async def create_experience(
    experience: ExperienceCreate,
    current_user: User = Depends(lambda token: get_current_admin_user(get_current_user(token, db)))
):
    # Get max id
    max_exp = await db.experiences.find_one(sort=[("id", -1)])
    new_id = (max_exp["id"] + 1) if max_exp else 1
    
    exp_dict = experience.dict()
    exp_dict["id"] = new_id
    
    await db.experiences.insert_one(exp_dict)
    return Experience(**exp_dict)

@api_router.put("/experiences/{experience_id}", response_model=Experience)
async def update_experience(
    experience_id: int,
    experience: ExperienceUpdate,
    current_user: User = Depends(lambda token: get_current_admin_user(get_current_user(token, db)))
):
    existing = await db.experiences.find_one({"id": experience_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    update_data = {k: v for k, v in experience.dict().items() if v is not None}
    if update_data:
        await db.experiences.update_one({"id": experience_id}, {"$set": update_data})
    
    updated = await db.experiences.find_one({"id": experience_id})
    return Experience(**updated)

@api_router.delete("/experiences/{experience_id}")
async def delete_experience(
    experience_id: int,
    current_user: User = Depends(lambda token: get_current_admin_user(get_current_user(token, db)))
):
    result = await db.experiences.delete_one({"id": experience_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Experience not found")
    return {"message": "Experience deleted successfully"}


# ============ BOOKING ROUTES ============

@api_router.post("/bookings", response_model=Booking)
async def create_booking(
    booking: BookingCreate,
    current_user: User = Depends(lambda token: get_current_user(token, db))
):
    booking_dict = booking.dict()
    booking_dict["user_id"] = current_user.id
    
    booking_obj = Booking(**booking_dict)
    await db.bookings.insert_one(booking_obj.dict())
    return booking_obj

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings(
    current_user: User = Depends(lambda token: get_current_user(token, db))
):
    bookings = await db.bookings.find({"user_id": current_user.id}).to_list(1000)
    return [Booking(**booking) for booking in bookings]

@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(
    booking_id: str,
    current_user: User = Depends(lambda token: get_current_user(token, db))
):
    booking = await db.bookings.find_one({"id": booking_id, "user_id": current_user.id})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return Booking(**booking)

@api_router.put("/bookings/{booking_id}", response_model=Booking)
async def update_booking(
    booking_id: str,
    booking_update: BookingUpdate,
    current_user: User = Depends(lambda token: get_current_user(token, db))
):
    existing = await db.bookings.find_one({"id": booking_id, "user_id": current_user.id})
    if not existing:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    update_data = {k: v for k, v in booking_update.dict().items() if v is not None}
    if update_data:
        from datetime import datetime
        update_data["updated_at"] = datetime.utcnow()
        await db.bookings.update_one({"id": booking_id}, {"$set": update_data})
    
    updated = await db.bookings.find_one({"id": booking_id})
    return Booking(**updated)

@api_router.delete("/bookings/{booking_id}")
async def cancel_booking(
    booking_id: str,
    current_user: User = Depends(lambda token: get_current_user(token, db))
):
    existing = await db.bookings.find_one({"id": booking_id, "user_id": current_user.id})
    if not existing:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    await db.bookings.update_one(
        {"id": booking_id},
        {"$set": {"status": "cancelled"}}
    )
    return {"message": "Booking cancelled successfully"}


# ============ ADMIN ROUTES ============

@api_router.get("/admin/bookings", response_model=List[Booking])
async def get_all_bookings(
    status: Optional[str] = None,
    experience_id: Optional[int] = None,
    current_user: User = Depends(lambda token: get_current_admin_user(get_current_user(token, db)))
):
    query = {}
    if status:
        query["status"] = status
    if experience_id:
        query["experience_id"] = experience_id
    
    bookings = await db.bookings.find(query).to_list(1000)
    return [Booking(**booking) for booking in bookings]

@api_router.get("/admin/stats")
async def get_admin_stats(
    current_user: User = Depends(lambda token: get_current_admin_user(get_current_user(token, db)))
):
    total_bookings = await db.bookings.count_documents({})
    confirmed_bookings = await db.bookings.count_documents({"status": "confirmed"})
    cancelled_bookings = await db.bookings.count_documents({"status": "cancelled"})
    
    # Calculate total revenue
    bookings = await db.bookings.find({"status": {"$in": ["confirmed", "completed"]}}).to_list(10000)
    total_revenue = sum(booking.get("total_price", 0) for booking in bookings)
    
    total_experiences = await db.experiences.count_documents({})
    total_users = await db.users.count_documents({})
    total_subscribers = await db.newsletter_subscribers.count_documents({"status": "active"})
    
    return {
        "total_bookings": total_bookings,
        "confirmed_bookings": confirmed_bookings,
        "cancelled_bookings": cancelled_bookings,
        "total_revenue": total_revenue,
        "total_experiences": total_experiences,
        "total_users": total_users,
        "total_subscribers": total_subscribers
    }


# ============ NEWSLETTER ROUTES ============

@api_router.post("/newsletter/subscribe", response_model=NewsletterSubscriber)
async def subscribe_newsletter(subscriber: NewsletterSubscribe):
    # Check if already subscribed
    existing = await db.newsletter_subscribers.find_one({"email": subscriber.email})
    if existing:
        if existing.get("status") == "active":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already subscribed"
            )
        else:
            # Reactivate subscription
            await db.newsletter_subscribers.update_one(
                {"email": subscriber.email},
                {"$set": {"status": "active", "subscribed_at": datetime.utcnow()}}
            )
            updated = await db.newsletter_subscribers.find_one({"email": subscriber.email})
            return NewsletterSubscriber(**updated)
    
    # Create new subscription
    sub_obj = NewsletterSubscriber(email=subscriber.email)
    await db.newsletter_subscribers.insert_one(sub_obj.dict())
    return sub_obj

@api_router.get("/admin/newsletter/subscribers", response_model=List[NewsletterSubscriber])
async def get_newsletter_subscribers(
    current_user: User = Depends(lambda token: get_current_admin_user(get_current_user(token, db)))
):
    subscribers = await db.newsletter_subscribers.find({"status": "active"}).to_list(10000)
    return [NewsletterSubscriber(**sub) for sub in subscribers]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
