import * as dotenv from 'dotenv';
dotenv.config();
import { mongoConnect, mongoDisconnect, installUsers } from './db.js';
import data from './users.data.js';

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

    test('then it should be created and populated', async () => {
        await mongoConnect();
        const mockUsers = data.users;
        const { result } = await installUsers(mockUsers);
        expect(result).toBeTruthy();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(data.users.length);
    });
});
