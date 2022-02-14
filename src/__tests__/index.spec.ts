import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

import { Seeder } from "../domain/Seeder";

import { startup } from "..";

export const connect = async () => {
  const mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    poolSize: 10
  };

  await mongoose.connect(uri, mongooseOpts);
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

describe("Seed test", () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("should call start one time", async done => {
    const seeder: Seeder = {
      title: "0527f62bd9",
      start: async () => {
        /** ... */
      }
    };

    const spy = spyOn(seeder, "start");

    await startup([seeder]);

    expect(spy).toHaveBeenCalled();
    done();
  });
});
