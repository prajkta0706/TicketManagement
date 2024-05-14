import { FormHelperText, TextField } from '@mui/material'
import { Field } from 'formik'
import React from 'react'

function CustomField({ name, value, onChange, label, type = "text",touched,errors ,handleBlur}) {
    return (<>
        <Field className="field" type={type} as={TextField} id="outlined-basic" name={name} value={value} label={label} onChange={onChange} variant="outlined" onBlur={handleBlur} error={touched[name] && !!errors[name]} helperText={touched[name] && errors[name]}  />
    </>
    )
}

export default CustomField