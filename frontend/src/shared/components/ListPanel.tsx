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
import { FetchPriceHistory } from "../../api/stockApi";
import { useTranslation } from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
	//read operations
	selectInterval,
	selectRange,
	selectPeriod1,
	selectPeriod2
} from '../../store/slices/stockDataSlice';

const drawerWidth = 240;

function ListPanel() {
  const dispatch = useAppDispatch();

  const interval = useAppSelector(selectInterval);
  const range = useAppSelector(selectRange);
  const period1 = useAppSelector(selectPeriod1);
  const period2 = useAppSelector(selectPeriod2);

  const {t} = useTranslation('translation');
  const [searchText, setSearchText]= useState(null);
  const handleOnKeyUp = (e: any) => {
    if(e.key === 'Enter' && e.target.value && e.target.value!=='') { 
      setSearchText(e.target.value);
      FetchPriceHistory({symbol:e.target.value,
                         interval:interval,
                         period1:period1,
                         period2:period2,
                         range:range,
                         dispatch:dispatch})
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