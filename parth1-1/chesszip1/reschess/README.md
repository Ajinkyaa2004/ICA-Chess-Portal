# Indian Chess Academy (ICA) - Frontend

A comprehensive Chess Academy Management Platform frontend built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

This is the **frontend-only** implementation of the Indian Chess Academy platform, designed to support:
- **Parents** - Manage student progress, bookings, and payments
- **Students** - Track lessons, progress, and study materials
- **Coaches** - Manage students, schedule, and earnings
- **Admins** - Oversee platform operations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Calendar**: FullCalendar (ready for integration)

## 🎨 Brand Design System

### Color Palette
- **Primary**
  - Deep Blue: `#003366`
  - Orange: `#FC8A24`
  - Off-White: `#FFFEF3`
  - Olive Green: `#6B8E23`
- **Secondary**
  - Tan: `#B49885`
  - Cream: `#EBD6C3`
  - Brown: `#68300B`

### Typography
- **Headings**: Bodoni Moda
- **Body**: Figtree

## 📁 Project Structure

```
├── app/
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── booking/
│   │   └── demo/
│   ├── dashboard/
│   │   ├── parent/
│   │   ├── student/
│   │   ├── coach/
│   │   └── admin/
│   ├── matching/
│   ├── pricing/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Toast.tsx
│   │   └── LoadingSkeleton.tsx
│   └── dashboard/
│       ├── Sidebar.tsx
│       └── DashboardHeader.tsx
├── types/
│   └── index.ts
├── lib/
│   └── utils.ts
└── public/
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

Use these credentials to test different dashboards:

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| Parent | parent@demo.com | parent123 | /dashboard/parent |
| Student | student@demo.com | student123 | /dashboard/student |
| Coach | coach@demo.com | coach123 | /dashboard/coach |
| Admin | admin@demo.com | admin123 | /dashboard/admin |

All demo credentials are displayed on the login page for easy access.

## ✨ Features Implemented

### 🔐 Authentication (UI Only)
- Login page with role selection
- Registration with password strength indicator
- Forgot password flow
- Form validation
- Toast notifications

### 🏠 Landing Page
- Hero section
- Benefits showcase
- How it works (Book → Match → Learn → Improve)
- Call-to-action sections
- Responsive navigation

### 📅 Demo Booking System
- Multi-step booking form
- Calendar date selection
- Time slot selection
- Coach preference selection
- Timezone support
- Success confirmation page

### 🤖 Matching Engine UI
- Student profile setup
- AI-powered coach suggestions
- Match score display
- Coach filtering by:
  - Rating
  - Experience
  - Specialization
  - Languages
  - Availability
- Accept/Reject match flow

### 💳 Pricing & Packages
- Three-tier pricing (Starter, Club, Pro)
- Monthly/Annual billing toggle
- Feature comparison
- Upgrade/Downgrade UI

### 📊 Parent Dashboard
- Live class tracker with "Join Now" button
- Quick stats overview
- Rating progress chart
- Upcoming lessons
- Attendance tracking
- Payment reminders
- Quick actions

### 👨‍🎓 Student Dashboard
- Live class tracker with "Join Now" button
- Current rating with trend
- Lessons and practice hours tracking
- Upcoming lessons schedule
- Homework tracking with progress bars
- Rating progress chart
- Achievement badges

### 🧑‍🏫 Coach Dashboard
- Active students overview
- Today's schedule
- New match requests
- Student progress tracking
- Accept/Decline match requests

### 💬 Messaging System
- Slack-like chat interface
- Conversation list
- Real-time message display
- Search conversations
- Unread message badges
- File attachment UI

### 💰 Billing Dashboard
- Current plan details
- Lesson usage tracking
- Payment history table
- Invoice download
- Upcoming payment alerts
- Payment method management

## 🎯 Key Components

### Reusable UI Components
- `Button` - Multiple variants (primary, secondary, outline, ghost)
- `Card` - Container with hover effects
- `Input` - Form input with label and error states
- `Badge` - Status indicators
- `Toast` - Notification system
- `LoadingSkeleton` - Loading states

### Dashboard Components
- `Sidebar` - Role-based navigation
- `DashboardHeader` - User info and search

## 📱 Responsive Design

All pages are fully responsive with:
- Mobile-first approach
- Tablet-friendly layouts
- Desktop-optimized dashboards
- Breakpoints: sm, md, lg, xl

## 🔌 API Integration Ready

All components are designed with mock data and include placeholders for API integration:

```typescript
// Example API integration point
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // TODO: Replace with actual API call
  // const response = await fetch('/api/auth/login', { ... });
  
  // Mock implementation
  setTimeout(() => {
    router.push('/dashboard/parent');
  }, 1000);
};
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to modify the color scheme:

```typescript
colors: {
  primary: {
    blue: '#003366',
    orange: '#FC8A24',
    // ...
  }
}
```

### Fonts
Fonts are loaded via Google Fonts in `app/globals.css`

## 📝 Type Definitions

All TypeScript types are defined in `types/index.ts`:
- User roles
- Student/Coach profiles
- Lessons & Attendance
- Payments & Packages
- Messages & Notifications

## 🚧 Future Enhancements

- [ ] FullCalendar integration for scheduling
- [ ] Real-time messaging with WebSockets
- [ ] File upload functionality
- [ ] Advanced analytics dashboards
- [ ] Tournament management
- [ ] Certificate generation
- [ ] Video lesson integration
- [ ] PGN viewer for game analysis

## 📄 License

This project is proprietary to Indian Chess Academy.

## 👥 Support

For support, email contact@indianchessacademy.com

---

Built with ♟️ by Indian Chess Academy
