# Indian Chess Academy - Visual Guide

## 🎨 UI/UX Overview

This guide provides a visual walkthrough of the Indian Chess Academy platform's user interface and user experience.

## 📱 Page-by-Page Breakdown

### 1. Landing Page (`/`)

**Purpose**: First impression, conversion, and information

**Sections**:
```
┌─────────────────────────────────────┐
│  Navigation Bar                     │
│  [Logo] [Links] [Login] [Register] │
├─────────────────────────────────────┤
│                                     │
│  Hero Section                       │
│  "Master Chess with India's Best"  │
│  [Book Free Demo Button]            │
│                                     │
├─────────────────────────────────────┤
│  Benefits Grid (4 cards)            │
│  [Expert] [Matching] [Schedule]     │
│  [Progress]                         │
├─────────────────────────────────────┤
│  How It Works (4 steps)             │
│  1.Book → 2.Match → 3.Learn → 4.Improve │
├─────────────────────────────────────┤
│  Call to Action                     │
│  "Ready to Start?"                  │
├─────────────────────────────────────┤
│  Footer                             │
│  [Links] [Contact] [Social]         │
└─────────────────────────────────────┘
```

**Key Features**:
- Gradient hero background (Blue to Olive)
- Icon-based benefits
- Step-by-step process visualization
- Multiple CTAs

---

### 2. Login Page (`/auth/login`)

**Purpose**: User authentication

**Layout**:
```
┌─────────────────────────────────────┐
│                                     │
│     ┌─────────────────────┐        │
│     │  Welcome Back       │        │
│     │                     │        │
│     │  [Email Input]      │        │
│     │  [Password Input]   │        │
│     │                     │        │
│     │  □ Remember me      │        │
│     │  Forgot password?   │        │
│     │                     │        │
│     │  [Sign In Button]   │        │
│     │                     │        │
│     │  [Parent][Student]  │        │
│     │  [Coach] - Quick    │        │
│     │                     │        │
│     │  Don't have account?│        │
│     │  Sign up            │        │
│     └─────────────────────┘        │
│                                     │
└─────────────────────────────────────┘
```

**Key Features**:
- Centered card layout
- Role-based quick selection
- Remember me checkbox
- Forgot password link
- Loading states

---

### 3. Registration Page (`/auth/register`)

**Purpose**: New user signup

**Layout**:
```
┌─────────────────────────────────────┐
│     ┌─────────────────────┐        │
│     │  Join ICA           │        │
│     │                     │        │
│     │  I am a:            │        │
│     │  [Parent][Student]  │        │
│     │  [Coach]            │        │
│     │                     │        │
│     │  [Full Name]        │        │
│     │  [Email]            │        │
│     │  [Phone]            │        │
│     │  [Password]         │        │
│     │  ████░░░░ Strong    │        │
│     │  [Confirm Password] │        │
│     │                     │        │
│     │  [Create Account]   │        │
│     │                     │        │
│     │  Already have       │        │
│     │  account? Sign in   │        │
│     └─────────────────────┘        │
└─────────────────────────────────────┘
```

**Key Features**:
- Role selection buttons
- Password strength indicator (4 levels)
- Real-time validation
- Visual feedback

---

### 4. Demo Booking (`/booking/demo`)

**Purpose**: Schedule free demo lesson

**Step 1 - Student Info**:
```
┌─────────────────────────────────────┐
│  Book Your Free Demo                │
│  ●──●──○  (Progress: Step 1 of 3)  │
├─────────────────────────────────────┤
│  Student Information                │
│                                     │
│  [Student Name]                     │
│  [Age]        [Current Rating]      │
│  [Parent Email]                     │
│  [Parent Phone]                     │
│                                     │
│              [Next →]               │
└─────────────────────────────────────┘
```

**Step 2 - Schedule**:
```
┌─────────────────────────────────────┐
│  ●──●──○  (Progress: Step 2 of 3)  │
├─────────────────────────────────────┤
│  Schedule Your Demo                 │
│                                     │
│  🌍 Timezone: [Asia/Kolkata ▼]     │
│  📅 Date: [Calendar Picker]         │
│  🕐 Time:                           │
│  [9AM][10AM][11AM][2PM]            │
│  [3PM][4PM][5PM][6PM]              │
│                                     │
│  [← Back]        [Next →]          │
└─────────────────────────────────────┘
```

