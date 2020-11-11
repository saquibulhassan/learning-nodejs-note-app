const notes = require('./notes')
const yargs = require('yargs')

// add a new note
yargs.command({
    command: "add",
    description: "Add a new note",
    builder: {
        title: {
            description: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            description: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler (args) {
        notes.addNote(args.title, args.body)
    }
})

// remove a note
yargs.command({
    command: "remove",
    description: "Remove a note",
    builder: {
        title: {
            description: "Note title",
            demandOption: true,
            type: "string"
        },
    },
    handler (args) {
        notes.removeNote(args.title)
    }
})

// list all note
yargs.command({
    command: "list",
    description: "List all note",
    handler () {
        notes.listNotes()
    }
})

// list all note
yargs.command({
    command: "read",
    description: "Read a note",
    builder: {
        title: {
            description: "Note title",
            demandOption: true,
            type: "string"
        },
    },
    handler (args) {
        notes.getNote(args.title)
    }
})

yargs.parse();