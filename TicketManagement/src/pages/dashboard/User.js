import React from 'react'
import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material"
import { Form, Formik, Field, validateYupSchema } from "formik";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomField from '../../component/CustomField';
import * as yup from 'yup';
import { addTicket } from '../../Redux/Slice/userSlice';
import toast from 'react-hot-toast';

function UserDashboard() {
  const statusUser = useSelector((state) => state?.userrole)
  const storeData = useSelector((state) => state.userrole)
  const dispatch = useDispatch();
  const navigate = useNavigate("");

  console.log("current user,",storeData)

  const initialValues = {
    Ticket: "",
  }

  const validationSchema = yup.object().shape({
    Ticket: yup
      .string()
      .required("Please enter query")
      .min(8, "Please enter at least 8 characters")
      .max(30, "You can enter only 30 characters")
  });

  const handleSubmit = async (data, { resetForm }, event) => {
    dispatch(addTicket(data))
    toast.success("Ticket Generated")
    
    resetForm()
    console.log(data)
  }


  return (
    <Box className="">
      <Box className=" border" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Typography variant='h4'>Create Ticket</Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({
            errors,
            handleBlur,
            handleChange,
            touched,
            values,
          }) => (
            <Form className='FormContainer' style={{display:"flex"}}>
              <CustomField type='text' name="Ticket" value={values.Ticket} label="crate Ticket" onChange={handleChange} touched={touched} errors={errors} handleBlur={handleBlur} />
              <Button variant="contained" type='submit' >Submit</Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default UserDashboard