import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  designation: string;
  duration: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    designation: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Experience: Model<IExperience> = mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
export default Experience;
