/**
 * Seed Script for ICA Operations Platform
 *
 * Run with: npx tsx scripts/seed.ts
 *
 * Creates test data: 1 admin, 2 coaches, 5 students, 3 batches, demo bookings, lessons
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ica';

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected!');

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection not established');
  }

  // Clear existing data
  const collections = await db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
  console.log('Cleared existing data');

  const passwordHash = await bcrypt.hash('Welcome@123', 12);

  // Create accounts
  const accounts = await db.collection('accounts').insertMany([
    { email: 'admin@ica.com', passwordHash, role: 'ADMIN', name: 'ICA Admin', isActive: true, lastLogin: null, resetToken: null, resetTokenExpiry: null, createdAt: new Date(), updatedAt: new Date() },
    { email: 'coach.ramesh@ica.com', passwordHash, role: 'COACH', name: 'IM Ramesh Kumar', isActive: true, lastLogin: null, resetToken: null, resetTokenExpiry: null, createdAt: new Date(), updatedAt: new Date() },
    { email: 'coach.priya@ica.com', passwordHash, role: 'COACH', name: 'WGM Priya Sharma', isActive: true, lastLogin: null, resetToken: null, resetTokenExpiry: null, createdAt: new Date(), updatedAt: new Date() },
    { email: 'arjun.parent@email.com', passwordHash, role: 'CUSTOMER', name: 'Rajesh Patel', isActive: true, lastLogin: null, resetToken: null, resetTokenExpiry: null, createdAt: new Date(), updatedAt: new Date() },
    { email: 'meera.parent@email.com', passwordHash, role: 'CUSTOMER', name: 'Sunita Reddy', isActive: true, lastLogin: null, resetToken: null, resetTokenExpiry: null, createdAt: new Date(), updatedAt: new Date() },
    { email: 'vikram.parent@email.com', passwordHash, role: 'CUSTOMER', name: 'Amit Singh', isActive: true, lastLogin: null, resetToken: null, resetTokenExpiry: null, createdAt: new Date(), updatedAt: new Date() },
    { email: 'ananya.parent@email.com', passwordHash, role: 'CUSTOMER', name: 'Deepa Gupta', isActive: true, lastLogin: null, resetToken: null, resetTokenExpiry: null, createdAt: new Date(), updatedAt: new Date() },
    { email: 'rohan.parent@email.com', passwordHash, role: 'CUSTOMER', name: 'Suresh Nair', isActive: true, lastLogin: null, resetToken: null, resetTokenExpiry: null, createdAt: new Date(), updatedAt: new Date() },
  ]);

  const accountIds = Object.values(accounts.insertedIds);
  console.log(`Created ${accountIds.length} accounts`);

  // Create coaches
  const coaches = await db.collection('coaches').insertMany([
    {
      accountId: accountIds[1], name: 'IM Ramesh Kumar', email: 'coach.ramesh@ica.com', phone: '+91 98765 43210',
      specialization: ['Openings', 'Middlegame', 'Tournament Prep'], experience: 15, bio: 'International Master with 15 years of coaching experience',
      availability: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Friday', startTime: '09:00', endTime: '17:00' },
      ],
      rating: 4.8, totalReviews: 45, earningsTotal: 250000, isActive: true, createdAt: new Date(), updatedAt: new Date(),
    },
    {
      accountId: accountIds[2], name: 'WGM Priya Sharma', email: 'coach.priya@ica.com', phone: '+91 98765 43220',
      specialization: ['Endgame', 'Strategy', 'Beginner Training'], experience: 10, bio: 'Woman Grandmaster specializing in youth development',
      availability: [
        { day: 'Tuesday', startTime: '10:00', endTime: '18:00' },
        { day: 'Thursday', startTime: '10:00', endTime: '18:00' },
        { day: 'Saturday', startTime: '09:00', endTime: '14:00' },
      ],
      rating: 4.9, totalReviews: 32, earningsTotal: 180000, isActive: true, createdAt: new Date(), updatedAt: new Date(),
    },
  ]);

  const coachIds = Object.values(coaches.insertedIds);
  console.log(`Created ${coachIds.length} coaches`);

  // Create students
  const students = await db.collection('students').insertMany([
    { accountId: accountIds[3], name: 'Arjun Patel', age: 12, level: 'intermediate', studentType: 'group', country: 'India', city: 'Delhi', parentName: 'Rajesh Patel', parentEmail: 'arjun.parent@email.com', parentPhone: '+91 98765 43211', status: 'ACTIVE', batchIds: [], joinDate: new Date('2024-06-01'), notes: '', createdAt: new Date(), updatedAt: new Date() },
    { accountId: accountIds[4], name: 'Meera Reddy', age: 10, level: 'beginner', studentType: 'group', country: 'India', city: 'Hyderabad', parentName: 'Sunita Reddy', parentEmail: 'meera.parent@email.com', parentPhone: '+91 98765 43222', status: 'ACTIVE', batchIds: [], joinDate: new Date('2024-08-15'), notes: '', createdAt: new Date(), updatedAt: new Date() },
    { accountId: accountIds[5], name: 'Vikram Singh', age: 14, level: 'advanced', studentType: '1-1', country: 'India', city: 'Mumbai', parentName: 'Amit Singh', parentEmail: 'vikram.parent@email.com', parentPhone: '+91 98765 43233', status: 'ACTIVE', batchIds: [], joinDate: new Date('2024-03-10'), notes: 'Aspiring to compete in nationals', createdAt: new Date(), updatedAt: new Date() },
    { accountId: accountIds[6], name: 'Ananya Gupta', age: 8, level: 'beginner', studentType: 'group', country: 'India', city: 'Bangalore', parentName: 'Deepa Gupta', parentEmail: 'ananya.parent@email.com', parentPhone: '+91 98765 43244', status: 'ACTIVE', batchIds: [], joinDate: new Date('2024-10-01'), notes: '', createdAt: new Date(), updatedAt: new Date() },
    { accountId: accountIds[7], name: 'Rohan Nair', age: 11, level: 'intermediate', studentType: 'group', country: 'India', city: 'Chennai', parentName: 'Suresh Nair', parentEmail: 'rohan.parent@email.com', parentPhone: '+91 98765 43255', status: 'ACTIVE', batchIds: [], joinDate: new Date('2024-07-20'), notes: '', createdAt: new Date(), updatedAt: new Date() },
  ]);

  const studentIds = Object.values(students.insertedIds);
  console.log(`Created ${studentIds.length} students`);

  // Create batches
  const batches = await db.collection('batches').insertMany([
    {
      name: 'Beginner Batch A', coachId: coachIds[1], type: 'group', level: 'beginner', maxStudents: 8,
      schedule: [{ day: 'Tuesday', startTime: '16:00', endTime: '17:00' }, { day: 'Thursday', startTime: '16:00', endTime: '17:00' }],
      studentIds: [studentIds[1], studentIds[3]], status: 'ACTIVE', startDate: new Date('2024-08-01'), description: 'Foundation course for beginners',
      createdAt: new Date(), updatedAt: new Date(),
    },
    {
      name: 'Intermediate Batch B', coachId: coachIds[0], type: 'group', level: 'intermediate', maxStudents: 6,
      schedule: [{ day: 'Monday', startTime: '17:00', endTime: '18:30' }, { day: 'Wednesday', startTime: '17:00', endTime: '18:30' }],
      studentIds: [studentIds[0], studentIds[4]], status: 'ACTIVE', startDate: new Date('2024-06-01'), description: 'Tactics and strategy for intermediate players',
      createdAt: new Date(), updatedAt: new Date(),
    },
    {
      name: 'Advanced 1-1 Vikram', coachId: coachIds[0], type: '1-1', level: 'advanced', maxStudents: 1,
      schedule: [{ day: 'Friday', startTime: '15:00', endTime: '16:30' }],
      studentIds: [studentIds[2]], status: 'ACTIVE', startDate: new Date('2024-03-10'), description: 'Personal coaching for tournament preparation',
      createdAt: new Date(), updatedAt: new Date(),
    },
  ]);

  const batchIds = Object.values(batches.insertedIds);
  console.log(`Created ${batchIds.length} batches`);

  // Update students with batchIds
  await db.collection('students').updateOne({ _id: studentIds[0] }, { $set: { batchIds: [batchIds[1]] } });
  await db.collection('students').updateOne({ _id: studentIds[1] }, { $set: { batchIds: [batchIds[0]] } });
  await db.collection('students').updateOne({ _id: studentIds[2] }, { $set: { batchIds: [batchIds[2]] } });
  await db.collection('students').updateOne({ _id: studentIds[3] }, { $set: { batchIds: [batchIds[0]] } });
  await db.collection('students').updateOne({ _id: studentIds[4] }, { $set: { batchIds: [batchIds[1]] } });

  // Create demo bookings
  await db.collection('demos').insertMany([
    { studentName: 'Aditya Sharma', parentName: 'Vikash Sharma', parentEmail: 'vikash@email.com', parentPhone: '+91 99999 11111', age: 9, level: 'beginner', preferredDate: new Date('2026-03-15'), preferredTime: '10:00 AM', status: 'BOOKED', coachId: null, notes: '', followUpDate: null, source: 'website', convertedStudentId: null, createdAt: new Date(), updatedAt: new Date() },
    { studentName: 'Kavya Iyer', parentName: 'Lakshmi Iyer', parentEmail: 'lakshmi@email.com', parentPhone: '+91 99999 22222', age: 11, level: 'intermediate', preferredDate: new Date('2026-03-14'), preferredTime: '3:00 PM', status: 'ATTENDED', coachId: coachIds[0], notes: 'Very interested, wants to join intermediate batch', followUpDate: new Date('2026-03-18'), source: 'referral', convertedStudentId: null, createdAt: new Date(Date.now() - 86400000), updatedAt: new Date() },
    { studentName: 'Rahul Das', parentName: 'Sanjay Das', parentEmail: 'sanjay@email.com', parentPhone: '+91 99999 33333', age: 7, level: 'beginner', preferredDate: new Date('2026-03-12'), preferredTime: '11:00 AM', status: 'INTERESTED', coachId: coachIds[1], notes: 'Wants weekend classes', followUpDate: new Date('2026-03-16'), source: 'social media', convertedStudentId: null, createdAt: new Date(Date.now() - 172800000), updatedAt: new Date() },
  ]);
  console.log('Created 3 demo bookings');

  // Create some lessons
  const today = new Date();
  await db.collection('lessons').insertMany([
    {
      batchId: batchIds[1], coachId: coachIds[0], date: new Date(today.setDate(today.getDate() + 1)),
      startTime: '17:00', endTime: '18:30', topic: 'Sicilian Defense Basics', description: 'Introduction to the Sicilian Defense',
      status: 'SCHEDULED', attendance: [], homework: 'Practice 5 puzzles on the Sicilian', createdAt: new Date(), updatedAt: new Date(),
    },
    {
      batchId: batchIds[0], coachId: coachIds[1], date: new Date(today.setDate(today.getDate() + 1)),
      startTime: '16:00', endTime: '17:00', topic: 'Piece Movement Review', description: 'Review of how pieces move and capture',
      status: 'SCHEDULED', attendance: [], homework: '', createdAt: new Date(), updatedAt: new Date(),
    },
    {
      batchId: batchIds[2], coachId: coachIds[0], date: new Date(today.setDate(today.getDate() + 2)),
      startTime: '15:00', endTime: '16:30', topic: 'Tournament Game Analysis', description: 'Analyzing recent tournament games',
      status: 'SCHEDULED', attendance: [], homework: 'Annotate your last 3 games', createdAt: new Date(), updatedAt: new Date(),
    },
  ]);
  console.log('Created 3 lessons');

  // Create announcements
  await db.collection('announcements').insertMany([
    { title: 'Welcome to ICA Platform', content: 'We are excited to launch our new operations platform. Explore all the features!', priority: 'high', createdBy: accountIds[0], isActive: true, expiresAt: null, createdAt: new Date(), updatedAt: new Date() },
    { title: 'National Chess Day Event', content: 'Join us for a special event on National Chess Day with guest lectures and tournaments.', priority: 'medium', createdBy: accountIds[0], isActive: true, expiresAt: new Date('2026-04-15'), createdAt: new Date(), updatedAt: new Date() },
  ]);
  console.log('Created 2 announcements');

  console.log('\n✅ Seed completed successfully!');
  console.log('\nTest credentials (all use password: Welcome@123):');
  console.log('  Admin:    admin@ica.com');
  console.log('  Coach 1:  coach.ramesh@ica.com');
  console.log('  Coach 2:  coach.priya@ica.com');
  console.log('  Customer: arjun.parent@email.com');
  console.log('  Customer: meera.parent@email.com');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
