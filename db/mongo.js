import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

let database = null;

export async function startDatabase() {
  const mongo = await MongoMemoryServer.create();
  const mongoDBURL = await mongo.getUri();
  const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});
  database = connection.db();
}

export async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}