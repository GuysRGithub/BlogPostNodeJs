import React from "react";
import moment from "moment";
import {Formik} from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import {useDispatch} from "react-redux";

import {
    Form,
    Input,
    Button,
} from 'antd';

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
    }
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8
        },
    },
}

function RegisterPage(props) {

    const dispatch = useDispatch()

    return (
        <Formik initialValues={
            {
                email: '',
                firstname: '',
                lastname: '',
                password: '',
                confirmPassword: ''
            }
        }
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().required("First name is required"),
                    lastname: Yup.string().required("Last name is required"),
                    email: Yup.string().email("Email invalid").required("Email is required"),
                    password: Yup.string().min(6, "Password must be at least 6 characters")
                        .required("Password is required"),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], "Password confirm doesn't match")
                        .required("Confirm Password is required")

                })}
                onSubmit={(values, {setSubmitting}) => {

                    setTimeout(() => {
                        let data = {
                            email: values.email,
                            password: values.password,
                            firstname: values.firstname,
                            lastname: values.lastname,
                            image: `http://gravater.com/avatar/${moment().unix()}?d=identicon`
                        }

                        //    Dispatch ....
                        dispatch(registerUser(data))
                            .then(response => {
                                if (response.payload.success) {
                                    props.history.push("/login")
                                } else {
                                    alert(response.payload.err)
                                }
                            })

                        setSubmitting(false)
                    }, 500)



                }}

        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset
                } = props

                return (
                    <div className="app">
                        <h2 className="my-3 text-center">Sign up</h2>
                        <Form style={{minWidth: "375px"}} {...formItemLayout}>

                            <Form.Item
                                required={true} label={"Firstname"}>
                                <Input
                                    id={"firstname"}
                                    placeholder={"Enter your name"}
                                    type={"text"}
                                    value={values.firstname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.firstname && touched.firstname ? 'text-input_error' : 'text-input'
                                    }
                                />
                                {errors.firstname && touched.firstname && (<div className="input-feedback">
                                    {errors.firstname}
                                </div>)}
                            </Form.Item>

                            <Form.Item
                                required={true}
                                label={"Last Name"}>
                                <Input
                                    id={"lastname"}
                                    placeholder={"Enter your Last Name"}
                                    type={"text"}
                                    value={values.lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.lastname && touched.lastname ? 'text-input-error' : 'text-input'
                                    }/>
                                {errors.lastname && touched.lastname && (
                                    <div className="input-feedback">{errors.lastname}</div>
                                )}

                            </Form.Item>

                            <Form.Item
                                required={true}
                                label={"Email"}>
                                <Input
                                    id={"email"}
                                    placeholder={"Enter your Email"}
                                    type={"text"}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email ? 'text-input-error' : 'text-input'
                                    }/>
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}

                            </Form.Item>

                            {/*  Password  */}
                            <Form.Item
                                required={true}
                                label={"Password"}>
                                <Input
                                    id={"password"}
                                    placeholder={"Enter your Password"}
                                    type={"password"}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-input-error' : 'text-input'
                                    }/>
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}

                            </Form.Item>

                            {/*    Confirm Password  */}
                            <Form.Item
                                required={true}
                                label={"Confirm"}
                                hasFeedback="true">
                                <Input
                                    id={"confirmPassword"}
                                    placeholder={"Enter your Confirm Password"}
                                    type={"password"}
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword && touched.confirmPassword ? 'text-input-error' : 'text-input'
                                    }/>
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="input-feedback">{errors.confirmPassword}</div>
                                )}

                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button onClick={handleSubmit} type={"primary"} disabled={isSubmitting}>Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                )
            }}

        </Formik>
    )
}

export default RegisterPage