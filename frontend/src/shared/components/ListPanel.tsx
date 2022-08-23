import { Box,
         Drawer,
         List,
         ListItem,
         ListItemButton,
         Toolbar,
         ListItemText,
        } from "@mui/material";
import { fetchQuote } from "@api/stockApi";
import { useTranslation } from "react-i18next";
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

import styles from '@components/ListPanel.module.scss'

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
            {browseHistory.map((history:any, index:number) => (
              <ListItem key={history.symbol} disablePadding>
                <ListItemButton id={history.symbol} onClick={handleClick}>
                  <div className={styles.list}>
                    <span className={styles.name}>{history.name}</span>
                    <span className={styles.ticker}> {history.symbol}</span>
                  </div>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
}

export default ListPanel;