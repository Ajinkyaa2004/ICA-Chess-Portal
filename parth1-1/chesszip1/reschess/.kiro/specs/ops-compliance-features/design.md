# OPS Compliance Features - Design Document

## Overview

This design document outlines the implementation of enterprise-grade operational compliance features for the Indian Chess Academy web application. The system is built with Next.js 15, React 18, TypeScript, and Tailwind CSS, following a component-based architecture with strict role-based access control.

The primary objectives are:
1. **Enforce Communication Restrictions**: Prevent unauthorized parent-coach private communication while enabling batch group chats
2. **Protect Contact Information**: Remove all phone numbers and email addresses from the UI
3. **Enable Admin Oversight**: Provide comprehensive demo pipeline management and subscription controls
4. **Enhance User Experience**: Add role-specific features for parents, coaches, and admins
5. **Maintain Compliance**: Ensure zero policy violations through frontend enforcement

The implementation follows a phased approach over 8 weeks, maintaining all existing functionality while adding new compliance features.

## Architecture

### System Context

The frontend application communicates with a backend API (assumed to exist) that handles:
- Authentication and session management
- Role-based authorization
- Data persistence (users, demos, subscriptions, messages)
- File storage and validation
- Business logic enforcement

### Component Architecture

The application follows Next.js App Router architecture with the following structure:

```
app/
├── dashboard/
│   ├── admin/          # Admin-specific pages
│   ├── coach/          # Coach-specific pages
│   ├── parent/         # Parent-specific pages
│   └── student/        # Student-specific pages
components/
├── dashboard/          # Dashboard layout components
├── ui/                 # Reusable UI components
├── compliance/         # New compliance-specific components
│   ├── RoleGuard.tsx
│   ├── ContactPrivacy.tsx
│   └── ChatRestrictions.tsx
├── demo/               # Demo pipeline components
├── subscription/       # Subscription management components
├── analytics/          # Analytics dashboard components
└── chat/               # Chat and messaging components
```


### Key Architectural Principles

1. **Role-Based Component Rendering**: Every protected component checks user role before rendering
2. **Client-Side Enforcement**: Frontend enforces restrictions to prevent UI affordances for unauthorized actions
3. **Defensive Programming**: Assume backend validation exists but implement frontend checks as first line of defense
4. **Progressive Enhancement**: New features integrate seamlessly with existing components
5. **Responsive Design**: All components work across mobile, tablet, and desktop viewports

### Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Charts**: Recharts 2.15
- **Calendar**: FullCalendar 6.1
- **Icons**: Lucide React 0.468
- **State Management**: React hooks and context (no external state library)

## Components and Interfaces

### 1. Role-Based Access Control Components

#### RoleGuard Component
```typescript
interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Wraps components to enforce role-based visibility
// Renders children only if user role is in allowedRoles
// Optionally renders fallback for unauthorized users
```

#### useAuth Hook
```typescript
interface AuthContext {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  logout: () => void;
}

// Provides authentication state and user role
// Used by all protected components
```


### 2. Communication System Components

#### ChatWindow Component
```typescript
interface ChatWindowProps {
  chatType: 'private' | 'batch';
  participants: Participant[];
  currentUser: User;
  onSendMessage: (message: Message) => void;
  onUploadFile: (file: File) => void;
}

interface Participant {
  id: string;
  name: string;
  role: UserRole;
  isAdmin: boolean;
}

// Renders chat interface with role-based restrictions
// Shows admin badge for admin participants
// Enables file upload for batch chats only
// Validates file types (PDF, PGN) and size (10MB max)
```

#### ChatRestrictionGuard Component
```typescript
interface ChatRestrictionGuardProps {
  currentUserRole: UserRole;
  targetUserRole: UserRole;
  children: React.ReactNode;
}

// Enforces chat restrictions:
// - Admin ↔ Parent: Allowed
// - Admin ↔ Coach: Allowed
// - Parent ↔ Coach: BLOCKED (shows tooltip)
// - Batch chats: Always allowed
```

