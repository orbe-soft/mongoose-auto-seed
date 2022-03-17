import mongoose, { Document, Model } from "mongoose";

interface IMetadata extends Document {
  title: string;
  timestamp: number;
}

const metadataSchema = new mongoose.Schema<IMetadata>({
  title: {
    type: String,
  },
  timestamp: {
    type: Number,
  },
});

export const Metadata: Model<IMetadata> = mongoose.model(
  "__MetadataSeeder",
  metadataSchema
);
