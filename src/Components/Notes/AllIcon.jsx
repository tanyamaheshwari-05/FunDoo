import React, { useState } from 'react'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined'
import { IconButton, Box, Paper } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
// import { DeleteOutline } from '@mui/icons-material';
import { DeleteOutlineOutlined } from '@mui/icons-material';

export default function AllIcon({ onColorSelect, onArchiveClick, onTrashClick, isArchivePage = false }) {
  const [showPallette, setShowPallette] = useState(false);
  const colors = [
    { name: 'Default', hex: "#fff" }, { name: 'Coral', hex: "#faafa8" }, { name: 'Peach', hex: "#f39f76" }, { name: 'Sand', hex: "#fff8b8" }, { name: 'Mint', hex: "#e2f6d3" }, { name: 'Sage', hex: "#b4ddd3" }, { name: 'Fog', hex: "#d4e4ed" }, { name: 'Storm', hex: "#aeccdc" }, { name: 'Dusk', hex: "#d3bfdb" }, { name: 'Blossom', hex: "#e9e3d4" }, { name: 'Clay', hex: "#efeff1" }
  ]
  return (
    <Box sx={{ display: 'flex', gap: 1, position: 'relative' }}>
      <Tooltip title="Background options">
        <IconButton onClick={() => {
          {
            
            setShowPallette(!showPallette)
          }
        }} sx={{ '&:focus': { outline: 'none' } }}>
          <PaletteOutlinedIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      {showPallette && (
        <Paper sx={{ position: 'absolute', p: 2, zIndex: 100,top:'38px' }} >
          <Box sx={{ display: 'flex', gap: 1 }}>
            {colors.map((item) => (
              <Tooltip key={item.hex} title={item.name} >
                <Box
                  onClick={() => {
                    onColorSelect(item.hex)
                    setShowPallette(false)
                  }}
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    backgroundColor: item.hex,
                    cursor: 'pointer',
                    border: '1px solid #ccc'
                  }}
                >
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Paper>
      )}

      <Tooltip title="Remind me">
        <IconButton sx={{ '&:focus': { outline: 'none' } }}>
          <AddAlertOutlinedIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title="Collaborator">
        <IconButton sx={{ '&:focus': { outline: 'none' } }}>
          <PersonAddAltOutlinedIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add image">
        <IconButton sx={{ '&:focus': { outline: 'none' } }}>
          <PhotoOutlinedIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      {/* <Tooltip title="Archive">
         <IconButton  onClick={onArchiveClick} sx={{'&:focus':{outline:'none'}}}>
            <ArchiveOutlinedIcon fontSize='small'/>
        </IconButton>
        </Tooltip> */}

      <Tooltip title={isArchivePage ? "Unarchive" : "Archive"}>
        <IconButton onClick={onArchiveClick} sx={{ '&:focus': { outline: 'none' } }}>
          {isArchivePage ? (
            <UnarchiveOutlinedIcon fontSize="small" />
          ) : (
            <ArchiveOutlinedIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
      {/* <Tooltip title="Delete">
  <DeleteOutline 
    fontSize="small" 
    onClick={onTrashClick} 
    sx={{ cursor: 'pointer', ml: 1 }} 
  />
</Tooltip> */}
      {onTrashClick && (
        <Tooltip title="Delete">
          <IconButton onClick={onTrashClick} sx={{ '&:focus': { outline: 'none' } }}>
            <DeleteOutlineOutlined fontSize='small' />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="More">
        <IconButton sx={{ '&:focus': { outline: 'none' } }}>
          <MoreVertOutlinedIcon fontSize='small' />
        </IconButton>
      </Tooltip>


    </Box>
  )
}