#### ContactPrivacyFilter Component
```typescript
interface ContactPrivacyFilterProps {
  user: User;
  currentUserRole: UserRole;
}

// Filters out phone and email from user display
// Only shows name and role
// Admin role still doesn't see contacts in UI (backend only)
```


### 3. Demo Pipeline Management Components

#### DemoTimeline Component
```typescript
interface DemoTimelineProps {
  demos: Demo[];
  onFilterChange: (filters: DemoFilters) => void;
}

interface Demo {
  id: string;
  studentName: string;
  coachName: string;
  status: DemoStatus;
  bookedDate: Date;
  completedDate?: Date;
  outcome?: DemoOutcome;
}

type DemoStatus = 'BOOKED' | 'ATTENDED' | 'INTERESTED' | 'CONVERTED' | 'DROPPED' | 'NO_SHOW';

// Renders visual timeline with color-coded status badges
// Supports filtering by status, date, coach
// Shows progression: BOOKED → ATTENDED → INTERESTED → CONVERTED
```

#### DemoOutcomeForm Component
```typescript
interface DemoOutcomeFormProps {
  demoId: string;
  onSubmit: (outcome: DemoOutcome) => Promise<void>;
  onCancel?: () => void;
}

interface DemoOutcome {
  status: 'ATTENDED' | 'NO_SHOW' | 'INTERESTED' | 'CONVERTED' | 'DROPPED';
  notes: string;
  timestamp: Date;
}

// Modal form that blocks navigation until submitted
// Mandatory after demo completion
// Validates outcome selection and captures notes
```


### 4. Subscription Management Components

#### SubscriptionControls Component
```typescript
interface SubscriptionControlsProps {
  subscription: Subscription;
  onPause: () => Promise<void>;
  onResume: () => Promise<void>;
  onCancel: () => Promise<void>;
}

interface Subscription {
  id: string;
  userId: string;
  status: SubscriptionStatus;
  nextPaymentDate: Date;
  amount: number;
  history: SubscriptionAction[];
}

type SubscriptionStatus = 'ACTIVE' | 'PAST_DUE' | 'SUSPENDED' | 'CANCELLED';

// Admin-only component with pause/resume/cancel actions
// Shows confirmation dialog for destructive actions
// Displays status banner and action history
```

#### PaymentHistory Component
```typescript
interface PaymentHistoryProps {
  payments: Payment[];
  readonly: boolean;
}

interface Payment {
  id: string;
  date: Date;
  amount: number;
  status: 'PAID' | 'PENDING' | 'FAILED';
  invoiceUrl: string;
}

// Read-only view for parents
// Shows payment history with invoice download links
// Displays current subscription status and next payment date
```


### 5. Analytics Dashboard Components

#### CoachAnalytics Component
```typescript
interface CoachAnalyticsProps {
  coachId: string;
  timePeriod: 'week' | 'month' | 'quarter';
}

interface CoachMetrics {
  demosAssigned: number;
  attendancePercentage: number;
  conversionPercentage: number;
  noShowPercentage: number;
}

// Displays coach performance metrics
// Supports time period filtering
// Renders bar, line, and pie charts using Recharts
```

#### AdminAnalytics Component
```typescript
interface AdminAnalyticsProps {
  filters: AnalyticsFilters;
}

interface AnalyticsFilters {
  timePeriod: 'week' | 'month' | 'quarter';
  sessionType?: '1-to-1' | 'group';
  level?: string;
  timezone?: string;
}

interface AdminMetrics {
  demosByCoach: Record<string, number>;
  followUpSpeed: number;
  conversionRate: number;
  dropOffRate: number;
  funnelData: FunnelStage[];
}

// Comprehensive system analytics for admins
// Funnel visualization: Booked → Attended → Interested → Paid
// Multi-dimensional filtering
// CSV export functionality
```


