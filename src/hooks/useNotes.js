import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { fetchNotes, createNote, updateNote, deleteNotes } from '../api'

export function useNotes() {
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    const loadNotes = async () => {
      const fetchedNotes = await fetchNotes();
      setNotes(Array.isArray(fetchedNotes) ? fetchedNotes : [])
    }
    loadNotes()
  }, [])

  const addNote = async (note) => {
    const newNote = {
      ...note,
      id: uuidv4(),
      lastEdited: new Date().toISOString()
    }
    const createdNote = await createNote(newNote)
    setNotes(prev => [createdNote, ...prev])
    return createdNote
  }

  const updateNoteHandler = async (updatedNote) => {
    const updatedData = {
      ...updatedNote,
      lastEdited: new Date().toISOString()
    };
    const updatedNoteData = await updateNote(updatedData);
    setNotes(prev =>
      prev.map(note => (note.id === updatedNoteData.id ? updatedNoteData : note))
    );
  };

  const deleteNotesHandler = async (noteIds) => {
    await deleteNotes(noteIds);
    setNotes(prev => prev.filter((note) => !noteIds.includes(note.id)));
  };

  return { notes, addNote, updateNote: updateNoteHandler, deleteNotes: deleteNotesHandler }
} 