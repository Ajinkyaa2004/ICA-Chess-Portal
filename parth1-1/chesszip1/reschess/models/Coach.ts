import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IAvailabilitySlot {
  day: string; // 'Monday' | 'Tuesday' etc.
  startTime: string; // '09:00'
  endTime: string; // '17:00'
}

export interface ICoach extends Document {
  accountId: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  experience: number; // years
  bio: string;
  availability: IAvailabilitySlot[];
  monthlyRate: number;
  ratePerSession: number;
  rating: number;
  totalReviews: number;
  earningsTotal: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AvailabilitySlotSchema = new Schema<IAvailabilitySlot>(
  {
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { _id: false }
);

const CoachSchema = new Schema<ICoach>(
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
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    specialization: [{
      type: String,
      trim: true,
    }],
    experience: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      default: '',
    },
    availability: [AvailabilitySlotSchema],
    monthlyRate: {
      type: Number,
      default: 0,
    },
    ratePerSession: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    earningsTotal: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

CoachSchema.index({ accountId: 1 });
CoachSchema.index({ isActive: 1 });

const Coach: Model<ICoach> =
  mongoose.models.Coach || mongoose.model<ICoach>('Coach', CoachSchema);

export default Coach;
