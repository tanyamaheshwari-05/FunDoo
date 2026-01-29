import React, { useEffect, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import API from '../../api/axiosInstance'
import ShowNotes from '../Notes/ShowNotes'
// import IconButton from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

export default function Archive() {
  const [archivedNotes, setArchivedNotes] = useState([])
  const userId = localStorage.getItem('userId')||"123"
  const {isGridView}=useOutletContext();
  //  Fetch archived notes
  const fetchArchivedNotes = async () => {
    try {
      const res = await API.get(
        `/notes?userId=${userId}&archive=true`
      )
      console.log("Responses:",res.data)
      setArchivedNotes(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (userId) fetchArchivedNotes()
  }, [])

  //  Unarchive note
  const handleUnarchive = async (id) => {
    try {
      await API.patch(`/notes/${id}`, { archive: false })
      setArchivedNotes(prev =>
        prev.filter(note => note.id !== id)
      )
    } catch (err) {
      console.log(err)
    }
  }

  const handleTrash = async (id) => {
  try {
    await API.patch(`/notes/${id}`, {
      isTrash: true,
      archive: false
    })
    setArchivedNotes(prev =>
      prev.filter(note => note.id !== id)
    )
  } catch (err) {
    console.log(err)
  }
}

  return (
    <Box sx={{ mt: 10, px: 4, width: '100%' }}>
      {/* <Typography sx={{ mb: 3, ml: 5, color: '#5f6368' }}>
        Archived Notes
      </Typography> */}

      {archivedNotes.length === 0 ? (
        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',mt:8}}>
        <IconButton  sx={{'&:focus':{outline:'none'},'&:hover':{background:'none'}}}>
          <ArchiveOutlinedIcon sx={{opacity:0.2,display:'flex',justifyContent:'center',mt:6,fontSize:'6rem'}}/></IconButton>

        <Typography sx={{ textAlign: 'center', mt:1, color: 'gray' ,fontSize:'1.5rem'}}>
         Your achive notes appear here
        </Typography>
        </Box>
      ) : (
        <ShowNotes
          notesList={archivedNotes}
          isGridView={isGridView}
          onArchive={handleUnarchive}
          onTrash={handleTrash}
          isArchivePage={true}   
        />
      )}
    </Box>
  )
}
