import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAbout extends Document {
  title: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const About: Model<IAbout> = mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);
export default About;
