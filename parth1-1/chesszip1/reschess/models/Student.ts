import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type StudentType = '1-1' | 'group';
export type StudentLevel = 'beginner' | 'intermediate' | 'advanced';
export type StudentStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED';

export interface IStudent extends Document {
  accountId: Types.ObjectId;
  name: string;
  age: number;
  level: StudentLevel;
  studentType: StudentType;
  country: string;
  city: string;
  // Parent details embedded (NO separate Parent model per spec)
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  status: StudentStatus;
  batchIds: Types.ObjectId[];
  joinDate: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    name: {
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
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    studentType: {
      type: String,
      enum: ['1-1', 'group'],
      default: 'group',
    },
    country: {
      type: String,
      default: 'India',
      trim: true,
    },
    city: {
      type: String,
      default: '',
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
    status: {
      type: String,
      enum: ['ACTIVE', 'PAUSED', 'CANCELLED'],
      default: 'ACTIVE',
    },
    batchIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Batch',
    }],
    joinDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

StudentSchema.index({ accountId: 1 });
StudentSchema.index({ status: 1 });
StudentSchema.index({ batchIds: 1 });

const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);

export default Student;
