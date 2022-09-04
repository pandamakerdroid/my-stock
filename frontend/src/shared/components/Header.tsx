import { useState, MouseEvent } from 'react';
import { selectLocale, setLocale } from '@store/slices/languageSlice';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useTranslation } from 'react-i18next';
import { CN, SG } from 'country-flag-icons/react/3x2'
import { useAppSelector, useAppDispatch } from '@store/hooks';
import i18next from 'i18next';

import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  const pathname = window.location.pathname;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const {t} = useTranslation('translation');

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (e:MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
    Array.prototype.map.call(document.getElementsByClassName(styles.link),(element =>
      element.classList.remove(styles.active)))
    document.getElementById(e.target.id)?.classList.add(styles.active);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const locale = useAppSelector(selectLocale);
  const dispatch = useAppDispatch();

  const onClickHandler = (e:Event) => {
    const newLocale = (locale==='en'?'cn':'en');
    dispatch(setLocale(newLocale));
    i18next.changeLanguage(newLocale);
  }


  return (
    <AppBar position="fixed"
            sx={{ backgroundColor: '#181510' ,zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <QueryStatsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {t('nav.nav-items', { returnObjects: true }).map((item) => (
                <MenuItem key={item.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <QueryStatsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            My Stocks
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {t('nav.nav-items', { returnObjects: true }).map((item) => (
                <Link
                  id={item.name}
                  key={item.name}
                  onClick={handleClick}
                  className={`${styles.link} ${pathname.includes(item.href)? styles.active:''}`}
                  to={item.href}>
                    {item.name}
                </Link>
            ))}
          </Box>

          <Box 
            sx={{
              width: { xs: 40 },
              "& .MuiInputBase-root": {height: 80},
              m:{xs: 2},
              cursor:'pointer'}}
            onClick={onClickHandler}>
            {locale==='en'&&<SG title="Singapore" />}
            {locale==='cn'&&<CN title="China" />}

          </Box>
         

          {false && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {t('nav.menu-items',{returnObjects:true}).map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;