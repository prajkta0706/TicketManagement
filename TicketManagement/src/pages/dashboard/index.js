// import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { Padding } from '@mui/icons-material'
// import { logOutUser } from '../../Redux/Slice/Slice'
// import { useNavigate } from 'react-router-dom'
// const api = "https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/profile"

// function Dashbard() {
//     const existUser = useSelector((state) => state?.user?.userExists)
//     console.log("existUser",existUser)
//     const navigate = useNavigate()
//     useEffect(() => {
//         if (existUser) {
//             navigate("/Dashboard")
//         }else{
//             navigate("/")
//         }
//     }, [existUser])


//     const dispatch = useDispatch();
//     // const storeData = useSelector((state) => state.user.data)
//     // console.log("store data dashboard ==>", storeData)
//     const [allData, setAllData] = useState([])
//     const [page, setPage] = useState(1)
//     // const getAllData = async () => {
//     //     try {
//     //         const res = await axios({
//     //             method: "post",
//     //             url: api,
//     //             headers: {
//     //                 'Accept': '*/*'
//     //             },
//     //             data: {
//     //                 "count": 150,
//     //                 "country_code": "en_IN",
//     //                 "aadhar": true,
//     //                 "dl": true,
//     //                 "credit": true,
//     //                 "debit": true,
//     //                 "pan": true,
//     //                 "passport": true,
//     //                 "ssn": false
//     //             }
//     //         });
//     //         console.log("response ==> ", res.data);
//     //         var startIndex = (page - 1) * 10;
//     //         var endIndex = startIndex + 10;
//     //         setAllData(res?.data?.data?.slice(startIndex, endIndex))
//     //     } catch (error) {
//     //         console.log("error ==> ", error);
//     //     }
//     // };


//     // console.log('my data ==>', allData)
//     // useEffect(() => {
//     //     getAllData()
//     // }, [])
//     // useEffect(() => {
//     //     getAllData()
//     // }, [page])

//     // const PagginationData = (...arg) => {
//     //     if (arg == "next") {
//     //         setPage(page + 1)
//     //     }
//     //     else if (arg == "back") {
//     //         setPage(page - 1)
//     //     }
//     //     else {
//     //         console.log("nothing")
//     //     }
//     // }


//     return (
//         <div >
//             <>asdkjasdkjabsd</>
//             {/* <Grid container xs={12} style={{ margin: "0 auto" }}>
//                 {
//                     allData.map((item, index) => (
//                         <Grid item xs={12} sm={6} md={6} lg={4} >
//                             <Box className="eachGridItem" >
//                                 <h3>Name : {item?.first_name} {item?.last_name}</h3>
//                                 <h6>Address : {item?.address}</h6>
//                                 <h6>Nationality : {item?.nationality}</h6>
//                                 <h6>sex : {item?.sex}</h6>
//                                 <h6>Adhar Number : {item?.aadhar}</h6>
//                             </Box>
//                         </Grid>
//                     ))
//                 }
//             </Grid>
//             <Box className="PagginationBtn">
//                 <Button variant="contained" onClick={() => PagginationData("next")}> Next</Button>
//                 <Button variant="contained" onClick={() => PagginationData("back")}> Back</Button>
//                 <Button variant="contained" onClick={() => dispatch(logOutUser())}> Logout</Button>
//             </Box> */}
//         </div>
//     )
// }

// export default Dashbard
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
  useEffect(() => {
    console.log("exist ", exist)
    // console.log("is condition apply", !exist?.status, !exist?.Password == dataProps?.Password, !exist?.email == dataProps?.email)
    if (!exist?.status || !exist?.email == localStorage.getItem('email') || !exist?.email == undefined) {
      navigate("/")
    }
  }, [])
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