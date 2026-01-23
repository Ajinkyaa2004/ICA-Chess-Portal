# OPS Compliance Features - Requirements

## 📋 Overview

Add enterprise-grade operational compliance features to the Indian Chess Academy frontend while maintaining all existing functionality. Focus on role-based access control, communication restrictions, and admin oversight.

---

## 🎯 Goals

1. **Preserve Existing Features** - All current UI/UX remains functional
2. **Add OPS Features** - Implement missing operational requirements
3. **Enforce Role Restrictions** - Strict role-based UI controls
4. **Zero Policy Violations** - No unauthorized communications or data exposure

---

## 👥 User Roles

- **Admin** - Full system access and oversight
- **Coach** - Teaching and batch management
- **Parent** - Customer/guardian account
- **Student** - Learner account (linked to parent)

---

## 📝 User Stories & Acceptance Criteria

### 1. Authentication & Account Management

#### 1.1 Single Login System
**As a user**, I want to log in once and be directed to my role-appropriate dashboard.

**Acceptance Criteria:**
- ✅ Single login page (no separate parent/student login)
- ✅ Account role determines dashboard redirect
- ✅ Session management per role
- ✅ Secure role verification on frontend

#### 1.2 Student Profile with Parent Details
**As a student**, I want to view my profile including my parent's information without seeing IDs.

**Acceptance Criteria:**
- ✅ Student profile page shows student details
- ✅ Parent details embedded in student profile
- ✅ No parent ID or student ID visible in UI
- ✅ Read-only view for students
- ✅ Editable by admin only

---

### 2. Communication System (Strict Rules)

#### 2.1 Batch Group Chat
**As a parent/coach**, I want to communicate in batch group chats with proper oversight.

**Acceptance Criteria:**
- ✅ Batch group chat shows: Parents, Coach, Admin
- ✅ Admin always visible with role badge
- ✅ File upload enabled (PDF, PGN formats)
- ✅ Message history audit-friendly layout
- ✅ Participant list shows roles clearly

#### 2.2 Restricted Private Chat
**As a user**, I should only have 1-to-1 chat access based on my role.

**Acceptance Criteria:**
- ✅ Admin ↔ Parent chat allowed
- ✅ Admin ↔ Coach chat allowed
- ✅ Parent ↔ Coach chat BLOCKED with tooltip explanation
- ✅ Disabled chat states show clear messaging
- ✅ No workarounds or loopholes

#### 2.3 Contact Information Privacy
**As a user**, I should never see phone numbers or email addresses of other users.

**Acceptance Criteria:**
- ✅ No phone numbers visible anywhere
- ✅ No email addresses visible anywhere
- ✅ Communication only through platform
- ✅ Admin can see contacts (backend only, not exposed in UI)

---

### 3. Demo Pipeline Management (Admin)

#### 3.1 Demo Lifecycle Timeline
**As an admin**, I want to track demo bookings through their complete lifecycle.

**Acceptance Criteria:**
- ✅ Visual timeline component showing demo stages
- ✅ Status badges: BOOKED → ATTENDED → INTERESTED → CONVERTED
- ✅ DROPPED and NO_SHOW indicators
- ✅ Color-coded status visualization
- ✅ Filterable by status, date, coach

#### 3.2 Demo Outcome Form
**As an admin**, I must record demo outcomes before proceeding.

**Acceptance Criteria:**
- ✅ Mandatory outcome form after demo completion
- ✅ Cannot navigate away until submitted
- ✅ Outcome options: Attended, No-Show, Interested, Converted, Dropped
- ✅ Notes field for additional context
- ✅ Timestamp recorded automatically

---

### 4. Subscription & Payment Management (Admin-Controlled)

#### 4.1 Admin Subscription Controls
**As an admin**, I want to manage customer subscriptions with clear actions.

**Acceptance Criteria:**
- ✅ Pause subscription button
- ✅ Resume subscription button
- ✅ Cancel subscription button (with confirmation)
- ✅ Status banners: ACTIVE, PAST_DUE, SUSPENDED, CANCELLED
- ✅ Action history log visible
- ✅ Confirmation dialogs for destructive actions

#### 4.2 Parent Payment View
**As a parent**, I want to view my payment history without editing capabilities.

**Acceptance Criteria:**
- ✅ Read-only payment history table
- ✅ Invoice download links
- ✅ Current subscription status visible
- ✅ Next payment date shown
- ✅ No ability to modify payments

---

### 5. Analytics Dashboards

#### 5.1 Coach Analytics Dashboard
**As a coach**, I want to see my performance metrics.

**Acceptance Criteria:**
- ✅ Demos assigned count
- ✅ Attendance percentage
- ✅ Conversion percentage
- ✅ No-show percentage
- ✅ Time period filters (week, month, quarter)
- ✅ Visual charts (bar, line, pie)

#### 5.2 Admin Analytics Dashboard
**As an admin**, I want comprehensive system analytics.

**Acceptance Criteria:**
- ✅ Demo ownership by coach
- ✅ Follow-up speed metrics
- ✅ Conversion and drop-off percentages
- ✅ Funnel visualization: Booked → Attended → Interested → Paid
- ✅ Filters: 1-to-1 vs Group, Level, Timezone
- ✅ Export to CSV functionality

