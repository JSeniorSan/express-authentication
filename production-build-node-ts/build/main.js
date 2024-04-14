import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index.js';
const PORT = 8080;
const app = express();
app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log('Server running on http://localhost:8080/');
});
// const MONGO_URL =
//   'mongodb+srv://tekai:tekai@cluster0.lppxftn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', (error) => console.log(error));
app.use('/', router());
