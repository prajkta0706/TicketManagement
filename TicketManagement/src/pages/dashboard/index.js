import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import UserDashboard from './User';
import Layout from '../../layout/DashboardLayout';
import Technical from "./Technical"
import { Grid } from '@mui/material';

const style = {
  fontWeight1: {
    fontWeight: "800"
  },
  fontWeight2: {
    fontWeight: "400"
  }
}
function Dashbard() {
  const location = useLocation();
  const navigate = useNavigate()
  const userExist = useSelector((state) => state?.user?.data)
  console.log("userExist data in the dashboard", userExist)
  let exist = userExist.find((data) => data?.email == localStorage.getItem('email'))
  // useEffect(() => {
  //   console.log("exist ", exist)
  //   // console.log("is condition apply", !exist?.status, !exist?.Password == dataProps?.Password, !exist?.email == dataProps?.email)
  //   if (!exist?.status || !exist?.email == localStorage.getItem('email') || !exist?.email == undefined || !exist?.Password == localStorage.getItem('Password') || !exist?.Password == undefined) {
  //     navigate("/")
  //   }
  // }, [])
  useEffect(() => {
    console.log("exist ", exist);
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('Password');
    
    if (!exist || exist.email !== storedEmail || exist.Password !== storedPassword) {
      navigate("/");
    }
  }, []);
  
  // console.log("data on the dashboard", userExist)


  const userRoleData = useSelector((state) => state)
  console.log("data in the useslice ", userRoleData)
  return (
    <Layout>
      <div>
        Your Role is :- {exist?.role}
        {exist?.role === "user" ? <UserDashboard /> : exist?.role === "technical" ? <Technical /> : <>Admin  </>}
        {/* <hr style={{height:"5px", background:"black"}}/> */}
        {exist?.role === "admin" && (
          <>
            <h1 >List of all the Users</h1>
            <hr style={{ height: "5px", background: "black", marginBottom: "20px" }} />
            <Grid container spacing={1}>
              {userRoleData?.user?.data?.map((data, index) => (
                <Grid item xs={6}>
                  <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", border: "2px solid red", padding: "10px" }}>
                    <h1 style={style.fontWeight1}>Name: <span style={style.fontWeight2}>{data.name}</span></h1>
                    <h1 style={style.fontWeight1}>Email:<span style={style.fontWeight2}> {data.email}</span></h1>
                    <h1 style={style.fontWeight1}>Role: <span style={style.fontWeight2}>{data.role}</span></h1>
                  </div>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Dashbard