---

### 6. Parent/Customer UI Additions

#### 6.1 Assigned Coach & Batch View
**As a parent**, I want to see my child's assigned coach and batch details.

**Acceptance Criteria:**
- ✅ Coach name and profile visible
- ✅ Batch schedule displayed
- ✅ Batch group chat access link
- ✅ No coach contact information shown

#### 6.2 Weekly Schedule with Join Button
**As a parent**, I want to see upcoming classes with easy join access.

**Acceptance Criteria:**
- ✅ Weekly calendar view
- ✅ Join button for each class (15 min before start)
- ✅ Past classes marked as completed
- ✅ Upcoming classes highlighted
- ✅ Timezone-aware display

#### 6.3 Monthly Free Review Request
**As a parent**, I want to request a free monthly review with quota tracking.

**Acceptance Criteria:**
- ✅ Review request button
- ✅ Quota indicator (1 per month)
- ✅ Request status: Pending, Scheduled, Completed
- ✅ Disabled when quota exhausted
- ✅ Resets monthly automatically

---

### 7. Coach UI Additions

#### 7.1 Assigned Batches & Students
**As a coach**, I want to see all my assigned batches and students.

**Acceptance Criteria:**
- ✅ List of all assigned batches
- ✅ Student roster per batch
- ✅ Student progress indicators
- ✅ No parent contact information visible

#### 7.2 Batch-Only Chat with File Sharing
**As a coach**, I want to communicate with batches and share files.

**Acceptance Criteria:**
- ✅ Batch group chat access
- ✅ File upload: PDF and PGN formats only
- ✅ File size limit: 10MB
- ✅ File preview before sending
- ✅ Download history tracking

#### 7.3 Calendar with Availability Blocking
**As a coach**, I want to manage my schedule and block personal time.

**Acceptance Criteria:**
- ✅ Calendar showing all classes and demos
- ✅ Personal availability blocking feature
- ✅ Blocked times not bookable by admin
- ✅ Recurring block patterns supported
- ✅ Visual distinction between classes, demos, and blocks

---

## 🚨 Non-Negotiable UI Rules

### Rule 1: Contact Information Privacy
- ❌ No phone numbers visible
- ❌ No email addresses visible
- ✅ All communication through platform only

### Rule 2: Unauthorized Chat Prevention
- ❌ No Parent ↔ Coach private chat
- ✅ Disabled states with clear tooltips
- ✅ No UI affordances for restricted actions

### Rule 3: Role-Based Visibility
- ✅ Every component checks user role
- ✅ Unauthorized features hidden completely
- ✅ No "disabled but visible" for restricted features

### Rule 4: Admin Oversight
- ✅ Admin always visible in batch chats
- ✅ Admin role badge always shown
- ✅ Audit trail for all communications

---

## 🎨 UI/UX Requirements

### Design Consistency
- Maintain existing color scheme and typography
- Use existing component library
- Responsive design for all new features
- Touch-friendly on mobile (44px minimum tap targets)

### Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader compatible
- Color contrast compliance (WCAG AA)

### Performance
- Lazy load analytics dashboards
- Paginated chat history
- Optimistic UI updates
- Loading states for all async operations

---

## 🔐 Security Considerations

### Frontend Security
- Role verification on every protected route
- Token-based authentication
- Automatic session timeout
- XSS prevention in chat messages

### Data Privacy
- No sensitive data in localStorage
- Encrypted communication
- No PII in URLs or query params
- Secure file upload validation

---

## 📊 Success Metrics

### Compliance Metrics
- Zero unauthorized communication attempts
- 100% role-based access enforcement
- No contact information leaks

### User Experience Metrics
- Demo outcome form completion rate: >95%
- Chat engagement in batch groups: >60%
- Review request utilization: >40%

### System Performance
- Page load time: <2s
- Chat message delivery: <500ms
- Analytics dashboard load: <3s

---

## 🚀 Implementation Priority

### Phase 1: Critical Compliance (Week 1-2)
1. Communication restrictions
2. Contact information removal
3. Role-based access control

### Phase 2: Admin Tools (Week 3-4)
1. Demo pipeline management
2. Subscription controls
3. Admin analytics dashboard

### Phase 3: User Enhancements (Week 5-6)
1. Coach analytics
2. Parent UI additions
3. Coach calendar improvements

### Phase 4: Polish & Testing (Week 7-8)
1. Comprehensive testing
2. Performance optimization
3. Documentation

---

## 📝 Notes

- Backend API assumed to exist and support all features
- All features must work on mobile, tablet, and desktop
- Maintain existing responsive design patterns
- No breaking changes to current functionality
- All new features must be documented

---

## ✅ Definition of Done

- [ ] All acceptance criteria met
- [ ] Role-based access enforced
- [ ] No policy violations possible
- [ ] Responsive on all devices
- [ ] Accessibility compliant
- [ ] Performance benchmarks met
- [ ] Documentation complete
- [ ] User testing passed
- [ ] Security audit passed

---

**Last Updated:** January 16, 2026  
**Status:** Requirements Defined  
**Next Step:** Design Document
