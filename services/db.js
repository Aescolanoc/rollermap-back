import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';

export async function mongoConnect() {
  const user = process.env.DBUSER;
  const password = process.env.DBPASSWORD;
  let dbName;
  if (process.env.NODE_ENV === 'test') {
    dbName = process.env.DBNAMETEST;
  } else {
    dbName = process.env.DBNAME;
  }
  const uri = `mongodb+srv://${user}:${password}@cluster0.vdfih.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const mongooseConnect = await mongoose.connect(uri);
  return mongooseConnect;
}

export async function mongoDisconnect() {
  return mongoose.disconnect();
}

export async function installUsers(data) {
  const deleted = await User.deleteMany({});
  const result = await User.insertMany(data);
  return { result, deleted };
}
