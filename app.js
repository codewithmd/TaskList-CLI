const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");
// const validator = require("validator");

// To ADD Note
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      type: String,
      describe: "Note Title",
      demandOption: true
    },
    body: {
      describe: "Note Content",
      type: String,
      demandOption: true
    }
  },
  handler: function(argv) {
    notes.addNote(argv);
  }
});

// To VIEW Notes
yargs.command({
  command: "list",
  describe: "View all notes",
  handler: function() {
    notes.listNotes();
  }
});

// To REMOVE Note
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      type: String,
      describe: "Note title",
      demandOption: true
    }
  },
  handler: function(argv) {
    notes.removeNote(argv);
  }
});

// To READ a Note
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      type: String,
      describe: "Note Title",
      demandOption: true
    }
  },
  handler: function(argv) {
    notes.readNote(argv);
  }
});

// console.log(yargs.argv);

yargs.parse();
