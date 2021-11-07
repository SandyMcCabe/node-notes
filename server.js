// needed for express server
const express = require('express');
const app = express();

// for the ids for the notes
var uniqid = require('uniqid'); 

// const inquirer =require('inquirer');
const notes = require('./Develop/db/db.json');

const PORT = process.env.PORT || 3001;

const fs =require('fs');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


function createNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './Develop/db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
  }

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
 });


// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
app.post('/api/notes', (req, res) => {
    // set id based on string returned from uniqid npi
    req.body.id = uniqid();
  
    // if (!validateAnimal(req.body)) {
    //   res.status(400).send('The animal is not properly formatted.');
    // } else {
      const note = createNote(req.body, notes);
      res.json(note);
    // }
  });


// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
  }); 


// GET * should return the index.html file.
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
}); 



app.listen(PORT, () => {
console.log(`API server now on port ${PORT}!`);
});
