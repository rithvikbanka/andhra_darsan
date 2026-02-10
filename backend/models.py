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
class Experience(BaseModel):
    id: int
    title: str
    category: str
    location: str
    duration: str
    price: int
    rating: float
    image: str
    featured: bool = False
    description: str
    highlights: List[str]
    whoIsThisFor: str
    included: List[str]
    images: List[str]

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
