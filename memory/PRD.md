# Andhra Darsan - Product Requirements Document

**Project**: Premium Experiential Cultural Tourism Website
**Created**: January 28, 2025
**Status**: Phase 1 Complete - Frontend with Mock Data

---

## Original Problem Statement

Design a premium experiential cultural tourism website for "Andhra Darsan" brand that enables users to:
- Explore curated cultural experiences across Andhra Pradesh
- Book experiences with complex pricing (Private/Shared/Group)
- Manage bookings through customer dashboard
- Access detailed information about cultural journeys

**Brand Values**: Premium, elegant, cultural, contemporary - similar to Airbnax Experiences/GetYourGuide quality

---

## Architecture

**Tech Stack**:
- Frontend: React.js with Tailwind CSS + shadcn UI
- Backend: FastAPI (Python)
- Database: MongoDB
- Styling: Warm ivory (#FAF7F0), Andhra red (#8B0000), Turmeric gold (#DAA520)

**Current Implementation**: Frontend only with mock data (mock.js)

---

## Core Features Implemented (Phase 1)

### 1. Home Page ✅
- Cinematic hero section with tagline "Experience Andhra. Become Andhra."
- Animated statistics counter (50+ experiences, 5000+ guests, 10+ facilitators, 8+ cities)
- Featured experiences grid (6 experiences)
- "Why Andhra Darsan" section with 4 key differentiators
- Testimonials carousel (4 testimonials)
- Call-to-action sections
- Responsive header and footer

### 2. Experiences Listing Page ✅
- Advanced filter panel (Category, Location, Duration, Price Range)
- 9 experiences displayed with cards
- Real-time filtering functionality
- Responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Rating badges and category tags

### 3. Individual Experience Detail Page ✅
- Cinematic image header
- Detailed experience information sections:
  - About This Experience
  - Experience Highlights
  - Who Is This For
  - What's Included
  - Traveler Reviews
- **Complex Booking Panel** (Sticky on desktop):
  - Step 1: Experience type selection (Private/Shared/Group)
  - Step 2: Date & time picker
  - Step 3: Guest count selector (Adults/Kids)
  - Step 4: Add-ons with dynamic pricing:
    - Pickup & Drop Off (location-based)
    - Special Puja Tickets (quantity selector)
    - Souvenir Kits (per adult default, editable)
    - Photography/Reels package
  - Step 5: Customer details form
  - Dynamic price calculation with GST
  - Mock booking confirmation

### 4. Customer Login & Dashboard ✅
- Login/Signup toggle interface
- Mock authentication
- Dashboard with tabs:
  - Upcoming Bookings (with modify/cancel/download invoice)
  - Past Experiences (with ratings/reviews)
- Booking details display

### 5. FAQ Page ✅
- Accordion-style FAQ sections (6 categories)
- Contact information
- Styled with Andhra Darsan branding

---

## Data Structure (Mock)

**Experiences Collection**:
```
- id, title, category, location, duration, price, rating, featured
- image, images[], description
- highlights[], whoIsThisFor, included[]
```

**Total Experiences**: 9
1. Handloom Heritage – Mangalagiri
2. Culinary Andhra – Amaravati
3. RK Beach Cultural Walk – Vizag
4. Tirupati City Cultural Tour
5. Kondapalli Toys Experience
6. Kondapalli Fort Visit
7. Krishna Yaan
8. Buddhist Stupa Visit
9. Lakshmi Narasimha Temple Experience

**Categories**: Temples & Spirituality, Handlooms & Handicrafts, Heritage, Culinary, Nature, Performing Arts, Mix

---

## Pricing Logic Implemented

**Private Tour**:
- First adult: ₹3,600
- Additional adult: ₹2,200
- Child: ₹1,500

**Shared Experience**:
- Adult: ₹2,500
- Child: ₹1,700

**Group Booking** (10+ guests):
- 10-17 guests: ₹2,200/adult, ₹1,700/child
- 18-25 guests: ₹2,000/adult, ₹1,500/child
- 25+ guests: Contact sales team

**Add-ons**:
- Pickup & Drop Off: ₹1,800 (Vijayawada) or ₹2,300 (Guntur) per 3 guests
- Special Puja: ₹500 each
- Souvenir Kits: ₹1,000 each
- Photography/Reels: ₹1,500

**GST**: 18% on total

---

## What's Been Implemented (Phase 1 - January 28, 2025)

✅ Complete frontend with mock data
✅ All 9 experiences with details
✅ Complex booking panel with dynamic pricing
✅ Responsive design (mobile-first)
✅ Premium imagery from Unsplash/Pexels
✅ Smooth animations and transitions
✅ Filter functionality
✅ Customer dashboard UI

---

## Prioritized Backlog

### Phase 2: Backend Development (P0)
**Status**: NOT STARTED

**Required**:
- MongoDB models for:
  - Experiences
  - Bookings
  - Users
  - Reviews/Testimonials
- FastAPI endpoints:
  - GET /api/experiences (with filters)
  - GET /api/experiences/:id
  - POST /api/bookings
  - GET /api/bookings (user bookings)
  - PUT /api/bookings/:id (modify)
  - DELETE /api/bookings/:id (cancel)
  - POST /api/auth/register
  - POST /api/auth/login
- Authentication with JWT
- Remove mock.js and integrate with backend APIs
- Email/WhatsApp confirmation (integration required)

### Phase 3: Payment Gateway (P1)
**Status**: DEFERRED

**Options**:
- Razorpay (India-focused)
- Stripe (Global)

**Required**:
- Payment integration in booking flow
- Razorpay/Stripe SDK setup
- Order creation and verification
- Refund handling for cancellations

### Phase 4: Admin Panel (P1)
**Status**: DEFERRED

**Required**:
- View all bookings
- Filter by date, experience, location
- Customer details management
- Revenue dashboard
- Experience CRUD operations
- Availability calendar management
- Group booking approvals

### Phase 5: Enhanced Features (P2)
- Image gallery slider on experience detail
- Date availability calendar
- Real reviews and ratings
- WhatsApp contact button
- Newsletter integration
- Multilingual support (English/Telugu)
- SEO optimization
- Analytics integration

---

## Next Tasks

**Immediate (Post Phase 1)**:
1. User approval for backend development
2. Design API contracts
3. Set up MongoDB models
4. Build authentication system
5. Create booking endpoints
6. Integrate frontend with backend
7. Test end-to-end booking flow
8. Deploy to production

**Questions for User**:
- Proceed with backend development?
- Choose payment gateway (Razorpay/Stripe)?
- When to add admin panel?
- Need for email/SMS integrations?

---

## Design Guidelines Followed

✅ Warm ivory (#FAF7F0) background
✅ Andhra red (#8B0000) + turmeric gold (#DAA520) accents
✅ Charcoal black (#2C2C2C) typography
✅ Large cinematic imagery
✅ Elegant serif headlines + modern sans-serif body
✅ Soft shadows, rounded cards
✅ Premium, minimalist, editorial feel
✅ Mobile-first responsive design
✅ Smooth transitions and micro-interactions
✅ No emoji icons (lucide-react icons used)
✅ No prohibited color gradients

---

## Technical Notes

- All images sourced from Unsplash/Pexels (15 premium cultural images)
- shadcn UI components used for consistency
- Mock authentication (no real backend yet)
- Booking flow fully functional on frontend
- Dynamic pricing calculation implemented
- Filter state management working
- Navigation with React Router
