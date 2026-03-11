/**
 * Central model registration for Mongoose in serverless environments.
 *
 * In Vercel serverless functions each invocation may cold-start with no
 * Mongoose models registered.  If a route calls `.populate('ref')` but
 * the referenced model hasn't been imported yet, Mongoose throws
 * "MissingSchemaError".
 *
 * Import this file in `lib/db.ts` so every `dbConnect()` call also
 * ensures all models are registered.
 */

import '@/models/Account';
import '@/models/Announcement';
import '@/models/Batch';
import '@/models/Broadcast';
import '@/models/Coach';
import '@/models/Conversation';
import '@/models/Demo';
import '@/models/Lesson';
import '@/models/Message';
import '@/models/Payment';
import '@/models/Student';
import '@/models/StudyMaterial';
import '@/models/Subscription';
