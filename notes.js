const fs = require("fs");
const chalk = require("chalk");

// Chalk Setup
const log = console.log;
const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const success = chalk.bold.greenBright;
// log(error("Error!"));
// log(warning("Warning!"));
// log(success("Success!"));

const addNote = function({ title, body }) {
  const notes = loadNotes();

  const isDuplicates = notes.filter(note => note.title === title);

  if (isDuplicates.length === 0) {
    notes.push({ title, body });
    saveNote(notes);
    log(success("Note Added"));
  } else {
    log(error("Note Title Already Exist!"));
  }
};

const removeNote = function({ title }) {
  const notes = loadNotes();
  const noteIndex = notes.findIndex(note => note.title === title);
  if (noteIndex === -1)
    log(error("There is no such note with the given title"));
  else {
    notes.splice(noteIndex, 1);
    saveNote(notes);
    log(success("Note Removed Successfully"));
  }
};

const readNote = function({ title }) {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (!note) log(error("There is no such note with the given title"));
  else {
    log(success("Here you go.."));
    console.log(note);
  }
};
const listNotes = function() {
  const notes = loadNotes();
  log(success("Here you go..."));
  console.log(`There are totle ${notes.length} notes.`);
  notes.forEach(note => {
    console.log(note);
  });
};

const loadNotes = function() {
  try {
    const notes = fs.readFileSync("notes.json");
    const notesJSON = notes.toString();
    return JSON.parse(notesJSON);
  } catch (e) {
    return [];
  }
};

const saveNote = function(notes) {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};

module.exports = {
  addNote,
  removeNote,
  loadNotes,
  saveNote,
  listNotes,
  readNote
};
