import React, { useState } from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from 'react-router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const pages = [{ name: 'Inquiry', url: '/list' }, { name: 'Feedback', url: '/feedback' }];

function ResponsiveAppBar() {
    const [isOpenModel, setIsOpenModel] = useState(false);

    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: "#555555" }}  >
            <Container maxWidth="xl">
                <div className='row py-2'>
                    <div className="col"> <img class="logo" style={{ width: 180, margin: 0, paddingTop: 0, cursor: "pointer" }} src={require('./assets/images/logo.png')} alt="" /> </div>
                    <div className="col d-flex justify-content-end align-items-center" >
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page?.name}
                                    onClick={() => { navigate(page?.url) }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page?.name}
                                </Button>
                            ))}
                        </Box>
                        <div onClick={() => {
                            setIsOpenModel(true);
                        }}>
                            Logout</div>
                    </div>

                </div>

                <div style={{ margin: "auto", background: "rgb(0,0,0,.6)" }} className={`modal ${isOpenModel ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content p-2">
                            <div className="modal-body py-0 text-center pt-4">
                                <h4 className='mb-4' style={{ color: 'black' }}>Are you sure want to logout?</h4>
                            </div>
                            <div className="modal-footer " style={{ display: "flex", justifyContent: "center" }}>
                                <button onClick={() => setIsOpenModel(false)} type="button" className="btn btn-secondary" >
                                    No
                                </button>
                                <button onClick={() => {
                                    setIsOpenModel(false);
                                    localStorage?.removeItem('Token');
                                    localStorage?.removeItem('User');
                                    navigate("/")
                                    window.location.reload();
                                }} type="button" className="btn btn-primary" >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;