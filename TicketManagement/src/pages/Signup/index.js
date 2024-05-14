import React from 'react'
import { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Form, Formik, Field } from "formik";
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../Redux/Slice/Slice';
import { useNavigate } from 'react-router-dom';
import CustomField from '../../component/CustomField';
import * as yup from 'yup';
import { addEmail } from '../../Redux/Slice/userSlice';

function SignUp() {

    const storeData = useSelector((state) => state.user)
    console.log("store data==>", storeData)
    const dispatch = useDispatch();
    const navigate = useNavigate("");


    const initialValues = {
        name: "",
        email: "",
        Password: "",
        confirmPassword: "",
        role:"user"
    }
    const handleSubmit = (data, { resetForm }) => {
        console.log(data)
        dispatch(add(data));
        dispatch(addEmail({email: data.email, role: data.role}));
        navigate("/")
        resetForm();
    }

    const validationSchema = yup.object().shape({
        name:yup
        .string()
        .required("Please enter the name")
        .min(3,"enter minimum 8 characters"),
        email: yup
          .string()
          .required("Please enter email Password")
          .min(8, "Please enter at least 8 characters")
          .max(30, "You can enter only 30 characters")
          .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Enter a valid email Password"
          ),
        Password: yup
          .string()
          .required("Please enter password")
          .min(8, "Please enter at least 8 characters")
          .max(30, "You can enter only 30 characters")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/,
            "At least one alphabetic character, one number, and one symbol are required."
          ),
          confirmPassword: yup
          .string()
          .required("Please confirm password")
          .oneOf([yup.ref("Password"), null], "Passwords must match")
      });


    return (
        <Box className="Form">
            <Box className="FormContainer border">
                <Typography variant='h4'>Sign Up</Typography>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        touched,
                        values,
                        setFieldValue,
                    }) => (
                        <Form className='FormContainer'>
                            <CustomField name="name" value={values.name} label="Name" onChange={handleChange}  touched={touched} errors={errors} handleBlur={handleBlur} />
                            <CustomField name="email" value={values.email} label="Email" onChange={handleChange}  touched={touched} errors={errors} handleBlur={handleBlur} />
                            <CustomField name="Password" value={values.Password} label="Password" onChange={handleChange}  touched={touched} errors={errors} handleBlur={handleBlur} />
                            <CustomField name="confirmPassword" value={values.confirmPassword} label="Confirm Password" onChange={handleChange}  touched={touched} errors={errors} handleBlur={handleBlur} />
                            <Select name="role" value={values.role} onChange={(event) => setFieldValue('role', event.target.value)}>
                                <MenuItem value={"user"}>User</MenuItem>
                                <MenuItem value={"technical"}>Technical</MenuItem>
                            </Select>
                            <Button variant="contained" type='submit' >Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Typography variant='h6'>If you already have account, <span onClick={()=>navigate('/')} className='signuptext'>Login</span> here</Typography>
        </Box>
    )
}

export default SignUp