### 6. Parent UI Enhancement Components

#### AssignedCoachView Component
```typescript
interface AssignedCoachViewProps {
  coach: Coach;
  batch: Batch;
}

interface Coach {
  id: string;
  name: string;
  profileImage?: string;
  // NO phone or email fields
}

interface Batch {
  id: string;
  name: string;
  schedule: ClassSchedule[];
  chatLink: string;
}

// Displays assigned coach and batch information
// Shows batch schedule and chat access link
// Hides all contact information
```

#### WeeklySchedule Component
```typescript
interface WeeklyScheduleProps {
  classes: ScheduledClass[];
  timezone: string;
}

interface ScheduledClass {
  id: string;
  date: Date;
  duration: number;
  coachName: string;
  topic: string;
  status: 'upcoming' | 'past' | 'in-progress';
  joinLink?: string;
}

// Weekly calendar view with timezone awareness
// Join button enabled 15 minutes before class start
// Past classes marked as completed
// Upcoming classes highlighted
```

#### MonthlyReviewRequest Component
```typescript
interface MonthlyReviewRequestProps {
  parentId: string;
  currentQuota: number;
  requests: ReviewRequest[];
}

interface ReviewRequest {
  id: string;
  requestDate: Date;
  status: 'PENDING' | 'SCHEDULED' | 'COMPLETED';
  scheduledDate?: Date;
}

// Review request button with quota tracking
// Shows remaining quota (1 per month)
// Displays request status
// Disabled when quota exhausted
```


### 7. Coach UI Enhancement Components

#### BatchManagement Component
```typescript
interface BatchManagementProps {
  batches: Batch[];
  coachId: string;
}

interface Batch {
  id: string;
  name: string;
  students: Student[];
  schedule: ClassSchedule[];
  chatLink: string;
}

interface Student {
  id: string;
  name: string;
  rating: number;
  progress: ProgressIndicator;
  // NO parent contact information
}

// Lists all assigned batches
// Shows student roster per batch
// Displays student progress indicators
// Provides batch chat access
```

#### FileUpload Component
```typescript
interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  allowedTypes: string[];
  maxSize: number;
}

// File upload with validation
// Allowed types: PDF, PGN
// Max size: 10MB
// Shows preview before sending
// Tracks download history
```

#### CoachCalendar Component
```typescript
interface CoachCalendarProps {
  events: CalendarEvent[];
  onBlockTime: (block: TimeBlock) => Promise<void>;
}

interface CalendarEvent {
  id: string;
  type: 'class' | 'demo' | 'blocked';
  start: Date;
  end: Date;
  title: string;
}

interface TimeBlock {
  start: Date;
  end: Date;
  recurring?: RecurringPattern;
}

// Calendar showing classes, demos, and availability blocks
// Personal availability blocking feature
// Blocked times not bookable by admin
// Supports recurring block patterns
// Visual distinction between event types
```


## Data Models

### User Model
```typescript
interface User {
  id: string;
  name: string;
  role: UserRole;
  // Contact info exists in backend but NEVER exposed to frontend
  createdAt: Date;
  updatedAt: Date;
}

type UserRole = 'admin' | 'coach' | 'parent' | 'student';
```

### Session Model
```typescript
interface Session {
  userId: string;
  role: UserRole;
  token: string;
  expiresAt: Date;
}
```

### Chat Models
```typescript
interface Chat {
  id: string;
  type: 'private' | 'batch';
  participants: Participant[];
  messages: Message[];
  createdAt: Date;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  attachments?: Attachment[];
  timestamp: Date;
}

interface Attachment {
  id: string;
  filename: string;
  fileType: 'pdf' | 'pgn';
  fileSize: number;
  url: string;
  uploadedAt: Date;
}
```

