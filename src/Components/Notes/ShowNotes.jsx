import React from 'react'
import { Paper, Typography, Box } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import AllIcon from './AllIcon'
// import { DeleteOutline } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';

export default function ShowNotes({ notesList, isGridView, onUpdateColor,onArchive,onTrash ,isArchivePage=false}) {
  if (!notesList.length) return null

  //  LIST VIEW 
  if (!isGridView) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          mt: 4,
              // minHeight:40,
          width: '100%',
          position: "relative",
          zIndex:100,
        }}
      >
        {notesList.map(note => (
          <Paper
  key={note.id}
  sx={{
    backgroundColor: note.color || '#fff',
    p: 2,
    ml:3,
    borderRadius: 2,
    border: '1px solid #e0e0e0',
    width: '625px',
    maxWidth: 650,
    boxSizing: 'border-box',
    overflow: 'hidden',
    wordBreak: 'break-word',
    
    '&:hover': {
      boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
      '& .actions': { opacity: 1 }
    }
  }}
>
            {note.title && (
              <Typography fontWeight={600} mb={1} sx={{whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',display:'flex',alignItems:'flex-start'}}>
                {note.title}
              </Typography>
            )}

            <Typography sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word',
  overflowWrap: 'anywhere',display:'flex',alignItems:'flex-start' }}>
              {note.description}
            </Typography>

            <Box className="actions"sx={{pt: 2,
    minHeight: 36,
    opacity: 0,
    // width: '100%',
    // maxWidth: '100%',
    position:'relative',
    zIndex:11,
    overflow: 'visible',
    display: 'flex',
    justifyContent: 'flex-start' }}>
              <AllIcon
                onColorSelect={(color) =>
                 
                  {onUpdateColor(note.id, color) 

                     console.log(note.id, color, "list")
                  }
                }
                
                onArchiveClick={() => onArchive(note.id)}
                onTrashClick={() => onTrash(note.id)}
                 isArchivePage={isArchivePage}
              />
             
            </Box>
          </Paper>
        ))}
      </Box>
    )
  }

  //GRID VIEW 
  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
      {notesList.map(note => (
        <Paper
          key={note.id}
          sx={{
            backgroundColor: note.color || '#fff',
    p: 2,
    borderRadius: 2,
    border: '1px solid #e0e0e0',

    width: 'fit-content',
    maxWidth: 600,

    boxSizing: 'border-box',
    overflow: 'visible',

    '&:hover .actions': { opacity: 1 }
          }}
        >
          {note.title && (
            <Typography fontWeight={600} mb={1} sx={{whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',display:'flex',alignItems:'center'}}>
              {note.title}
            </Typography>
          )}

          <Typography sx={{ whiteSpace: 'pre-wrap', fontSize: 14, wordBreak: 'break-word',
  overflowWrap: 'anywhere' ,display:'flex',alignItems:'flex-start'}}>
            {note.description}
          </Typography>

          <Box className="actions" sx={{pt: 2,
    // minHeight: 36,
     position: 'relative',
  zIndex: 1300,
    opacity: 0,
    width: '100%',
    maxWidth: '100%',
    // overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-start' }}>
            <AllIcon sx={{}}
              onColorSelect={(color) =>
                    
                  {onUpdateColor(note.id, color) 

                     console.log(note.id, color, "list")
                  }
              }
              onArchiveClick={() => onArchive(note.id)}
              onTrashClick={() => onTrash(note.id)}
               isArchivePage={isArchivePage}
            />
            
          </Box>
        </Paper>
      ))}
    </Masonry>
  )
}
