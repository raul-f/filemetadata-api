'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

// require and use "multer"...

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use((req, res, next) => {
	console.log(`\n${req.method} request to ${req.url} has been received!`);
	next();
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
	// console.log(req.file);
	res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', (req, res) => {
  	res.json({greetings: "Hello, API"});
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Your app is listening on port ' + listener.address().port)
});