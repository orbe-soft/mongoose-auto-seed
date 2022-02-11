import mongoose, { Document, Model } from "mongoose";

interface IMetadata extends Document {
  title: string;
  timestamp: number;
}

const metadataSchema = new mongoose.Schema<IMetadata>({
  title: {
    type: String
  },
  timestamp: {
    type: Number
  }
});

export const Metadata: Model<IMetadata> = mongoose.model("Metadata", metadataSchema);

export interface File {
  title: string;
  start: () => Promise<void>;
}

/**
 * @description
 * Start the seeders and store the files that can't executed again.
 */
export const startup = async (files: File[]) => {
  const queue = files.map(async file => {
    await file.start();

    await Metadata.create({
      title: file.title,
      timestamp: new Date().getTime()
    });
  });

  await Promise.all(queue);
};
