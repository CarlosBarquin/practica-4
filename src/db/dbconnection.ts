import { MongoClient, Database } from "mongo";
import { SlotsSchema } from "./schema.ts";

import { config } from "std/dotenv/mod.ts";

await config({ export: true, allowEmptyValues: true });

const connectMongoDB = async (): Promise<Database> => {
//   const mongo_usr = Deno.env.get("MONGO_USR");
//   const mongo_pwd = Deno.env.get("MONGO_PWD");
//   const db_name = Deno.env.get("DB_NAME");
//   const mongo_uri = Deno.env.get("MONGO_URI");

  const mongo_url = `mongodb+srv://Carlos:holabuenas@cluster0.slujba9.mongodb.net/?authMechanism=SCRAM-SHA-1`;

  const client = new MongoClient();
  await client.connect(mongo_url);
  const db = client.database("SlotStore");
  return db;
};

const db = await connectMongoDB();
console.info(`MongoDB connected`);

export const slotCollection = db.collection<SlotsSchema>("Slots");