import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import './style.css'
import Logo from '@mui/icons-material/Fitbit';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCartSharp } from '@mui/icons-material'
import { Badge, styled } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { subTotlal } from '../../Store/Slice/CartSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Signup from '../Signup/Signup';
import { logout } from '../../Store/Slice/SignupSlice';
import { toast } from 'react-toastify';

const pages = ["Deals", "What's New", "Delivery", "Products", "Contact"];


function ResponsiveAppBar() {

  const navigate = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch()

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const CartBedge = useSelector((state) => state.CartSlice)
  const FavBedge = useSelector((state) => state.LikeSlice.likeItem)

  // -_-------------------------------- working --------------------------------
  const loggedIn = useSelector((state) => state.SignupSlice.loggedIn)
  const detail = useSelector((state) => state.SignupSlice.userDetail)

  console.log(detail);
  const handlemenuLogout = () => {

    if (loggedIn === true) {
      localStorage.setItem('loggedIn', false);
      dispatch(logout())
      toast.info(`Logged out successfully`)
      console.log("Logged header page ", loggedIn);

    }
    else {
      toast.error(`Login in First`)
    }

  }

  React.useEffect(() => {

  }, [loggedIn])


  // -_-------------------------------- working --------------------------------

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCart = () => {
    if (!loggedIn) {
      toast.error("You are not logged in")
    }
    else {
      navigate("/cart")
    }
  }
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => { setAnchorEl(event.currentTarget); };
  const handleMobileMenuClose = () => { setMobileMoreAnchorEl(null); };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleFavIcon = () => {

    if (!loggedIn) {
      toast.error("You are not logged in")
    }
    else {
      navigate("/likePage")
    }
  }

  const menuId = 'primary-search-account-menu';
  const ProfileName = localStorage.getItem("LogInDetail") ? JSON.parse(localStorage.getItem("LogInDetail")) : []
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>{`${ProfileName  ? ProfileName.firstName + " " + ProfileName.lastName : []}`}</MenuItem> */}
      <MenuItem onClick={handleMenuClose}>profile details </MenuItem>

      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handlemenuLogout}>Logout</MenuItem>
    </Menu>
  );

  React.useEffect(() => {
    dispatch(subTotlal())
  }, [CartBedge])

  return (

    <Box className="navbar">

      <AppBar
        position="static"
        sx={{ background: "#fcfffcddf", backgroundColor: "rgba(28, 53, 63, 0.8)", backdropFilter: "blur(100%)", width: '100vw' }}
        className="AppBar"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'rnospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link to={"/"} className="brand">
                FizzCart
                <Logo sx={{ fontSize: "30px", mr: 2 }} />
              </Link>
            </Typography>

            {/* Navigation menu for xs screen */}
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Brand logo and title for xs screen */}
            <Typography
              variant="h5"
              noWrap
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
              <Link to={"/"} className="brand">
                FizzCart
                <Logo sx={{ fontSize: "30px", mr: 2 }} />
              </Link>
            </Typography>


            {/* Navigation buttons for md and above screens */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                  component={NavLink}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}

            </Box>



            {/* -----------------------------Working ---------------------- */}

            <Button sx={{ background: "#b1cb96b3", marginLeft: "auto", display: loggedIn ? "none" : "block" }} variant="contained" onClick={() => navigate('/signup')}>
              Signup
            </Button>
            <Button sx={{ background: "#b1cb96b3", marginLeft: "10px", display: loggedIn ? "none" : "block" }} variant="contained" onClick={() => navigate('/login')}>
              Login
            </Button>


            <IconButton
              style={{ color: "white", marginLeft: "10px" }}
              onClick={() => handleCart()}
              disabled={CartBedge.length === 0}
              className={
                CartBedge.length === 0
                  ? "disabled-cart"
                  : location.pathname === "/cart"
                    ? "activee"
                    : "cart-icon"
              }
            >
              <Badge badgeContent={loggedIn ? CartBedge.cartTotalItemsCount : null} color="secondary">
                <ShoppingCartSharp />
              </Badge>
            </IconButton>
            <IconButton
              style={{ color: "white", marginLeft: "5px" }}
              className={location.pathname === "/likePage" ? "activee" : "cart-icon"}
              onClick={() => handleFavIcon()}

            >
              <Badge badgeContent={loggedIn ? FavBedge.length : null} color="secondary"  >
                <FavoriteIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{ color: "white", marginLeft: "5px" }}

            >
              <AccountCircleIcon />

            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMenu}
    </Box>


  );
}
export default ResponsiveAppBar;