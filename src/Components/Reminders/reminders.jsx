import React from 'react'
import { Box, IconButton, Typography } from '@mui/material';
import AddNote from '../Notes/AddNote';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
export default function Reminders() {
  return (
    <Box>
    <Box  elevation={4} sx={{mt:6,ml:27,position:'relative'}}>
      <AddNote/>
      </Box>
    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',mt:8}}>
        <IconButton  sx={{'&:focus':{outline:'none'},'&:hover':{background:'none'}}}>
          <NotificationsNoneIcon sx={{opacity:0.2,display:'flex',justifyContent:'center',mt:6,fontSize:'120px'}}/></IconButton>

        <Typography sx={{ textAlign: 'center', mt:1, color: 'gray' ,fontSize:'1.5rem'}}>
        Notes with upcoming reminders appear here.
        </Typography>
        </Box>
        </Box>
  )
}
