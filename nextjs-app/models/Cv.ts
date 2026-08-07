import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICv extends Document {
  file_path: string;
  original_name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CvSchema = new Schema<ICv>(
  {
    file_path: { type: String, required: true },
    original_name: { type: String, required: true },
  },
  { timestamps: true }
);

const Cv: Model<ICv> = mongoose.models.Cv || mongoose.model<ICv>('Cv', CvSchema);
export default Cv;
