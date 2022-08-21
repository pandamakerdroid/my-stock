import { Box,
         Drawer,
         List,
         ListItem,
         ListItemButton,
         Toolbar,
         ListItemIcon,
         ListItemText,
        } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { fetchCompanyInfo, fetchQuote } from "@api/stockApi";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { 
	//read operations
  selectSymbol,
	selectInterval,
	selectRange,
	selectPeriod1,
	selectPeriod2,
  selectBrowseHistory,
  setSymbol,
} from '@store/slices/stockDataSlice';

import {setSearchText} from '@store/slices/uiSlice';
import TickerAutoComplete from '@partials/TickerAutoComplete';

const drawerWidth = 240;

function ListPanel() {
  const dispatch = useAppDispatch();

  const symbol= useAppSelector(selectSymbol)
  const interval = useAppSelector(selectInterval);
  const range = useAppSelector(selectRange);
  const period1 = useAppSelector(selectPeriod1);
  const period2 = useAppSelector(selectPeriod2);
  const browseHistory = useAppSelector(selectBrowseHistory);
  const {t} = useTranslation('translation');

  const handleClick = (e:any) => {
    const historySymbol = (e.target.id && e.target.id!='')?e.target.id:e.target.innerText
    if(historySymbol !== symbol){
      dispatch(setSearchText(historySymbol));
      dispatch(setSymbol(historySymbol));
      fetchQuote({symbol:historySymbol,
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
          <TickerAutoComplete/>
          <List>
            {browseHistory.map((text:string, index:number) => (
              <ListItem key={text} disablePadding>
                <ListItemButton id={text} onClick={handleClick}>
                  <ListItemIcon >
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