**Step 3 - Coach**:
```
┌─────────────────────────────────────┐
│  ●──●──●  (Progress: Step 3 of 3)  │
├─────────────────────────────────────┤
│  Choose Your Coach                  │
│                                     │
│  ○ Any Available Coach              │
│  ○ GM Viswanathan Anand (2800)     │
│  ○ IM Ramesh Kumar (2500)          │
│  ○ FM Priya Sharma (2400)          │
│                                     │
│  [← Back]    [Confirm Booking]     │
└─────────────────────────────────────┘
```

---

### 5. Matching Engine (`/matching`)

**Purpose**: AI-powered coach matching

**Layout**:
```
┌──────────────┬──────────────────────┐
│ Student      │  Suggested Coaches   │
│ Profile      │                      │
│              │  ┌────────────────┐  │
│ [Rating]     │  │ IM Ramesh      │  │
│ [Age Group]  │  │ Rating: 2500   │  │
│ [Language]   │  │ 95% Match ✓    │  │
│ [Availability│  │ [Specialization]│  │
│              │  │ [Languages]     │  │
│              │  │ ₹1500/hr       │  │
│              │  │ [Select][View] │  │
│              │  └────────────────┘  │
│              │                      │
│              │  ┌────────────────┐  │
│              │  │ FM Priya       │  │
│              │  │ 88% Match      │  │
│              │  └────────────────┘  │
└──────────────┴──────────────────────┘
```

**Key Features**:
- Match score percentage
- Coach specializations
- Language tags
- Hourly rate display
- Select/View actions

---

### 6. Pricing Page (`/pricing`)

**Purpose**: Display subscription plans

**Layout**:
```
┌─────────────────────────────────────┐
│  Choose Your Plan                   │
│  [Monthly] [Annual -20%]            │
├───────────┬───────────┬─────────────┤
│  Starter  │   Club    │    Pro      │
│  ₹2,999   │  ₹4,999   │   ₹8,999    │
│  /month   │  /month   │   /month    │
│           │ POPULAR ⭐│             │
│           │           │             │
│ 4 lessons │ 8 lessons │ 16 lessons  │
│           │           │             │
│ ✓ Feature │ ✓ Feature │ ✓ Feature   │
│ ✓ Feature │ ✓ Feature │ ✓ Feature   │
│ ✗ Feature │ ✓ Feature │ ✓ Feature   │
│           │           │             │
│ [Get      │ [Get      │ [Get        │
│  Started] │  Started] │  Started]   │
└───────────┴───────────┴─────────────┘
```

**Key Features**:
- 3-tier pricing
- Monthly/Annual toggle
- Feature comparison
- Popular badge
- Clear CTAs

---

### 7. Parent Dashboard (`/dashboard/parent`)

**Purpose**: Parent's main control center

**Layout**:
```
┌──────┬──────────────────────────────┐
│      │  Welcome back, Rajesh!       │
│ Side │  [Search] [🔔3] [👤]         │
│ bar  ├──────────────────────────────┤
│      │  ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│ 📊   │  │1350│ │ 8  │ │87% │ │24h ││
│ 📅   │  │Rate│ │Less│ │Att │ │Prac││
│ 📈   │  └────┘ └────┘ └────┘ └────┘│
│ 💳   ├──────────────────────────────┤
│ 💬   │  Upcoming Lessons            │
│ 📚   │  ┌──────────────────────┐   │
│      │  │ 🎥 IM Ramesh Kumar   │   │
│ ⚙️   │  │ Jan 16, 10:00 AM     │   │
│ 🚪   │  │ [Join Now]           │   │
│      │  └──────────────────────┘   │
│      ├──────────────────────────────┤
│      │  Rating Progress Chart       │
│      │  ╱╲                          │
│      │ ╱  ╲╱                        │
│      │╱                             │
└──────┴──────────────────────────────┘
```