### Demo Models
```typescript
interface Demo {
  id: string;
  studentId: string;
  studentName: string;
  coachId: string;
  coachName: string;
  status: DemoStatus;
  bookedDate: Date;
  scheduledDate: Date;
  completedDate?: Date;
  outcome?: DemoOutcome;
  createdAt: Date;
  updatedAt: Date;
}

type DemoStatus = 'BOOKED' | 'ATTENDED' | 'INTERESTED' | 'CONVERTED' | 'DROPPED' | 'NO_SHOW';

interface DemoOutcome {
  status: DemoStatus;
  notes: string;
  recordedBy: string;
  timestamp: Date;
}
```


### Subscription Models
```typescript
interface Subscription {
  id: string;
  userId: string;
  status: SubscriptionStatus;
  plan: SubscriptionPlan;
  startDate: Date;
  nextPaymentDate: Date;
  amount: number;
  history: SubscriptionAction[];
  createdAt: Date;
  updatedAt: Date;
}

type SubscriptionStatus = 'ACTIVE' | 'PAST_DUE' | 'SUSPENDED' | 'CANCELLED';

interface SubscriptionAction {
  id: string;
  action: 'PAUSE' | 'RESUME' | 'CANCEL' | 'PAYMENT';
  performedBy: string;
  timestamp: Date;
  notes?: string;
}

interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  date: Date;
  status: 'PAID' | 'PENDING' | 'FAILED';
  invoiceUrl: string;
  method: string;
}
```

### Analytics Models
```typescript
interface CoachMetrics {
  coachId: string;
  timePeriod: TimePeriod;
  demosAssigned: number;
  demosCompleted: number;
  attendancePercentage: number;
  conversionPercentage: number;
  noShowPercentage: number;
  calculatedAt: Date;
}

interface AdminMetrics {
  timePeriod: TimePeriod;
  totalDemos: number;
  demosByCoach: Record<string, number>;
  averageFollowUpSpeed: number;
  conversionRate: number;
  dropOffRate: number;
  funnelData: FunnelStage[];
  calculatedAt: Date;
}

interface FunnelStage {
  stage: 'BOOKED' | 'ATTENDED' | 'INTERESTED' | 'PAID';
  count: number;
  percentage: number;
}

type TimePeriod = 'week' | 'month' | 'quarter';
```


