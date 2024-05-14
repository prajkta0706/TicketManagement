import React, { useEffect } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GridViewIcon from '@mui/icons-material/GridView';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import "../styles/sidebar.css"
import LogoutIcon from '@mui/icons-material/Logout';
export default function SideBar({ HandleSideBar, open, type }) {

    const navigate = useNavigate()
    function Logout (){
        localStorage.removeItem("email")
        localStorage.removeItem("Password")
        console.log("Logging out...");
        localStorage.removeItem("email");
        console.log("Email removed from localStorage");
    }
    const sideBarData = [
        { name: 'Dashboard', url: "/dashboard", icon: <GridViewIcon /> },
        { name: 'All Tickets', url: "/alltickets", icon: <GridViewIcon /> },
        { name: 'LogOut', url: "/", icon: <LogoutIcon />  },
    ];

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {sideBarData.map((item) => (
                    <NavLink to={item.url} className="navLinkCss">
                        <ListItem key={item.name} disablePadding onClick={() => navigate(item.url)} >
                            <ListItemButton>
                                <ListItemIcon className='navIcons'>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} onClick ={ Logout} />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                ))}
            </List>
        </Box>
    );
    return (
        <>
            {
                type === "upperSideBar" && (
                    <Drawer open={open} onClose={HandleSideBar}>
                        {DrawerList}
                    </Drawer>
                )
            }
            {
                type === "leftSideBar" && (
                    <Box
                        sx={{
                            display: { md: 'block', sm: "none", xs: "none" },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "250px" },
                            zIndex: "100", height: "calc(100vh - 64px)", boxShadow:"5px 0 9px 0px #888",background:"black",color:"#fff"
                        }}
                    >
                        {DrawerList}
                    </Box>
                )
            }

        </>
    );
}