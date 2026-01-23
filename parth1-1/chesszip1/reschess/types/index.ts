export type UserRole = 'student' | 'coach' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  rating: number;
  language: string[];
  timezone: string;
  parentId: string;
  coachId?: string;
  avatar?: string;
}

export interface Coach {
  id: string;
  name: string;
  rating: number;
  experience: number;
  specialization: string[];
  languages: string[];
  availability: TimeSlot[];
  avatar?: string;
  bio?: string;
  hourlyRate: number;
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Lesson {
  id: string;
  studentId: string;
  coachId: string;
  scheduledAt: Date;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'missed';
  meetingLink?: string;
  notes?: string;
}

export interface Attendance {
  lessonId: string;
  status: 'attended' | 'missed' | 'rescheduled';
  date: Date;
}

export interface Progress {
  studentId: string;
  rating: number;
  accuracy: number;
  date: Date;
  strengths: string[];
  weaknesses: string[];
}

export interface Package {
  id: string;
  name: 'Starter' | 'Club' | 'Pro';
  price: number;
  features: string[];
  lessonsPerMonth: number;
  duration: number;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  date: Date;
  packageId: string;
  invoiceUrl?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'lesson' | 'payment' | 'match' | 'message';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
}

export interface DemoBooking {
  id: string;
  studentName: string;
  parentEmail: string;
  parentPhone: string;
  preferredDate: Date;
  preferredTime: string;
  coachPreference: 'any' | string;
  status: 'pending' | 'confirmed' | 'completed' | 'missed';
  timezone: string;
}
