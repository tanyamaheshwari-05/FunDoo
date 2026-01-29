import React, { useState } from 'react'
import {
  Box,
  TextField,
  Paper,
  IconButton,
  ClickAwayListener
} from '@mui/material'

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import AllIcon from './AllIcon'

export default function AddNote({ onSave }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [note, setNote] = useState({
    title: '',
    description: '',
    color: '#fff',
    archive:false,
    onTrash:false
  })

  const handleSave = () => {
    if (!note.title.trim() && !note.description.trim()) {
      setIsExpanded(false)
      return
    }

    onSave(note)

    setNote({ title: '', description: '', color: '#fff', archive:false,onTrash:false })
    setIsExpanded(false)
  }

  // ================= COLLAPSED =================
  if (!isExpanded) {
    return (
      <Paper
        sx={{
          p:1,
          maxWidth: 600,
          width: '100%',
          cursor: 'text'
        }}
        onClick={() => setIsExpanded(true)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Take a note..."
            fullWidth
            variant="standard"
            InputProps={{ disableUnderline: true }}
          />

          <Box sx={{ display: 'flex', ml: 'auto' }}>
            <IconButton size="small"><CheckBoxOutlinedIcon /></IconButton>
            <IconButton size="small"><BrushOutlinedIcon /></IconButton>
            <IconButton size="small"><InsertPhotoOutlinedIcon /></IconButton>
          </Box>
        </Box>
      </Paper>
    )
  }

  //  EXPANDED
  return (
    <ClickAwayListener onClickAway={handleSave}>
      <Paper
        sx={{
          p: 1,
          maxWidth: 600,
          width: '100%',
          backgroundColor: note.color
        }}
      >
        <TextField
          placeholder="Title"
          fullWidth
          variant="standard"
          value={note.title}
          onChange={(e) =>
            setNote({ ...note, title: e.target.value })
          }
          InputProps={{ disableUnderline: true }}
        />

        <TextField
          placeholder="Take a note..."
          fullWidth
          multiline
          variant="standard"
          value={note.description}
          onChange={(e) =>
            setNote({ ...note, description: e.target.value })
          }
          InputProps={{ disableUnderline: true }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <AllIcon
            onColorSelect={(color) =>
              setNote(prev => ({ ...prev, color }))
            }
          />

          <Box
            sx={{ cursor: 'pointer', fontWeight: 500 }}
            onClick={handleSave}
          >
            Close
          </Box>
        </Box>
      </Paper>
    </ClickAwayListener>
  )
}