**Key Sections**:
1. Quick Stats (4 cards)
2. Upcoming Lessons
3. Quick Actions
4. Rating Chart
5. Attendance History

---

### 8. Progress Tracking (`/dashboard/parent/progress`)

**Purpose**: Detailed student progress analytics

**Layout**:
```
┌─────────────────────────────────────┐
│  Student Progress                   │
├─────────────────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│  │1350│ │84% │ │12  │ │124h│       │
│  │Rate│ │Acc │ │Bdg │ │Hrs │       │
│  └────┘ └────┘ └────┘ └────┘       │
├──────────────────┬──────────────────┤
│ Rating Progress  │ Skills Radar     │
│                  │                  │
│  ╱╲             │      ╱╲          │
│ ╱  ╲╱           │    ╱    ╲        │
│╱                │  ╱        ╲      │
├──────────────────┴──────────────────┤
│ Performance by Category             │
│ ████████████ Tactics 92%            │
│ ██████████ Endgames 88%             │
│ ████████ Openings 85%               │
├──────────────────┬──────────────────┤
│ Strengths        │ Coach Feedback   │
│ ✓ Tactics 92%    │ ⭐⭐⭐⭐⭐        │
│ ✓ Endgames 88%   │ "Excellent..."   │
└──────────────────┴──────────────────┘
```

**Charts Used**:
- Line Chart (Rating History)
- Radar Chart (Skills)
- Bar Chart (Performance)

---

### 9. Billing Dashboard (`/dashboard/parent/billing`)

**Purpose**: Payment and subscription management

