import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import AddNote from './AddNote'
import ShowNotes from './ShowNotes'
import API from '../../api/axiosInstance'

export default function NotesContainer() {
  const [notesList, setNotesList] = useState([])
  const { isGridView } = useOutletContext()
  const userId = localStorage.getItem('userId') || "123";
  const fetchNotes = async () => {
    try {
      const res = await API.get(`/notes?userId=${userId}&archive=false&onTrash=false`);
      console.log(res.data);
      setNotesList(res.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (userId)
      fetchNotes();
  }, []);


  const addNoteToList = async (note) => {
    try {
      const newNote = { ...note, userId, archive: false, onTrash: false };
      await API.post('/notes', newNote);
      fetchNotes();
    }
    catch (err) {
      console.log(err);
    }
  }
  const updateNoteColor = async (id, color) => {
    try {
      
      await API.patch(`/notes/${id}`, { color });
      fetchNotes();
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleArchive = async (id) => {
    try {
      await API.patch(`/notes/${id}`, { archive: true });
      fetchNotes(); 
    } catch (err) {
      console.log(err);
    }
  };
  const handleTrash = async (id) => {
    try {
      await API.patch(`/notes/${id}`, { onTrash: true, archive: false });
      fetchNotes(); 
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <Box sx={{ width: '100%', maxWidth: 600, mt: 8, mx: 'auto' }}>
        <AddNote onSave={addNoteToList} />
      </Box>
      <Box sx={{ width: '100%', maxWidth: 1200, mt: 4 }}>
        <ShowNotes notesList={notesList} isGridView={isGridView} onUpdateColor={updateNoteColor} onArchive={handleArchive} onTrash={handleTrash} isArchivePage={false} />
      </Box>
    </Box>
  )
}
