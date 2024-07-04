class Note {
  constructor(id, description, important = false) {
    this.id = id;
    this.description = description;
    this.important = important;
  }

  toggleImportant() {
    this.important = !this.important;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
  }
}

class NoteManager {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    this.loadNotes();
  }

  addNote(description) {
    const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1;
    const note = new Note(id, description);
    this.notes.push(note);
    this.saveNotes();
    this.renderNotes();
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveNotes();
    this.renderNotes();
  }

  toggleNoteImportant(id) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      note.toggleImportant();
      this.saveNotes();
      this.renderNotes();
    }
  }

  editNote(id, newDescription) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      note.updateDescription(newDescription);
      this.saveNotes();
      this.renderNotes();
    }
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadNotes() {
    this.renderNotes();
  }

  renderNotes() {
    const noteList = document.getElementById('note-list');
    noteList.innerHTML = '';
    this.notes.forEach((note) => {
      const item = document.createElement('li');
      item.className = note.important ? 'important' : '';

      const descriptionSpan = document.createElement('span');
      descriptionSpan.textContent = note.description;
      descriptionSpan.addEventListener('click', () =>
        this.toggleNoteImportant(note.id)
      );

      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const newDescription = prompt('Editar nota', note.description);
        if (newDescription) {
          this.editNote(note.id, newDescription);
        }
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteNote(note.id);
      });

      item.appendChild(descriptionSpan);
      item.appendChild(editButton);
      item.appendChild(deleteButton);
      noteList.appendChild(item);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const noteManager = new NoteManager();

  document.getElementById('add-note').addEventListener('click', () => {
    const newNote = document.getElementById('new-note').value;
    if (newNote) {
      noteManager.addNote(newNote);
      document.getElementById('new-note').value = '';
    }
  });
});
