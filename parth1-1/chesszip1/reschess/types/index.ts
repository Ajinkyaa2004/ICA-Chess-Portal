export type UserRole = 'customer' | 'coach' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  studentType: '1-1' | 'group';
  country: string;
  city: string;
  // Parent details embedded (NO separate parentId per spec)
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  batchIds: string[];
  joinDate: string;
  notes: string;
  avatar?: string;
}

export interface Coach {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  experience: number;
  specialization: string[];
  availability: TimeSlot[];
  avatar?: string;
  bio?: string;
  earningsTotal: number;
  isActive: boolean;
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Batch {
  id: string;
  name: string;
  coachId: string;
  coachName?: string;
  type: '1-1' | 'group';
  level: string;
  schedule: TimeSlot[];
  maxStudents: number;
  studentIds: string[];
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  startDate: string;
  description: string;
}

export interface Lesson {
  id: string;
  batchId: string;
  coachId: string;
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
  description: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  attendance: { studentId: string; present: boolean }[];
  homework: string;
}

export interface DemoBooking {
  id: string;
  studentName: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  age: number;
  level: string;
  preferredDate: string;
  preferredTime: string;
  status: DemoStatus;
  coachId: string | null;
  notes: string;
  followUpDate: string | null;
  source: string;
}

export type DemoStatus =
  | 'BOOKED'
  | 'ATTENDED'
  | 'NO_SHOW'
  | 'RESCHEDULED'
  | 'CANCELLED'
  | 'INTERESTED'
  | 'NOT_INTERESTED'
  | 'PAYMENT_PENDING'
  | 'CONVERTED'
  | 'DROPPED';

export interface Subscription {
  id: string;
  studentId: string;
  batchId: string;
  plan: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  amount: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED' | 'PENDING';
}

export interface Payment {
  id: string;
  studentId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  paidAt: string | null;
  description: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  fileUrl: string | null;
  fileName: string | null;
  createdAt: string;
}

export interface Conversation {
  id: string;
  type: '1-1' | 'batch-group';
  participants: { userId: string; role: string; name: string }[];
  batchId: string | null;
  lastMessage: string;
  lastMessageAt: string | null;
}

export interface Broadcast {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  title: string;
  content: string;
  targetRoles: string[];
  targetBatchIds: string[];
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'lesson' | 'payment' | 'match' | 'message';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isActive: boolean;
  createdAt: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  category: string;
  batchId: string;
  createdAt: string;
}

export interface Package {
  id: string;
  name: 'Starter' | 'Club' | 'Pro';
  price: number;
  features: string[];
  lessonsPerMonth: number;
  duration: number;
}

export interface Progress {
  studentId: string;
  rating: number;
  accuracy: number;
  date: string;
  strengths: string[];
  weaknesses: string[];
}

export interface Attendance {
  lessonId: string;
  status: 'attended' | 'missed' | 'rescheduled';
  date: string;
}
