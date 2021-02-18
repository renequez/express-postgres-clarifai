import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from './controllers/register.js';
import { handleSignIn } from './controllers/signin.js';
import { handleProfileGet } from './controllers/profile.js';
import { handleApiCall, handleImage } from './controllers/image.js';

const db = knex({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password: '1234',
		database: 'facerecognition-db',
	},
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json('welcome');
});

app.post('/signin', (req, res) => handleSignIn(req, res, db, bcrypt));

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => handleProfileGet(req, res, db));

app.put('/image', (req, res) => handleImage(req, res, db));
app.post('/image', (req, res) => handleApiCall(req, res));

let port = process.env.PORT;
if (port == null || port == '') {
	port = 3030;
}

app.listen(port, () => {
	console.log(`app is running on port ${port}`);
});