### Parent/Coach Models
```typescript
interface Batch {
  id: string;
  name: string;
  coachId: string;
  coachName: string;
  students: string[];
  schedule: ClassSchedule[];
  chatId: string;
  createdAt: Date;
}

interface ClassSchedule {
  id: string;
  batchId: string;
  date: Date;
  duration: number;
  topic: string;
  joinLink?: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
}

interface ReviewRequest {
  id: string;
  parentId: string;
  studentId: string;
  requestDate: Date;
  status: 'PENDING' | 'SCHEDULED' | 'COMPLETED';
  scheduledDate?: Date;
  completedDate?: Date;
  notes?: string;
}

interface TimeBlock {
  id: string;
  coachId: string;
  start: Date;
  end: Date;
  recurring?: RecurringPattern;
  reason?: string;
  createdAt: Date;
}

interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  endDate?: Date;
  daysOfWeek?: number[];
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Authentication & Access Control Properties

**Property 1: Role-Based Dashboard Routing**
*For any* authenticated user with a given role, the system should redirect them to the correct role-specific dashboard (admin → /dashboard/admin, coach → /dashboard/coach, parent → /dashboard/parent, student → /dashboard/student).
**Validates: Requirements 1.2**

**Property 2: Session Role Consistency**
*For any* active session, the role information should remain consistent throughout the session lifecycle and match the user's assigned role.
**Validates: Requirements 1.3**

**Property 3: Protected Route Authorization**
*For any* protected route access attempt, role verification should occur before rendering the component, and unauthorized roles should be denied access.
**Validates: Requirements 1.4**


### Communication System Properties

**Property 4: Batch Chat Participant Visibility**
*For any* batch group chat, the participant list should include all parents, the assigned coach, and admin users with their roles clearly displayed.
**Validates: Requirements 2.1, 2.5**

**Property 5: Admin Badge Display**
*For any* chat where an admin is present, the admin should be visible with a role badge indicating their admin status.
**Validates: Requirements 2.2**

**Property 6: File Upload Type Validation**
*For any* file upload attempt in batch chat, only PDF and PGN file formats should be accepted, and all other formats should be rejected with an error message.
**Validates: Requirements 2.3**

**Property 7: Parent-Coach Chat Restriction**
*For any* parent-coach user pair, private chat functionality should be blocked, and attempting to initiate chat should display a tooltip explaining the restriction.
**Validates: Requirements 2.8**

**Property 8: Contact Information Privacy**
*For any* user profile or contact display in the UI, phone numbers and email addresses should never be rendered, regardless of the viewing user's role.
**Validates: Requirements 2.11, 2.12**


### Demo Pipeline Properties

**Property 9: Demo Status Badge Display**
*For any* demo with a given status (BOOKED, ATTENDED, INTERESTED, CONVERTED, DROPPED, NO_SHOW), the correct status badge should be displayed with appropriate color coding.
**Validates: Requirements 3.2, 3.4**

**Property 10: Demo Filter Accuracy**
*For any* combination of filter criteria (status, date range, coach), the displayed demos should only include those matching all selected filters.
**Validates: Requirements 3.5**

**Property 11: Mandatory Outcome Form Submission**
*For any* completed demo, the system should prevent navigation away from the outcome form until a valid outcome is submitted.
**Validates: Requirements 3.6**

**Property 12: Outcome Form Validation**
*For any* demo outcome form submission, the system should only accept the predefined outcome values (ATTENDED, NO_SHOW, INTERESTED, CONVERTED, DROPPED) and reject any other values.
**Validates: Requirements 3.8**

**Property 13: Automatic Timestamp Recording**
*For any* demo outcome form submission, a timestamp should be automatically captured and stored with the outcome data.
**Validates: Requirements 3.10**


### Subscription Management Properties

**Property 14: Subscription Status Display**
*For any* subscription with a given status (ACTIVE, PAST_DUE, SUSPENDED, CANCELLED), the correct status banner should be displayed with appropriate styling.
**Validates: Requirements 4.4**

**Property 15: Destructive Action Confirmation**
*For any* destructive subscription action (cancel, suspend), a confirmation dialog should appear before the action is executed.
**Validates: Requirements 4.6**

**Property 16: Parent Payment View Read-Only**
*For any* parent viewing their payment history, all payment fields and controls should be read-only with no ability to modify payment data.
**Validates: Requirements 4.7**

**Property 17: Invoice Download Availability**
*For any* completed payment in the payment history, a download link for the invoice should be present and functional.
**Validates: Requirements 4.8**


### Analytics Properties

**Property 18: Coach Metrics Calculation Accuracy**
*For any* coach's demo history within a given time period, the attendance percentage, conversion percentage, and no-show percentage should be correctly calculated based on the actual demo outcomes.
**Validates: Requirements 5.2, 5.3, 5.4**

**Property 19: Time Period Filter Accuracy**
*For any* selected time period filter (week, month, quarter), only demos within that time period should be included in the metrics calculation.
**Validates: Requirements 5.5**

**Property 20: Demo Ownership Display**
*For any* demo in the admin analytics view, the owning coach should be correctly identified and displayed.
**Validates: Requirements 5.7**

**Property 21: Admin Funnel Data Accuracy**
*For any* set of demos, the funnel visualization should correctly show the count and percentage at each stage (BOOKED → ATTENDED → INTERESTED → PAID).
**Validates: Requirements 5.10**

**Property 22: Analytics Filter Combination**
*For any* combination of analytics filters (session type, level, timezone), only demos matching all selected criteria should be included in the results.
**Validates: Requirements 5.11**

**Property 23: CSV Export Completeness**
*For any* analytics dataset displayed on screen, the CSV export should contain all visible data rows and columns.
**Validates: Requirements 5.12**


### Parent UI Properties

**Property 24: Assigned Coach Display**
*For any* parent viewing their assigned coach, the coach's name and profile should be displayed without any contact information (phone/email).
**Validates: Requirements 6.1**

**Property 25: Batch Schedule Display**
*For any* parent's assigned batch, the complete schedule should be displayed with all upcoming and past classes.
**Validates: Requirements 6.2**

**Property 26: Batch Chat Access**
*For any* parent's assigned batch, a functional link to access the batch group chat should be present.
**Validates: Requirements 6.3**

**Property 27: Class Join Button Timing**
*For any* scheduled class, the join button should only be enabled starting 15 minutes before the class start time and remain enabled during the class.
**Validates: Requirements 6.6**

**Property 28: Past Class Status Display**
*For any* class with a date in the past, it should be marked and displayed as completed in the schedule view.
**Validates: Requirements 6.7**

**Property 29: Upcoming Class Highlighting**
*For any* class with a date in the future, it should be visually highlighted in the schedule view.
**Validates: Requirements 6.8**

**Property 30: Timezone-Aware Time Display**
*For any* class time displayed to a parent, it should be converted to and shown in the parent's local timezone.
**Validates: Requirements 6.9**

**Property 31: Review Request Quota Display**
*For any* parent, the remaining monthly review request quota should be correctly calculated and displayed (1 per month).
**Validates: Requirements 6.11**

**Property 32: Review Request Status Display**
*For any* review request, the correct status (PENDING, SCHEDULED, COMPLETED) should be displayed.
**Validates: Requirements 6.12**

**Property 33: Review Request Button State**
*For any* parent with zero remaining quota, the review request button should be disabled and show a tooltip explaining the quota limit.
**Validates: Requirements 6.13**


### Coach UI Properties

**Property 34: Assigned Batch Display**
*For any* coach, all batches assigned to them should be listed in the batch management view.
**Validates: Requirements 7.1**

**Property 35: Batch Student Roster Display**
*For any* batch, all enrolled students should be listed in the student roster without any parent contact information.
**Validates: Requirements 7.2**

**Property 36: Student Progress Indicator Display**
*For any* student in a coach's batch, progress indicators should be visible and reflect the student's current status.
**Validates: Requirements 7.3**

**Property 37: Batch Chat Access for Coach**
*For any* batch assigned to a coach, the coach should have access to the batch group chat.
**Validates: Requirements 7.5**

**Property 38: File Size Validation**
*For any* file upload attempt, files exceeding 10MB should be rejected with an appropriate error message.
**Validates: Requirements 7.7**

**Property 39: File Preview Display**
*For any* file selected for upload, a preview should be displayed before the file is sent.
**Validates: Requirements 7.8**

**Property 40: File Download History Tracking**
*For any* file downloaded from chat, the download event should be recorded in the download history.
**Validates: Requirements 7.9**

**Property 41: Coach Calendar Event Display**
*For any* coach, all their classes, demos, and availability blocks should be displayed on the calendar.
**Validates: Requirements 7.10**

**Property 42: Availability Block Creation**
*For any* coach, they should be able to create personal availability blocks that prevent booking during those times.
**Validates: Requirements 7.11**

**Property 43: Blocked Time Booking Prevention**
*For any* time slot marked as blocked by a coach, admin booking attempts for that slot should be prevented or show a warning.
**Validates: Requirements 7.12**

**Property 44: Recurring Block Pattern Support**
*For any* availability block, coaches should be able to set recurring patterns (daily, weekly, monthly) with configurable intervals.
**Validates: Requirements 7.13**

**Property 45: Calendar Event Type Visual Distinction**
*For any* calendar event (class, demo, or availability block), it should have distinct visual styling based on its type.
**Validates: Requirements 7.14**


## Error Handling

### Authentication Errors

**Session Expiration**
- Detect expired sessions on API calls
- Redirect to login page with return URL
- Show toast notification: "Your session has expired. Please log in again."

**Invalid Role Access**
- Catch unauthorized route access attempts
- Redirect to appropriate dashboard for user's role
- Log security event for audit

**Network Errors**
- Retry failed authentication requests (max 3 attempts)
- Show error message: "Unable to connect. Please check your internet connection."
- Provide manual retry button

### Communication Errors

**Blocked Chat Attempt**
- Prevent UI affordance for parent-coach private chat
- Show tooltip: "Direct messaging with coaches is not available. Please use batch group chat."
- Log compliance event

**File Upload Errors**
- Invalid file type: "Only PDF and PGN files are allowed."
- File too large: "File size exceeds 10MB limit. Please choose a smaller file."
- Upload failure: "Upload failed. Please try again."
- Show progress indicator during upload

**Message Send Failure**
- Retry failed message sends (max 3 attempts)
- Show error indicator on message
- Provide manual retry button
- Queue messages for retry when connection restored


### Demo Pipeline Errors

**Outcome Form Validation**
- Missing outcome selection: "Please select a demo outcome."
- Navigation attempt without submission: Show confirmation dialog "You have unsaved changes. Are you sure you want to leave?"
- Submission failure: "Failed to save outcome. Please try again."

**Filter Errors**
- Invalid date range: "End date must be after start date."
- No results: "No demos found matching your filters."
- API failure: "Unable to load demo data. Please refresh the page."

### Subscription Management Errors

**Action Confirmation**
- Cancel subscription: "Are you sure you want to cancel this subscription? This action cannot be undone."
- Pause subscription: "Confirm pausing subscription. The customer will not be charged until resumed."
- Resume subscription: "Confirm resuming subscription. The next payment will be processed on [date]."

**Action Failures**
- API error: "Failed to update subscription. Please try again."
- Invalid state transition: "Cannot perform this action on a [status] subscription."
- Network error: "Connection lost. Please check your internet and try again."

### Analytics Errors

**Data Loading Errors**
- API failure: "Unable to load analytics data. Please refresh the page."
- Timeout: "Request timed out. Please try again."
- No data: "No data available for the selected time period."

**Export Errors**
- CSV generation failure: "Failed to generate export. Please try again."
- Empty dataset: "No data to export."
- Browser compatibility: "Export feature requires a modern browser."

### Calendar Errors

**Booking Conflicts**
- Blocked time: "This time slot is blocked by the coach."
- Double booking: "This time slot is already booked."
- Past date: "Cannot book classes in the past."

**Availability Block Errors**
- Overlapping blocks: "This time overlaps with an existing block."
- Invalid time range: "End time must be after start time."
- Recurring pattern error: "Invalid recurring pattern configuration."


## Testing Strategy

### Dual Testing Approach

This project employs both **unit testing** and **property-based testing** as complementary strategies:

- **Unit tests**: Verify specific examples, edge cases, error conditions, and integration points
- **Property tests**: Verify universal properties across all inputs through randomization

Together, these approaches provide comprehensive coverage where unit tests catch concrete bugs and property tests verify general correctness.

### Property-Based Testing Configuration

**Library**: We will use **fast-check** for TypeScript property-based testing.

**Configuration**:
- Minimum 100 iterations per property test (due to randomization)
- Each property test must reference its design document property
- Tag format: `// Feature: ops-compliance-features, Property {number}: {property_text}`

