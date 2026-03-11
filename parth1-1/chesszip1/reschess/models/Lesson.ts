import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type LessonStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

export interface IAttendanceRecord {
  studentId: Types.ObjectId;
  present: boolean;
}

export interface ILesson extends Document {
  batchId: Types.ObjectId;
  coachId: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  topic: string;
  description: string;
  status: LessonStatus;
  attendance: IAttendanceRecord[];
  homework: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceRecordSchema = new Schema<IAttendanceRecord>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    present: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const LessonSchema = new Schema<ILesson>(
  {
    batchId: {
      type: Schema.Types.ObjectId,
      ref: 'Batch',
      required: true,
    },
    coachId: {
      type: Schema.Types.ObjectId,
      ref: 'Coach',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'],
      default: 'SCHEDULED',
    },
    attendance: [AttendanceRecordSchema],
    homework: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

LessonSchema.index({ batchId: 1, date: 1 });
LessonSchema.index({ coachId: 1, date: 1 });
LessonSchema.index({ date: 1 });
LessonSchema.index({ status: 1 });

const Lesson: Model<ILesson> =
  mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', LessonSchema);

export default Lesson;
