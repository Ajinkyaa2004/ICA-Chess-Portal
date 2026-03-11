import mongoose, { Schema, Document, Model, Types } from 'mongoose';

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

export interface IDemo extends Document {
  studentName: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  age: number;
  level: string;
  preferredDate: Date;
  preferredTime: string;
  status: DemoStatus;
  coachId: Types.ObjectId | null;
  notes: string;
  followUpDate: Date | null;
  source: string; // how they found us
  convertedStudentId: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const DemoSchema = new Schema<IDemo>(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    parentEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    parentPhone: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      default: 'beginner',
    },
    preferredDate: {
      type: Date,
      required: true,
    },
    preferredTime: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: [
        'BOOKED',
        'ATTENDED',
        'NO_SHOW',
        'RESCHEDULED',
        'CANCELLED',
        'INTERESTED',
        'NOT_INTERESTED',
        'PAYMENT_PENDING',
        'CONVERTED',
        'DROPPED',
      ],
      default: 'BOOKED',
    },
    coachId: {
      type: Schema.Types.ObjectId,
      ref: 'Coach',
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
    followUpDate: {
      type: Date,
      default: null,
    },
    source: {
      type: String,
      default: 'website',
    },
    convertedStudentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

DemoSchema.index({ status: 1 });
DemoSchema.index({ coachId: 1 });
DemoSchema.index({ preferredDate: 1 });
DemoSchema.index({ createdAt: -1 });

const Demo: Model<IDemo> =
  mongoose.models.Demo || mongoose.model<IDemo>('Demo', DemoSchema);

export default Demo;
