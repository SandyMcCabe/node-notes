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


// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

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
    console.log(req.query)
    res.json(results);
 });

// app.use('/', apiRoutes);

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = uniqid();
  
    // if (!validateAnimal(req.body)) {
    //   res.status(400).send('The animal is not properly formatted.');
    // } else {
      const note = createNote(req.body, notes);
      res.json(note);
    // }
  });

app.listen(PORT, () => {
console.log(`API server now on port ${PORT}!`);
});


//   GIVEN a note-taking application
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column



// The following HTML routes should be created:

// GET /notes should return the notes.html file.

// GET * should return the index.html file.

// The following API routes should be created:



