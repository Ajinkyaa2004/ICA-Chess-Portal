import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBroadcast extends Document {
  senderId: Types.ObjectId;
  senderName: string;
  senderRole: string;
  title: string;
  content: string;
  targetRoles: string[]; // which roles receive this
  targetBatchIds: Types.ObjectId[]; // specific batches, empty = all
  readBy: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const BroadcastSchema = new Schema<IBroadcast>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderRole: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    targetRoles: [{
      type: String,
      enum: ['ADMIN', 'COACH', 'CUSTOMER'],
    }],
    targetBatchIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Batch',
    }],
    readBy: [{
      type: Schema.Types.ObjectId,
      ref: 'Account',
    }],
  },
  {
    timestamps: true,
  }
);

BroadcastSchema.index({ targetRoles: 1 });
BroadcastSchema.index({ targetBatchIds: 1 });
BroadcastSchema.index({ createdAt: -1 });

const Broadcast: Model<IBroadcast> =
  mongoose.models.Broadcast || mongoose.model<IBroadcast>('Broadcast', BroadcastSchema);

export default Broadcast;
