import { useState } from 'react'
import { useNotes } from '../hooks/useNotes'
import Header from '../components/Header'
import NoteCard from '../components/NoteCard'
import NoteEditor from '../components/NoteEditor'
import '../styles/theme.css'
import '../styles/App.css'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function Home() {
  const { notes, addNote, updateNote, deleteNotes } = useNotes()
  const [editingNote, setEditingNote] = useState(null)
  const [selectedNotes, setSelectedNotes] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    if (editingNote !== null) {
      return
    }
    
    const newNote = {
      title: 'Nova Nota',
      content: ''
    }
    const createdNote = await addNote(newNote)
    setEditingNote(createdNote)
  }

  const handleNoteClick = (note) => {
    if (isSelecting) {
      setSelectedNotes(prev =>
        prev.includes(note.id)
          ? prev.filter(id => id !== note.id)
          : [...prev, note.id]
      )
    } else {
      setEditingNote(note)
    }
  }

  const handleLongPress = (noteId) => {
    setIsSelecting(true)
  }

  const cancelSelection = () => {
    setIsSelecting(false)
    setSelectedNotes([])
  }

  const handleDeleteSelected = () => {
    deleteNotes(selectedNotes)
    cancelSelection()
  }

  const handleSaveNote = (updatedNote) => {
    updateNote(updatedNote)
    setEditingNote(null)
  }

  const handleDeleteNote = (note) => {
    const confirma = window.confirm("Deseja excluir essa nota?")

    if (confirma) {
      if (editingNote && editingNote.id === note.id) {
        setEditingNote(null)
      }
      deleteNotes([note.id])
    }
  }

  const sortedNotes = [...notes].sort((a, b) => {
    return new Date(b.lastEdited) - new Date(a.lastEdited)
  })

  const handleLogout = async () => {
    if (!window.confirm('Deseja desconectar da sua conta?')) {
      return
    }
    
    try {
      await logout()
      navigate("/")
    } catch (error) {
      console.error("Erro ao sair:", error);
      alert('Ocorreu um erro ao deslogar.')
    }
  }

  return (
    <div className="app-container">
      <Header
        onCreateNote={handleCreateNote}
        isSelecting={isSelecting}
        onCancelSelection={cancelSelection}
        onDeleteSelected={handleDeleteSelected}
        hasSelected={selectedNotes.length > 0}
        selectedCount={selectedNotes.length}
        logout={handleLogout}
      />

      <main className="notes-container">
        {editingNote ? (
          <NoteEditor
            note={editingNote}
            onSave={handleSaveNote}
            onDelete={handleDeleteNote}
            onClose={() => setEditingNote(null)}
          />
        ) : (
          <>
            {sortedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => handleNoteClick(note)}
                onLongPress={() => handleLongPress(note.id)}
                isSelected={selectedNotes.includes(note.id)}
                isSelecting={isSelecting}
              />
            ))}
          </>
        )}
      </main>
    </div>
  )
}

export default Home