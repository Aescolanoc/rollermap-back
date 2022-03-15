import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import loginRouter from './routes/login.routes.js';
import { mongoConnect } from './services/db.js';
import usersRouter from './routes/users.routes.js';
import rollerPlacesRouter from './routes/rollerplaces.routes.js';

dotenv.config();
import * as dotenv from 'dotenv';

const app = express();
const port = process.env.PORT;

await mongoConnect();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/rollerplaces', rollerPlacesRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, resp, next) => {
  console.log(err.message);
  resp.status(err.status);
  resp.send({ error: err.message });
});

export const serverInstance = app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});
