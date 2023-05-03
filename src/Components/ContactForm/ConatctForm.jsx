import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { Autocomplete } from '@mui/material';
import { toast } from 'react-toastify';


const cities = [
    {
        value: 'New York',
        label: 'New York',
    },
    {
        value: 'Los Angeles',
        label: 'Los Angeles',
    },
    {
        value: 'Chicago',
        label: 'Chicago',
    },
    {
        value: 'Houston',
        label: 'Houston',
    },
    {
        value: 'Philadelphia',
        label: 'Philadelphia',
    },
];
const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Enter valid email address')
        .required('Email is required'),
    name: yup
        .string('Enter your name')
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
        .required('Name is required'),
    Phone_no: yup
        .string('Enter your phone number')
        .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Enter a valid phone number')
        .required('Phone number is required'),
    city: yup
        .string('Select your city')
        .required('City is required'),
});

const ConatctForm = () => {

    const [validated, setValid] = useState(false)

  

    const { handleBlur, handleChange, handleSubmit, values, touched, errors, setFieldValue } = useFormik({
        initialValues: {
            name: "",
            email: '',
            Phone_no: '',
            city: ""
        },
        validationSchema: validationSchema,

        onSubmit: async (values, { resetForm }) => {
            setValid(true)
            resetForm();
            setTimeout(() => {
                setValid(false);
            }, 1000);
            setFieldValue('city', '');
            toast.info("Submit successfull");
            try {
                const response = await fetch('https://formspree.io/f/xbjezeql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                if (!response.ok) {
                    throw new Error('Failed to submit form');
                }
                setValid(true);
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <div>
            <form onSubmit={handleSubmit}
            style = {{padding : '20px'}}

            >
                {/* Name */}
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    style={{ marginBottom: "20px" }}
                />
                {/* Email */}
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    style={{ marginBottom: "20px" }}
                />
                {/* Phonenumber */}
                <TextField
                    fullWidth
                    id="Phonenumber"
                    name="Phone_no"
                    label="Phone no."
                    value={values.Phone_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.Phone_no && Boolean(errors.Phone_no)}
                    helperText={touched.Phone_no && errors.Phone_no}
                    style={{ marginBottom: "20px" }}
                />

                {/* City */}
                <Autocomplete
                    id="city"
                    name="city"
                    options={cities}
                    getOptionLabel={(cities) => cities.label}
                    renderInput={(params) => (
                        <TextField {...params} label="City" variant="outlined" error={touched.city && Boolean(errors.city)}  />
                    )}
                    onChange={(event, newValue) => {
                        console.log(newValue);
                        setFieldValue('city', newValue ? newValue.label : '');
                    }}
                    style={{ width: '40%' }}
                />

                {touched.city && errors.city && (
                    <div style={{ color: 'red', marginBottom: '20px' }}>{errors.city}</div>
                )}

                <Button color="primary" variant="contained"  type="submit"style={{ marginTop: "20px" }} >
                    Submit
                </Button>

                
            </form>
        </div>
    );
};

export default ConatctForm