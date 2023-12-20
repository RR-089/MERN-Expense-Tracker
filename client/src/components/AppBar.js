import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/auth.js';

const hoverStyle = {
    '&:hover': {
        backgroundColor: 'rgb(0, 221, 255)',
        color: 'black',
        border: '1px solid white',
    },
};


export default function ButtonAppBar() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    function _logout(){
        Cookies.remove("token");
        dispatch(logout());
        navigate("/login");
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: 'black' }} >
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link
                        to="/"
                        className="text-white"
                        >
                            SpendWise
                        </Link>
                    </Typography>

                    
                    {
                        isAuthenticated &&(
                            <>
                                <Link to="/" className="text-white">
                                    <Button 
                                    color="inherit" 
                                    variant="outlined"
                                    sx={{ ...hoverStyle, marginRight: '1rem' }}>
                                        Expenses
                                    </Button>
                                </Link>
                                <Link to="/category" className="text-white">
                                    <Button 
                                    color="inherit" 
                                    variant="outlined"
                                    sx={{ ...hoverStyle, marginRight: '1rem' }}>
                                        Category
                                    </Button>
                                </Link>
                                <Button 
                                    color="inherit" 
                                    variant="outlined" 
                                    onClick={_logout}
                                    sx={{ ...hoverStyle, marginRight: '1rem' }}>
                                        Logout
                                </Button>
                            </>
                        )
                    }
                    {
                        !isAuthenticated &&(
                            <>
                                <Link to="/login" className="text-white">
                                    <Button 
                                    color="inherit" 
                                    variant="outlined"
                                    sx={{ ...hoverStyle, marginRight: '1rem' }} >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register" className="text-white">
                                    <Button 
                                    color="inherit" 
                                    variant="outlined"
                                    sx={{ ...hoverStyle, marginRight: '1rem' }}>
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
