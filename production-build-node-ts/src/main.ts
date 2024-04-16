import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import router from './router/index.js';
import { config } from 'dotenv';

config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
  }),
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const MONGO_URL = process.env.MONGO_URL || '';

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB connection error ' + err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
app.use('/', router());
