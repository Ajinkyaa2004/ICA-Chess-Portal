import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED' | 'PENDING';
export type SubscriptionPlan = 'monthly' | 'quarterly' | 'semi-annual' | 'annual';

export interface ISubscription extends Document {
  studentId: Types.ObjectId;
  batchId: Types.ObjectId;
  plan: SubscriptionPlan;
  amount: number;
  startDate: Date;
  endDate: Date;
  status: SubscriptionStatus;
  razorpaySubId: string | null;
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    batchId: {
      type: Schema.Types.ObjectId,
      ref: 'Batch',
      required: true,
    },
    plan: {
      type: String,
      enum: ['monthly', 'quarterly', 'semi-annual', 'annual'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED', 'PENDING'],
      default: 'PENDING',
    },
    razorpaySubId: {
      type: String,
      default: null,
    },
    autoRenew: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

SubscriptionSchema.index({ studentId: 1 });
SubscriptionSchema.index({ batchId: 1 });
SubscriptionSchema.index({ status: 1 });
SubscriptionSchema.index({ endDate: 1 });

const Subscription: Model<ISubscription> =
  mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;
