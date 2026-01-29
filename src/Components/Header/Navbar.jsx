import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewStreamOutlinedIcon from '@mui/icons-material/ViewStreamOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import SideNavigation from '../SideNavigation/SideNavigation';
import Tooltip from '@mui/material/Tooltip';
import { Avatar, Popover } from '@mui/material';
import Popup from './Popup';
import { useLocation } from 'react-router-dom';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
// import NotesContainer from '../Notes/NotesContainer';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 8,
  backgroundColor: alpha(theme.palette.common.black, 0.07),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.07),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth:`750px`,
  display:`flex`,
  alignItems:`center`,
  height:`48px`,
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    marginLeft:theme.spacing(6),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
     backgroundColor: 'transparent',   

    '&:focus': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar({handleDrawerToggle, isGridView, setIsGridView}) {
  const location = useLocation();
  const [anchorEl, setAnchorEl] =useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const getHeaderTitle = () => {
    const path = location.pathname;
    if (path.includes('reminders')) return 'Reminders';
    if (path.includes('archive')) return 'Archived';
    if (path.includes('trash')) return 'Trash';
    if (path.includes('labels')) return 'Edit labels';
    return 'Keep'; 
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Popover
        id={menuId}
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Popup/>
      </Popover>
    
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <IconButton size="small" sx={{ p: 1, color: "inherit" }}>
  <RefreshIcon />
</IconButton>
      </MenuItem>
      <MenuItem>
      <IconButton size="small"  color="inherit">
        
        </IconButton>
      </MenuItem> 
      <MenuItem>
      <IconButton size="small"  color="inherit" >
          
        </IconButton>
      </MenuItem>
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    // <Box sx={{ flexGrow: 1 ,width:`100%`}}>
      <AppBar 
      position="fixed"
      elevation={0}
      sx={{ 
        width: '100%', 
        top: 0,         
        left: 0,   
        backgroundColor: '#fff', 
        color: '#5f6368', 
        borderBottom: '1px solid #e0e0e0',
        zIndex:(theme)=>theme.zIndex.drawer+1
      }}>
        <Toolbar sx={{minHeight:'64 !important', height: '64px'}}>
           <Tooltip title="Main menu">
          <IconButton
          onClick={handleDrawerToggle}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 0.8,'&:focus':{outline:'none'},borderRadius:'50%',width: 40, height: 40}}
            
          >

            <MenuIcon/>
          </IconButton>
        </Tooltip>
         <Tooltip title="Keep">
          <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt="keep"
  style={{ height: 39,width:38, marginRight: 6 ,marginLeft:0.8}}/>
  </Tooltip>
  
  <Typography variant="h6" sx={{ fontSize: 22, fontWeight: 400, color: `#5f6368`, minWidth: 100,display:'flex',alignItems:'left'}}>
            {getHeaderTitle()}
          </Typography>
          <Search>
           
            <Tooltip title="Search">
                 <IconButton sx={{width: 40, height: 40}}>
                    
              <SearchIcon />
             
               </IconButton>
               </Tooltip>
              
           
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
             <Tooltip title="Refresh">
            <IconButton size="large" color="inherit" sx={{'&:focus': { outline: 'none' },borderRadius:'50%',width: 40, height: 40,marginTop:1.2}}>
    <RefreshIcon />
  </IconButton>
  </Tooltip>
   <Tooltip title={isGridView ? "List view" : "Grid view"}>
  <IconButton size="medium" color="inherit" onClick={() => setIsGridView(!isGridView)} sx={{'&:focus': { outline: 'none' },borderRadius:'50%',width: 40, height: 40,marginTop:1.2}}>
    {isGridView ? <ViewStreamOutlinedIcon /> : <GridViewOutlinedIcon />}
  </IconButton>
  </Tooltip>
   <Tooltip title="Settings">
  <IconButton size="medium" color="inherit" sx={{'&:focus': { outline: 'none' },borderRadius:'50%',width: 40, height: 40,marginTop:1.2}}>
    <SettingsOutlinedIcon/>
  </IconButton>
  </Tooltip>
   <Tooltip title="Google apps">
  <IconButton size="medium" color="inherit" sx={{ ml: 6 ,'&:focus':{outline:'none'},borderRadius:'50%',width: 40, height: 40,marginTop:1.2}}>
    <AppsIcon/>
    
  </IconButton>
  </Tooltip>
   <Tooltip title="Google Account">
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{'&:focus':{outline:'none'}}}
            >
              {/* <AccountCircle /> */}
              <Avatar sx={{width:30,height:30,background:"orange"}}>T</Avatar>
            </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        {renderMobileMenu}
       {renderMenu}
      </AppBar>
      
    // </Box>
  );
}