**Example Property Test Structure**:
```typescript
import fc from 'fast-check';

// Feature: ops-compliance-features, Property 1: Role-Based Dashboard Routing
test('any user with a given role should redirect to correct dashboard', () => {
  fc.assert(
    fc.property(
      fc.record({
        userId: fc.uuid(),
        role: fc.constantFrom('admin', 'coach', 'parent', 'student'),
        name: fc.string()
      }),
      (user) => {
        const expectedPath = `/dashboard/${user.role}`;
        const actualPath = getDashboardPath(user.role);
        expect(actualPath).toBe(expectedPath);
      }
    ),
    { numRuns: 100 }
  );
});
```


### Unit Testing Strategy

**Focus Areas**:
1. **Specific Examples**: Test concrete scenarios like admin-parent chat allowed, parent-coach chat blocked
2. **Edge Cases**: Empty states, boundary conditions, null/undefined handling
3. **Error Conditions**: Network failures, validation errors, timeout scenarios
4. **Integration Points**: Component interactions, API call handling, state management

**Testing Library**: React Testing Library with Jest

**Example Unit Test**:
```typescript
import { render, screen } from '@testing-library/react';
import { ChatRestrictionGuard } from '@/components/compliance/ChatRestrictionGuard';

describe('ChatRestrictionGuard', () => {
  it('should block parent-coach private chat', () => {
    render(
      <ChatRestrictionGuard 
        currentUserRole="parent" 
        targetUserRole="coach"
      >
        <button>Send Message</button>
      </ChatRestrictionGuard>
    );
    
    expect(screen.queryByText('Send Message')).not.toBeInTheDocument();
    expect(screen.getByText(/not available/i)).toBeInTheDocument();
  });
  
  it('should allow admin-parent private chat', () => {
    render(
      <ChatRestrictionGuard 
        currentUserRole="admin" 
        targetUserRole="parent"
      >
        <button>Send Message</button>
      </ChatRestrictionGuard>
    );
    
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });
});
```


