import * as dotenv from 'dotenv';
dotenv.config();
import {
  mongoConnect,
  mongoDisconnect,
  installUsers,
  installRollerPlaces,
} from './db.js';
import dataUsers from './users.data.js';
import dataRollerPlaces from './rollerplaces.data.js';

describe('given a connection with MongoDB', () => {
  afterEach(async () => {
    await mongoDisconnect();
  });

  test('then should be possible connect to our DB ', async () => {
    const connect = await mongoConnect();
    expect(connect).toBeTruthy();
    expect(connect.connections[0].name).toBe(
      process.env.NODE_ENV === 'test'
        ? process.env.DBNAMETEST
        : process.env.DBNAME
    );
  });

  test('then it should be created and populated for users', async () => {
    await mongoConnect();
    const mockUsers = dataUsers.users;
    const { result } = await installUsers(mockUsers);
    expect(result).toBeTruthy();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(dataUsers.users.length);
  });

  test('then it should be created and populated for rollerplaces', async () => {
    await mongoConnect();
    const mockRollerPlaces = dataRollerPlaces.rollerplace;
    const { result } = await installRollerPlaces(mockRollerPlaces);
    expect(result).toBeTruthy();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(dataRollerPlaces.rollerplace.length);
  });
});
