import { NavLink, useLocation } from "react-router-dom";
import {
  Box, Drawer, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Toolbar
} from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";


const menuItems = [
  { text: 'Notes', icon: LightbulbOutlinedIcon , path: '/home' },
  { text: 'Reminders', icon: NotificationsNoneOutlinedIcon , path: '/reminders' },
  { text: 'Edit-labels', icon: EditOutlinedIcon  },
  { text: 'Archive', icon: ArchiveOutlinedIcon , path: '/archive' },
  { text: 'Trash', icon: DeleteOutlinedIcon , path: '/trash' }
];

export default function MiniDrawer({ open }) {
  const drawerWidth = open ? 300 : 48;
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: { xs: 100, md: drawerWidth },
        "& .MuiDrawer-paper": {
          width: { xs: 100, md: drawerWidth },
          border: "none",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          // console.log(isActive,location.pathname , item.path);

          return (
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                height: '48px',
                overflow: "hidden",
                backgroundColor: (isActive && open) ? "#feefc3" : "transparent",
                borderRadius: open ? '0 25px 25px 0' : '50%',
              }}
            >
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  color: "inherit",
                  borderTopRightRadius: "60px",
                  borderBottomRightRadius: "60px",
                  height: '100%',
                  pl: 1.9,
                  bgcolor: (isActive && !open) ? "#feefc3" : "transparent",
                }}
              >
                <ListItemIcon
                  sx={{
                  alignItems:"center",
                  }
                  }>
                  <item.icon />
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  sx={{
                    display: open ? { xs: "block", md: "block" } : "none",
                    m: 0, p: 0
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}