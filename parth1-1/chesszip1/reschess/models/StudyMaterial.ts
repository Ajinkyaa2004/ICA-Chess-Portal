import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IStudyMaterial extends Document {
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  category: string;
  batchId: Types.ObjectId;
  uploadedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const StudyMaterialSchema = new Schema<IStudyMaterial>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: 'general',
      trim: true,
    },
    batchId: {
      type: Schema.Types.ObjectId,
      ref: 'Batch',
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

StudyMaterialSchema.index({ batchId: 1 });
StudyMaterialSchema.index({ uploadedBy: 1 });
StudyMaterialSchema.index({ category: 1 });

const StudyMaterial: Model<IStudyMaterial> =
  mongoose.models.StudyMaterial || mongoose.model<IStudyMaterial>('StudyMaterial', StudyMaterialSchema);

export default StudyMaterial;
