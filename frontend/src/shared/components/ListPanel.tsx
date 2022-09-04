import { Box,
         Divider,
         List,
         ListItem,
         ListItemButton,
         Toolbar,
         Typography
} from "@mui/material";

import MuiDrawer from '@mui/material/Drawer';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';

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
import { useState } from "react";
import styles from '@components/ListPanel.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { BorderAllRounded } from "@mui/icons-material";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function ListPanel() {
  const dispatch = useAppDispatch();


  const theme = useTheme();

  const symbol= useAppSelector(selectSymbol)
  const interval = useAppSelector(selectInterval);
  const range = useAppSelector(selectRange);
  const period1 = useAppSelector(selectPeriod1);
  const period2 = useAppSelector(selectPeriod2);
  const browseHistory = useAppSelector(selectBrowseHistory);
  const {t} = useTranslation('translation');

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerOpened = () => {
    setOpen(open?false:true);
  };

  const handleClick = (e:any) => {
    const historySymbol = (e.target.id && e.target.id!=='')?e.target.id:e.target.innerText
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
  const drawerContent =  (
    <>
        <Box sx={{mt:5, pt:2 }}>
          <TickerAutoComplete/>
          <Typography variant="body1" sx={{textTransform:'uppercase',fontSize:'0.7rem',fontWeight:500}} gutterBottom>
            {t('list-panel.browse-history')}
          </Typography>
          <Divider sx={{marginX:"1rem"}}/>
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
    </>
  )

    return <>
      <Drawer
        variant="permanent"
        open={open}
      >
        {open ?drawerContent:''}
        <DrawerHeader 
          id="list-panel-main-header"
          sx={{position:'absolute',
               top:'30%',
               right:'-1.7rem',
               float:'right',               
        }}>
          <IconButton onClick={handleDrawerOpened}
            sx={{
              fontSize:'2rem',
              background:'#6699ff44',
            }}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
      </Drawer>
    </>
}

export default ListPanel;