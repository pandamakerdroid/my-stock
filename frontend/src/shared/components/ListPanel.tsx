import { Box,
         InputAdornment,
         Drawer,
         List,
         ListItem,
         ListItemButton,
         Toolbar,
         ListItemIcon,
         ListItemText,
         Divider,
         TextField
        } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { getData } from "@utils/data";
import { useTranslation } from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

const drawerWidth = 240;

function ListPanel() {
  const {t} = useTranslation('translation');
  const [searchText, setSearchText]= useState(null);
  const handleOnKeyUp = (e: any) => {
    if(e.key === 'Enter') { 
      setSearchText(e.target.value);
      getData({symbol:searchText})
     }
  }
    return <>
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <TextField
            id="filled-search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            type="search"
            variant="filled"
            sx={{mt:3}}
            onKeyUp={handleOnKeyUp}
            />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
}

export default ListPanel;