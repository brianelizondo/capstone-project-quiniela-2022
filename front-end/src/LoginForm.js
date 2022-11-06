import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form, FloatingLabel, Button, Spinner, Col, Row, Alert } from "react-bootstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';


function LoginForm({ userAuthenticate }){
    // history, loading and state for submit button
    const history = useHistory();
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);
    const [checkUserPass, setCheckUserPass] = useState(false);

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
                history.push('/profile');
                setCheckUserPass(true);
            }
        }
    });

    return (
        <div className="RegisterForm col-md-8 offset-md-2">
            <h1>Login</h1>
            <p>Login to Quinielas World Cup 2022</p>

            <div className="col-md-8 offset-md-2">
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
                            { btnSubmitLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Login  !" }
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default LoginForm;