import { Seeder } from "./domain/Seeder";
import { Metadata } from "./models/Metadata";

/**
 * @description
 * Start the seeders and store the files that can't executed again.
 */
export const startup = async (seeders: Seeder[]) => {
  const queue = seeders.map(async (seeder) => {
    const exists = await Metadata.findOne({
      title: seeder.title,
    });

    if (seeder.unique && !exists) {
      await Metadata.create({
        title: seeder.title,
        timestamp: new Date().getTime(),
      });

      await seeder.start();
    }
  });

  await Promise.all(queue);
};

export { Seeder };
export { Metadata };
