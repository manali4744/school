// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// // import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// // import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import { useNavigate } from 'react-router-dom';


// function ResponsiveAppBar({ isLoggedIn }) {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   // const handleOpenUserMenu = (event) => {
//   //   setAnchorElUser(event.currentTarget);
//   // };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };
//   const navigate = useNavigate();
  
//   const gotologin = () =>{
//     navigate('/login')
//   };

//   const gotoblog = () => {
//     navigate('/blog')
//   };
//   const gotoresult = () => {
//     navigate('/information')
//   };

//   const gotoevent = () => {
//     navigate('/event')
//   };

//   const handleMenuItemClick = (page) => {
//     let message = '';

//     switch (page) {
//       case 'Events':
//         message = 'eee';
//         gotoevent();
//         break;
//       case 'Result':
//         gotoresult();
//         break;
//       case 'Blog':
//         message = 'bbb';
//         gotoblog();
//         break;
//       case 'Login':
//         message = 'Login'
//         gotologin();
//         break;
//       default:
//         message = 'Unknown Page';
//     }

//     console.log(message);
//     handleCloseNavMenu();
//   };

//   // const handleCloseUserMenu = () => {
//   //   setAnchorElUser(null);
//   // };

//   return (
//     <AppBar position="static" style={{ backgroundColor: 'rgb(45, 156, 168)', opacity: '0.5'}}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             School
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar-nav"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar-nav"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {['Events', 'Result', 'Blog', 'Login'].map((page) => (
//                 <MenuItem key={page} onClick={() => handleMenuItemClick(page)}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             School
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {['Events', 'Result', 'Blog', 'Login'].map((page) => (
//               <Button
//                 key={page}
//                 onClick={() => handleMenuItemClick(page)}
//                 sx={{ my: 2, color: 'white', display: 'block', fontWeight:700 }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           {/* <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar-user"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {['Profile', 'Account', 'Dashboard', 'Logout'].map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box> */}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default ResponsiveAppBar;
