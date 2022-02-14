import { Seeder } from "./domain/Seeder";
import { Metadata } from "./models/Metadata";

/**
 * @description
 * Start the seeders and store the files that can't executed again.
 */
export const startup = async (seeders: Seeder[]) => {
  const queue = seeders.map(async seeder => {
    await seeder.start();

    await Metadata.create({
      title: seeder.title,
      timestamp: new Date().getTime()
    });
  });

  await Promise.all(queue);
};
