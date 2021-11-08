// needed for express server
const express = require('express');
const app = express();

// for the ids for the notes
var uniqid = require('uniqid');

const PORT = process.env.PORT || 3001;

const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notesArr = require('./db/db.json');
const { json } = require('express');


// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  let results = notesArr
  res.json(results);
});


// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
app.post('/api/notes', (req, res) => {
  // set id based on string returned from uniqid npi
  let notes = notesArr

  req.body.id = uniqid();
  notes.push(req.body)

  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notes, null, 2)
  );

  res.json(notes);
});


// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});


// GET * should return the index.html file.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});