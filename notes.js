const fs = require("fs");
const chalk = require("chalk");

// Chalk Setup
const log = console.log;
const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const success = chalk.bold.greenBright;

const addNote = ({ title, body }) => {
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

const removeNote = ({ title }) => {
  const notes = loadNotes();
  const newNotes = notes.filter(note => note.title !== title);

  if (notes.length > newNotes.length) {
    log(success("Note Removed Successfully"));
    saveNote(newNotes);
  } else {
    log(error("There is no such note with the given title"));
  }
  console.log(notes.length, newNotes.length);
};

const readNote = ({ title }) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (!note) log(error("There is no such note with the given title"));
  else {
    log(success("Here you go.."));
    console.log(note);
  }
};

const listNotes = () => {
  const notes = loadNotes();
  log(success("Here you go..."));
  console.log(`There are totle ${notes.length} notes.`);
  notes.forEach(note => {
    console.log(note);
  });
};

const loadNotes = () => {
  try {
    const notes = fs.readFileSync("notes.json");
    const notesJSON = notes.toString();
    return JSON.parse(notesJSON);
  } catch (e) {
    return [];
  }
};

const saveNote = notes => {
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
