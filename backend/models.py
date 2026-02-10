from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
import uuid

# User Models
class UserBase(BaseModel):
    email: EmailStr
    name: str
    phone: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_admin: bool = False

class UserInDB(User):
    hashed_password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Experience Models
class InstagramReel(BaseModel):
    url: str
    embedUrl: str

class TimeSlot(BaseModel):
    time: str
    available: bool = True

class Availability(BaseModel):
    date: str
    timeSlots: List[TimeSlot]

class AddOn(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: int
    calculationType: str  # "per_person", "per_3_guests", "flat", "per_adult"
    active: bool = True

class PricingStructure(BaseModel):
    private: Optional[dict] = {
        "enabled": True,
        "firstAdult": 3600,
        "additionalAdult": 2200,
        "child": 1500
    }
    shared: Optional[dict] = {
        "enabled": True,
        "adult": 2500,
        "child": 1700
    }
    group: Optional[dict] = {
        "enabled": True,
        "tier1": {"min": 10, "max": 17, "pricePerPerson": 2200},
        "tier2": {"min": 18, "max": 25, "pricePerPerson": 2000}
    }

class Experience(BaseModel):
    id: int
    title: str
    category: str
    location: str
    duration: str
    price: int  # Base display price
    rating: float
    image: str
    featured: bool = False
    description: str
    highlights: List[str]
    whoIsThisFor: str
    included: List[str]
    images: List[str]
    instagramReels: Optional[List[InstagramReel]] = []
    bookingTypes: Optional[List[str]] = ["private", "shared", "group"]
    pricing: Optional[PricingStructure] = PricingStructure()
    addOns: Optional[List[AddOn]] = []
    availability: Optional[List[Availability]] = []

class ExperienceCreate(BaseModel):
    title: str
    category: str
    location: str
    duration: str
    price: int
    rating: float = 4.5
    image: str
    featured: bool = False
    description: str
    highlights: List[str]
    whoIsThisFor: str
    included: List[str]
    images: List[str]
    instagramReels: Optional[List[InstagramReel]] = []
    bookingTypes: Optional[List[str]] = ["private", "shared", "group"]
    pricing: Optional[PricingStructure] = PricingStructure()
    addOns: Optional[List[AddOn]] = []
    availability: Optional[List[Availability]] = []

class ExperienceUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    duration: Optional[str] = None
    price: Optional[int] = None
    rating: Optional[float] = None
    image: Optional[str] = None
    featured: Optional[bool] = None
    description: Optional[str] = None
    highlights: Optional[List[str]] = None
    whoIsThisFor: Optional[str] = None
    included: Optional[List[str]] = None
    images: Optional[List[str]] = None
    instagramReels: Optional[List[InstagramReel]] = None
    bookingTypes: Optional[List[str]] = None
    pricing: Optional[PricingStructure] = None
    addOns: Optional[List[AddOn]] = None
    availability: Optional[List[Availability]] = None

# Booking Models
class GuestCount(BaseModel):
    adults: int = 1
    kids: int = 0

class AddOns(BaseModel):
    pickup: bool = False
    pickupLocation: str = ""
    specialPuja: int = 0
    souvenirKits: int = 1
    photography: bool = False

class BookingCreate(BaseModel):
    experience_id: int
    experience_title: str
    booking_type: str  # private, shared, group
    date: str
    time: str
    guests: GuestCount
    group_size: Optional[int] = None
    add_ons: AddOns
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    total_price: float

class Booking(BookingCreate):
    id: str = Field(default_factory=lambda: 'BD' + str(uuid.uuid4())[:8].upper())
    user_id: str
    status: str = "confirmed"  # confirmed, cancelled, completed
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class BookingUpdate(BaseModel):
    date: Optional[str] = None
    time: Optional[str] = None
    guests: Optional[GuestCount] = None
    add_ons: Optional[AddOns] = None
    status: Optional[str] = None

# Token Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Newsletter Models
class NewsletterSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "active"  # active, unsubscribed

class NewsletterSubscribe(BaseModel):
    email: EmailStr
