const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const cors = require('cors');
const FileSync = require('lowdb/adapters/FileSync');

app.use(express.json()); // for parsing application/json
app.use(bodyParser());
app.use(cors());

const uuid = require('uuid/v4');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: [{ id: uuid(), title: 'lowdb is awesoooome' }] }).write();

const getIdFromRequest = req => req.params.id;

app.get('/', function(req, res) {
	res.send('Hello World!');
});

// get All
app.get('/movies', function(req, res) {
	const movies = db.get('movies').value();

	res.send(movies);
});
app.get('/users', function(req, res) {
	const users = db.get('users').value();

	res.send(users);
});

// getOne
app.get('/movies/:id', function(req, res) {
	const id = getIdFromRequest(req);
	const result = db
		.get('movies')
		.find({ id })
		.value();

	console.log({ result });
	res.send(result);
});

// create / update a post
app.post('/movies', function(req, res) {
	try {
		const movies = db.get('movies');
		const { body } = req;

		const { id } = body;
		console.log({ id });

		// update
		if (id) {
			console.log('if element');
			movies
				.find({ id })
				.assign(req.body)
				.write();
			res.send(req.body);

			// create
		} else {
			console.log('else');

			const newMovie = { ...req.body, id: uuid() };
			console.log({ newMovie });
			movies.push(newMovie).write();
			res.send(newMovie);
		}

		console.log(body);
	} catch (error) {
		console.log(error);
		res.send('error');
	}
});

// delete a post
app.delete('/movies/:id', function(req, res) {
	try {
		const id = getIdFromRequest(req);

		db.get('movies')
			.remove({ id })
			.write();
		res.send('deleted');
	} catch (error) {
		console.log(error);
	}
});

app.listen(4000, function() {
	console.log(`Example app listening on port ${4000}`);
});