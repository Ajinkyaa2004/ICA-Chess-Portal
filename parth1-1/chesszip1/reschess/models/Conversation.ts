import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type ConversationType = '1-1' | 'batch-group';

export interface IParticipant {
  userId: Types.ObjectId;
  role: string;
  name: string;
}

export interface IConversation extends Document {
  type: ConversationType;
  participants: IParticipant[];
  batchId: Types.ObjectId | null; // for batch group chats
  lastMessage: string;
  lastMessageAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ParticipantSchema = new Schema<IParticipant>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const ConversationSchema = new Schema<IConversation>(
  {
    type: {
      type: String,
      enum: ['1-1', 'batch-group'],
      required: true,
    },
    participants: [ParticipantSchema],
    batchId: {
      type: Schema.Types.ObjectId,
      ref: 'Batch',
      default: null,
    },
    lastMessage: {
      type: String,
      default: '',
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

ConversationSchema.index({ 'participants.userId': 1 });
ConversationSchema.index({ batchId: 1 });
ConversationSchema.index({ type: 1 });
ConversationSchema.index({ lastMessageAt: -1 });

const Conversation: Model<IConversation> =
  mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);

export default Conversation;
