import React from 'react';
import ButtonAppBar from "../component/Bar"
import SideBar from "../component/SideBar"
import { Box } from '@mui/material';

const style = {
  mainDiv:{
    display: "flex", width: "100%" 
  },
  childBox:{
    padding:"15px",margin:"15px", boxShadow:"rgb(136, 136, 136) 0px 0px 11px 2px", width:"100%",display:"flex", justifyContent:"center"
  }
}
const Layout = ({ children }) => {
  return (
    <>
      <ButtonAppBar />
      <Box style={style.mainDiv}>
        <Box style={{ width: { md: "15%", sm: "0%" }, display: { md: "block", sm: "none", xs: "none" } }}>
          <SideBar type={"leftSideBar"} />
        </Box>
        <Box sx={{ width: { md: "85%", sm: "100%", xs: "100%" },display:"flex" }}>
          <Box style={style.childBox}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
