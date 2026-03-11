import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type BatchType = '1-1' | 'group';
export type BatchStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';

export interface IScheduleSlot {
  day: string; // 'Monday', 'Tuesday', etc.
  startTime: string; // '10:00'
  endTime: string; // '11:00'
}

export interface IBatch extends Document {
  name: string;
  coachId: Types.ObjectId;
  type: BatchType;
  level: string;
  schedule: IScheduleSlot[];
  maxStudents: number;
  studentIds: Types.ObjectId[];
  status: BatchStatus;
  startDate: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleSlotSchema = new Schema<IScheduleSlot>(
  {
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { _id: false }
);

const BatchSchema = new Schema<IBatch>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    coachId: {
      type: Schema.Types.ObjectId,
      ref: 'Coach',
      required: true,
    },
    type: {
      type: String,
      enum: ['1-1', 'group'],
      default: 'group',
    },
    level: {
      type: String,
      default: 'beginner',
    },
    schedule: [ScheduleSlotSchema],
    maxStudents: {
      type: Number,
      default: 10,
    },
    studentIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Student',
    }],
    status: {
      type: String,
      enum: ['ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'],
      default: 'ACTIVE',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

BatchSchema.index({ coachId: 1 });
BatchSchema.index({ status: 1 });
BatchSchema.index({ studentIds: 1 });

const Batch: Model<IBatch> =
  mongoose.models.Batch || mongoose.model<IBatch>('Batch', BatchSchema);

export default Batch;
