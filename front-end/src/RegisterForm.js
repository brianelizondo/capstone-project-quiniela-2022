import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form, FloatingLabel, Button, Spinner, Col, Row } from "react-bootstrap";
import { useFormik } from 'formik';
import Loading from './Loading';


function RegisterForm({ userRegister, checkUsernameEmail }){
    // history, loading and state for submit button
    const history = useHistory();
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);
    const [currentUsernameEmail, setCurrentUsernameEmail] = useState({ username: "", email: "" });

    const validate = async values => {
        const errors = {};
        if(!values.firstName) {
            errors.firstName = 'Required';
        }else if(!/^([a-zA-Z ])*$/.test(values.firstName)){
            errors.firstName = "Only letters are allowed";
        }else if(values.firstName.length > 50) {
            errors.firstName = 'Must be 50 characters or less';
        }

        if(!values.lastName) {
            errors.lastName = 'Required';
        }else if(!/^([a-zA-Z ])*$/.test(values.lastName)){
            errors.lastName = "Only letters are allowed";
        }else if(values.lastName.length > 50) {
            errors.lastName = 'Must be 50 characters or less';
        }
        
        if(!values.email) {
            errors.email = 'Required';
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }else if(values.email.length > 50) {
            errors.email = 'Must be 50 characters or less';
        }else if(values.email !== "" && currentUsernameEmail.email !== values.email){
            setCurrentUsernameEmail({...currentUsernameEmail, email: values.email});
            if(await checkUsernameEmail({ username: false, email: values.email })){
                errors.email = 'The email already exist';
            }
        }

        if(!values.username) {
            errors.username = 'Required';
        }else if(!/^([a-zA-Z0-9])*$/.test(values.username)){
            errors.password = "Only letters and numbers are allowed";
        }else if(values.username.length < 8) {
            errors.username = 'Must be 8 characters or more';
        }else if(values.username.length > 20) {
            errors.username = 'Must be 20 characters or less';
        }else if(values.username !== "" && currentUsernameEmail.username !== values.username){
            setCurrentUsernameEmail({...currentUsernameEmail, username: values.username});
            if(await checkUsernameEmail({ username: values.username, email: false })){
                errors.username = 'The username already exist';
            }
        }

        if(!values.password) {
            errors.password = 'Required';
        }else if(!/^([a-zA-Z0-9])*$/.test(values.password)){
            errors.password = "Only letters and numbers are allowed";
        }else if(values.password.length < 8) {
            errors.password = 'Must be 8 characters or more';
        }else if(values.password.length > 20) {
            errors.password = 'Must be 20 characters or less';
        }
      
        return errors;
    };

    // config for user register form
    const formik = useFormik({
        initialValues: {
            firstName: "", 
            lastName: "", 
            email: "", 
            username: "", 
            password: ""
        },
        validate,
        onSubmit: async (values) => {
            setBtnSubmitLoading(true);
            try{
                userRegister(values);
                history.push('/login');
            }catch (err){
                history.push('404');
            }
        }
    });

    return (
        <div className="RegisterForm col-md-8 offset-md-2">
            <h1>Register</h1>
            <p>Register to Quinielas World Cup 2022</p>
            
            <div className="col-md-8 offset-md-2">
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="firstName" label="First Name" className="mb-3">
                                <Form.Control name="firstName" type="text" placeholder="First Name" 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.firstName}
                                />
                                {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
                                <Form.Control name="lastName" type="text" placeholder="First Name" 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.lastName}
                                />
                                {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="email" label="Email" className="mb-3">
                                <Form.Control name="email" type="email" placeholder="Email" 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="username" label="Username" className="mb-3">
                                <Form.Control name="username" type="text" placeholder="Username" 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.username}
                                />
                                {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : <Form.Text id="usernameHelpBlock" muted>Your username must be 8-20 characters long and contain letters and numbers</Form.Text>}
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="password" label="Password" className="mb-3">
                                <Form.Control name="password" type="password" placeholder="Password" 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : <Form.Text id="passwordHelpBlock" muted>Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters or emoji</Form.Text>}
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Button variant="primary" type="submit" size="sm" disabled={ btnSubmitLoading }>
                            { btnSubmitLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Register!" }
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default RegisterForm;