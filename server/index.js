import express from 'express';
import cors from 'cors';
import Connection from './database/db.js';
import Route from './routes/route.js';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(cors());

// Deployment
// const __dirname = path.resolve();
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '/frontend/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     });
// } else {
//     app.get('/', (req, res) => {
//         res.send('API is running successfully');
//     });
//}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', Route);

Connection();
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));
