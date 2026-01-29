import React from 'react';
import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import { Close, Add, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Popup = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ width: 350,p:3, bgcolor: '#f0f4f9', textAlign: 'center', position: 'relative'}}>
      
      <IconButton size="small" sx={{ position: 'absolute',right:12, top: 12 }}>
        <Close fontSize="small" />
      </IconButton>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#b91d56', fontSize: 32 }}>T</Avatar>
          
        </Box>
      </Box>

      <Typography variant="h6" fontWeight={400}>Hi, Tanya!</Typography>
      
      <Button variant='outlined'  sx={{ my: 2, borderRadius: 10, textTransform: 'none',color:'black', borderColor: 'black', px: 3,'&:focus':{outline:'none'},'&:hover': {
      backgroundColor: 'transparent', 
      borderColor: 'black',          
    } }}>
        xyz123@gmail.com
      </Button>

      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Button 
          fullWidth 
          startIcon={<Add />}
          onClick={() => navigate('/signup')} 
          sx={{ bgcolor: 'white', color: 'black', p: 2, textTransform: 'none', borderRadius: '24px 4px 4px 24px','&:focus':{outline:'none'}, '&:hover': { bgcolor: '#e8eaed' } }}
        >
          Add account
          
        </Button>
        <Button 
          fullWidth 
          startIcon={<Logout />} 
          onClick={() => navigate('/signin')}
          sx={{ bgcolor: 'white', color: 'black', p: 2, textTransform: 'none', borderRadius: '4px 24px 24px 4px', '&:focus':{outline:'none'},'&:hover': { bgcolor: '#e8eaed' } }}
        >
          Sign out
        </Button>
      </Box>
    </Box>
  );
};

export default Popup;