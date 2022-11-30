import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form, FloatingLabel, Button, Spinner, Col, Row, Card } from "react-bootstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './RegisterForm.css';


function RegisterForm({ userRegister, checkUsernameEmail }){
    // history, loading and state for submit button
    const history = useHistory();
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);
    const [showUserEmailError, setShowUserEmailError] = useState({ username: false, email: false });

    // config for user register form
    const formik = useFormik({
        initialValues: {
            firstName: "", 
            lastName: "", 
            email: "", 
            username: "", 
            password: ""
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Required')
                .max(50, 'Must be 50 characters or less')
                .matches(/^([a-zA-Z ])*$/, { message: 'Only letters are allowed' }),
            lastName: Yup.string()
                .required('Required')
                .max(50, 'Must be 50 characters or less')
                .matches(/^([a-zA-Z ])*$/, { message: 'Only letters are allowed' }),
            email: Yup.string()
                .required('Required')
                .email('Invalid email address'),
            username: Yup.string()
                .required('Required')
                .matches(/^([a-zA-Z0-9])*$/, { message: "Only letters and numbers are allowed" })
                .min(8, 'Must be 8 characters or more')
                .max(20, 'Must be 20 characters or less'),
            password: Yup.string()
                .required('Required')
                .matches(/^([a-zA-Z0-9])*$/, { message: "Only letters and numbers are allowed" })
                .min(8, 'Must be 8 characters or more')
                .max(20, 'Must be 20 characters or less')
          }),
        onSubmit: async (values) => {
            setBtnSubmitLoading(true);
            const checkDuplicate = await checkUsernameEmail(values.email, values.username);
            if(checkDuplicate.username || checkDuplicate.email){
                setBtnSubmitLoading(false);
                setShowUserEmailError(checkDuplicate);
            }else{
                userRegister(values);
                history.push('/login');
            }
        }
    });

    return (
        <div className="RegisterForm col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>Register</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='section-subtitle'>Register to Quinielas World Cup 2022</h5>
                </Col>
            </Row>

            <div className="RegisterForm-form-container col-md-10 offset-md-1">
                <Card className="RegisterForm-form-card">
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="firstName" label="First Name" className="mb-3">
                                    <Form.Control name="firstName" type="text" placeholder="First Name" 
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur} 
                                        value={formik.values.firstName}
                                        isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
                                    <Form.Control name="lastName" type="text" placeholder="First Name" 
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur} 
                                        value={formik.values.lastName}
                                        isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
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
                                        isInvalid={formik.touched.email && !!formik.errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                                    { showUserEmailError.email 
                                        ? <div className='formDuplicateError'>The email has already been taken { showUserEmailError.email = false }</div>
                                        : null 
                                    }
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
                                        isInvalid={formik.touched.username && !!formik.errors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                                    { showUserEmailError.username 
                                        ? <div className='formDuplicateError'>The username has already been taken { showUserEmailError.username = false }</div>
                                        : null 
                                    }
                                    <Form.Text id="usernameHelpBlock" muted>Your username must be 8-20 characters long and contain letters and numbers</Form.Text>
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
                                        isInvalid={formik.touched.password && !!formik.errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                                    <Form.Text id="passwordHelpBlock" muted>Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters or emoji</Form.Text>
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
                </Card>
            </div>
        </div>
    );
}

export default RegisterForm;