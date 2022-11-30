import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form, FloatingLabel, Button, Spinner, Col, Row, Alert, Card } from "react-bootstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './LoginForm.css';

import { useDispatch } from 'react-redux';
import { login } from './store/userSlice';

function LoginForm({ userAuthenticate }){
    // history, loading and state for submit button
    const history = useHistory();
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);
    const [checkUserPass, setCheckUserPass] = useState(false);
    // redux selector and dispatch
    const dispatch = useDispatch();

    // config for user register form
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
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
            const respAuthenticate = await userAuthenticate(values);

            if(respAuthenticate[0]){
                setBtnSubmitLoading(false);
                setCheckUserPass(true);
            }else{
                dispatch(login(respAuthenticate));
                history.push(`/users/${respAuthenticate.user.username}/profile`);
            }
        }
    });

    return (
        <div className="LoginForm col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>Login</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='section-subtitle'>Login to Quinielas World Cup 2022</h5>
                </Col>
            </Row>

            <div className="LoginForm-form-container col-md-8 offset-md-2">
                <Card className="LoginForm-form-card">
                    <Form onSubmit={formik.handleSubmit}>
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
                                </FloatingLabel>
                            </Col>
                        </Row>

                        { checkUserPass ?
                        <Row>
                            <Col>
                                <Alert variant="danger">Invalid username/password</Alert>
                            </Col>
                        </Row>
                        : null }

                        <Row>
                            <Col>
                            <Button variant="primary" type="submit" size="sm" disabled={ btnSubmitLoading }>
                                { btnSubmitLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Login!" }
                            </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default LoginForm;