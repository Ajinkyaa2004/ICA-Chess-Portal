import mongoose, { Schema, Document, Model } from 'mongoose';

export type AccountRole = 'ADMIN' | 'COACH' | 'CUSTOMER';

export interface IAccount extends Document {
  email: string;
  passwordHash: string;
  role: AccountRole;
  name: string;
  isActive: boolean;
  lastLogin: Date | null;
  resetToken: string | null;
  resetTokenExpiry: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'COACH', 'CUSTOMER'],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

AccountSchema.index({ email: 1 });
AccountSchema.index({ role: 1 });

const Account: Model<IAccount> =
  mongoose.models.Account || mongoose.model<IAccount>('Account', AccountSchema);

export default Account;