### Component Testing Priorities

**Critical Compliance Components** (Must have comprehensive tests):
1. RoleGuard - Ensures role-based access control
2. ChatRestrictionGuard - Enforces communication restrictions
3. ContactPrivacyFilter - Prevents contact information leaks
4. DemoOutcomeForm - Ensures mandatory outcome recording
5. SubscriptionControls - Validates admin-only actions

**High Priority Components**:
1. CoachAnalytics - Validates metric calculations
2. AdminAnalytics - Validates funnel and filter logic
3. FileUpload - Validates file type and size restrictions
4. CoachCalendar - Validates availability blocking
5. WeeklySchedule - Validates timezone handling

**Medium Priority Components**:
1. DemoTimeline - Validates status display and filtering
2. PaymentHistory - Validates read-only enforcement
3. BatchManagement - Validates data display
4. MonthlyReviewRequest - Validates quota tracking

### Integration Testing

**Key Integration Scenarios**:
1. Login → Role verification → Dashboard redirect
2. Demo completion → Outcome form → Timeline update
3. File upload → Validation → Chat message with attachment
4. Subscription action → Confirmation → API call → History update
5. Calendar block → Booking attempt → Conflict detection

### Accessibility Testing

**Requirements**:
- All interactive elements must have ARIA labels
- Keyboard navigation must work for all features
- Screen reader compatibility for all content
- Color contrast must meet WCAG AA standards (4.5:1 for normal text)

**Testing Tools**:
- jest-axe for automated accessibility testing
- Manual keyboard navigation testing
- Screen reader testing (NVDA/JAWS)

### Performance Testing

**Metrics to Monitor**:
- Page load time: < 2 seconds
- Chat message delivery: < 500ms
- Analytics dashboard load: < 3 seconds
- File upload progress feedback: Immediate

**Testing Approach**:
- Lighthouse CI for performance monitoring
- React DevTools Profiler for component rendering
- Network throttling tests for slow connections
- Large dataset tests for analytics dashboards

### Responsive Design Testing

**Breakpoints to Test**:
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

**Testing Approach**:
- Visual regression testing with Percy or Chromatic
- Manual testing on real devices
- Browser DevTools responsive mode
- Touch target size validation (minimum 44px)

