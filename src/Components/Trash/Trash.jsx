import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import API from '../../api/axiosInstance'
import ShowNotes from '../Notes/ShowNotes'
import { useOutletContext } from 'react-router-dom'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function Trash() {
  const [trashNotes, setTrashNotes] = useState([])
  const userId = localStorage.getItem('userId') || "123"
  const { isGridView } = useOutletContext()

  const fetchTrashNotes = async () => {
    try {
      const res = await API.get(`/notes?userId=${userId}&onTrash=true`)
      setTrashNotes(res.data)
    } catch (err) { console.log(err) }
  }

  const handleRestore = async (id) => {
    try {
      await API.patch(`/notes/${id}`, { onTrash: false, archive: false })
      setTrashNotes(prev => prev.filter(note => note.id !== id))
    } catch (err) { console.log(err) }
  }

  const handleDeleteForever = async (id) => {
    try {
      await API.delete(`/notes/${id}`)
      setTrashNotes(prev => prev.filter(note => note.id !== id))
    } catch (err) { console.log(err) }
  }

  useEffect(() => {
    if (userId) fetchTrashNotes()
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 8, pr: 5, width: '100%',justifyContent:'center',position:'relative' }}>
      <Typography sx={{ mb: 3,mt:0, color: '#5f6368' }}>
            Notes in the Trash are deleted after 7 days.
          </Typography>
      {trashNotes.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 15, color: '#a5adb6' }}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: '120px' }} />
          <Typography variant="h5">No notes in Trash</Typography>
        </Box>
      ) : (
        <Box sx={{ width: '100%', maxWidth: '1000px' }}> 
          
          <ShowNotes
             notesList={trashNotes}
        isGridView={isGridView}
        onArchive={handleRestore}
        onTrash={handleDeleteForever}
        isArchivePage={true}
          />
        </Box>
      )}
    </Box>
  )
}