**Layout**:
```
┌─────────────────────────────────────┐
│  Billing & Payments                 │
├──────────────────┬──────────────────┤
│ Current Plan     │ Upcoming Payment │
│                  │                  │
│ Club Plan        │ ⚠️ Due Soon      │
│ ₹4,999/month     │ 10 days left     │
│ Active ✓         │                  │
│                  │ ₹4,999           │
│ Lessons: 4/8     │ Jan 25, 2026     │
│ ████░░░░         │                  │
│                  │ [Pay Now]        │
│ [Change Plan]    │ ✓ Auto-pay on    │
├──────────────────┴──────────────────┤
│ Payment History                     │
│ ┌────────────────────────────────┐ │
│ │Date    Invoice  Amount  Status │ │
│ │Dec 25  INV-12   ₹4,999  ✓ Paid│ │
│ │Nov 25  INV-11   ₹4,999  ✓ Paid│ │
│ └────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Key Features**:
- Plan usage progress bar
- Payment due alerts
- Invoice download
- Payment history table

---

### 10. Coach Dashboard (`/dashboard/coach`)

**Purpose**: Coach's management interface

**Layout**:
```
┌──────┬──────────────────────────────┐
│      │  Welcome, IM Ramesh!         │
│ Side ├──────────────────────────────┤
│ bar  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│      │  │ 24 │ │48  │ │62K │ │1310││
│ 📊   │  │Stud│ │Less│ │Earn│ │Avg ││
│ 👥   │  └────┘ └────┘ └────┘ └────┘│
│ 📅   ├──────────────────────────────┤
│ 📚   │  Today's Schedule            │
│ 💰   │  ┌──────────────────────┐   │
│ 💬   │  │ 10:00 AM - Arjun     │   │
│      │  │ Sicilian Defense     │   │
│ ⚙️   │  │ [Start Lesson]       │   │
│ 🚪   │  └──────────────────────┘   │
│      ├──────────────────────────────┤
│      │  New Match Requests          │
│      │  ┌──────────────────────┐   │
│      │  │ Vikram, Age 12       │   │
│      │  │ Rating: 1200         │   │
│      │  │ [Accept][Decline]    │   │
│      │  └──────────────────────┘   │
└──────┴──────────────────────────────┘
```

**Key Sections**:
1. Stats (Students, Lessons, Earnings)
2. Today's Schedule
3. Match Requests
4. Student Progress
5. Earnings Chart

---

### 11. Messaging System (`/dashboard/*/messages`)

**Purpose**: In-platform communication

**Layout**:
```
┌──────────────┬──────────────────────┐
│ Conversations│  Chat with IM Ramesh │
│              ├──────────────────────┤
│ [Search...]  │                      │
│              │  ┌────────────────┐  │
│ ┌──────────┐ │  │ Hello! How is  │  │
│ │IM Ramesh │ │  │ Arjun doing?   │  │
│ │Great prog│ │  └────────────────┘  │
│ │2 hrs ago │ │                      │
│ │      [2] │ │      ┌────────────┐  │
│ └──────────┘ │      │ He's doing │  │
│              │      │ great!     │  │
│ ┌──────────┐ │      └────────────┘  │
│ │ICA Supp. │ │                      │
│ │Payment...│ │  ┌────────────────┐  │
│ │1 day ago │ │  │ Excellent!     │  │
│ └──────────┘ │  └────────────────┘  │
│              ├──────────────────────┤
│              │ [📎] [Type message...│
│              │              [Send]  │
└──────────────┴──────────────────────┘
```

**Key Features**:
- Conversation list with unread counts
- Real-time message display
- Search functionality
- File attachment UI
- Sent/received message styling

---

## 🎨 Design Patterns

### Color Usage

```
Primary Blue (#003366):
- Navigation bars
- Headings
- Primary buttons (secondary variant)
- Sidebar active states

Orange (#FC8A24):
- Primary buttons
- CTAs
- Highlights
- Charts
- Active indicators

Off-White (#FFFEF3):
- Page backgrounds
- Card backgrounds (subtle)

Olive Green (#6B8E23):
- Accents
- Success states
- Gradients
```

### Typography Hierarchy

```
H1: 48-60px - Page titles
H2: 36-48px - Section headers
H3: 24-36px - Card titles
H4: 20-24px - Subsections
Body: 16px - Regular text
Small: 14px - Secondary text
XS: 12px - Labels, captions
```

### Spacing System

```
xs: 4px   - Tight spacing
sm: 8px   - Small gaps
md: 16px  - Default spacing
lg: 24px  - Section spacing
xl: 32px  - Large sections
2xl: 48px - Page sections
```

### Component Patterns

**Card Pattern**:
```
┌─────────────────┐
│ Title           │
│                 │
│ Content         │
│                 │
│ [Action Button] │
└─────────────────┘
```

**Stat Card Pattern**:
```
┌─────────────────┐
│ Label      [📊] │
│ 1,234           │
│ +12% trend      │
└─────────────────┘
```

**Form Pattern**:
```
Label
[Input Field      ]
Error message

[Submit Button]
```

---

## 📱 Responsive Behavior

### Mobile (< 640px)
- Single column layouts
- Stacked cards
- Hamburger menu
- Full-width buttons
- Simplified charts

### Tablet (640-1024px)
- 2-column grids
- Sidebar collapses
- Touch-friendly targets
- Optimized spacing

### Desktop (> 1024px)
- Multi-column layouts
- Persistent sidebar
- Hover effects
- Detailed charts
- Expanded views

---

## 🎯 User Flows

### New User Journey
```
Landing → Register → Email Verify → 
Profile Setup → Book Demo → 
Match Coach → Subscribe → Dashboard
```

### Existing User Journey
```
Login → Dashboard → 
[View Progress | Book Lesson | 
 Check Messages | Make Payment]
```

### Coach Journey
```
Login → Dashboard → 
[View Schedule | Accept Matches | 
 Track Students | Check Earnings]
```

---

## 🔍 Interactive Elements

### Hover States
- Buttons: Opacity change
- Cards: Shadow increase
- Links: Color change
- Icons: Scale up

### Active States
- Buttons: Pressed effect
- Inputs: Border highlight
- Tabs: Underline/background
- Menu items: Background color

### Loading States
- Buttons: Spinner + "Loading..."
- Cards: Skeleton loaders
- Lists: Pulse animation
- Forms: Disabled state

### Error States
- Inputs: Red border
- Forms: Error message
- Toasts: Red notification
- Badges: Error variant

---

This visual guide provides a comprehensive overview of the UI/UX design patterns used throughout the Indian Chess Academy platform.
