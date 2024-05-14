import React from 'react'
import { useEffect } from 'react';
import { Box, Button, Typography } from "@mui/material"
import { Form, Formik } from "formik";
import { useSelector, useDispatch } from 'react-redux';
import { checkLogin } from '../../Redux/Slice/Slice';
import { useNavigate } from 'react-router-dom';
import CustomField from '../../component/CustomField';
import * as yup from 'yup';
function Login() {
  const statusUser = useSelector((state) => state?.user)
  const userDetails = useSelector((state) => state?.userrole)
  console.log("userDetails", userDetails)
  const storeData = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate("");


  useEffect(() => {
    console.log("statusUser", statusUser)
  }, [statusUser])

  const initialValues = {
    email: "",
    Password: ""
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter email address")
      .min(3, "Please enter at least 8 characters")
      .max(30, "You can enter only 30 characters")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter a valid email address"
      ),
    Password: yup
      .string()
      .required("Please enter password")
      .min(8, "Please enter at least 8 characters")
      .max(30, "You can enter only 30 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/,
        "At least one alphabetic character, one number, and one symbol are required."
      )
  });



  const handleSubmit = async (data, { resetForm }) => {
    console.log(data)
    localStorage.setItem("email", data.email)
    localStorage.setItem("Password", data.Password)
    let a = dispatch(checkLogin(data))
      navigate("/Dashboard", { state: { email: data.email, Password: data.Password } })
  }
  return (
    <Box className="Form">
      <Box className="FormContainer border">
        <Typography variant='h4'>Login</Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({
            errors,
            handleBlur,
            handleChange,
            touched,
            values,
          }) => (
            <Form className='FormContainer'>
              <CustomField type='text' name="email" value={values.email} label="email" onChange={handleChange} touched={touched} errors={errors} handleBlur={handleBlur} />
              <CustomField type='passord' name="Password" value={values.Password} label="Password" onChange={handleChange} touched={touched} errors={errors} handleBlur={handleBlur} />
              <Button variant="contained" type='submit' >Submit</Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Typography variant='h6'>If you dont have account please <span onClick={() => navigate('/signup')} className='signuptext'>Sign Up</span></Typography>
    </Box>
  )
}

export default Login