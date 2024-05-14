import React, { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import SideBar from './SideBar';
import { useSelector } from 'react-redux';
export default function ButtonAppBar() {
    const [open, setOpen] = useState(false);

    const HandleSideBar = () => {
        setOpen(!open)
    };

    const userData = useSelector((state)=> state.user.data)
    let existUser = userData.find((data)=> data.email == localStorage.getItem('email'))
    // console.log("userData",a)


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box>
                <AppBar style={{position:"relative"}}>
                    <Toolbar style={{  background:"#000",}}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{
                                mr: 2,
                                display: { md: 'none', sm:"block" }
                            }}
                        >
                            <MenuIcon onClick={HandleSideBar} />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Welcome {existUser?.name}!
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            
            <SideBar HandleSideBar={HandleSideBar} open={open} type={"upperSideBar"} />
        </Box>
    );
}