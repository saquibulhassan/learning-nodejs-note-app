const fs = require('fs')
const chalk = require('chalk')

const getNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) =>  note.title === title )

    if(note) {
        console.log(chalk.green.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("Note not found"))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(chalk.green.inverse(note.title))
        console.log(chalk.inverse.black(note.body))
    })
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if(duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)

        console.log(chalk.inverse.green('Note added'))
    } else {
        console.log(chalk.inverse.red('Duplicate notes found'))
    }
}

const remoteNote = (title, body) => {
    const notes = loadNotes()
    const foundNotes = notes.filter((note) => note.title === title)

    if(foundNotes.length > 0) {
        notes.splice(notes.indexOf(foundNotes[0]), 1)

        saveNotes(notes)

        console.log(chalk.inverse.green(foundNotes[0].title + ' is removed'))
    } else {
        console.log(chalk.inverse.red('Notes not found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNote: getNote,
    listNotes: listNotes,
    addNote: addNote,
    removeNote: remoteNote
}