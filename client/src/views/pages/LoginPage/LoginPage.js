import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {Formik} from "formik";
import {REMEMBER_ME_KEY} from "../../../config/LocalStorageKeys";
import * as Yup from "yup"
import {loginUser} from "../../../_actions/user_actions";
import {Form, Input, Button, Checkbox, Typography} from 'antd';
import Icon from "antd/es/icon";
import {withRouter} from "react-router";

const {Title} = Typography

function LoginPage(props) {
    const dispatch = useDispatch()
    const rememberMeChecked = !!localStorage.getItem(REMEMBER_ME_KEY)

    const [formErrorMessage, setFormErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);

    const initialEmail = localStorage.getItem(REMEMBER_ME_KEY) ?
        localStorage.getItem(REMEMBER_ME_KEY) : ''
    return (
        <Formik
            initialValues={{
                email: initialEmail,
                password: ''
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email("Email invalid")
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, "Password must at least 6 characters")
                    .required("Password is required")

            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    let data = {
                        email: values.email,
                        password: values.password
                    }

                    dispatch(loginUser(data))
                        .then(response => {
                            if (response.payload.loginSuccess) {
                                window.localStorage.setItem('userId', response.payload.userId)
                                if (rememberMe === true) {
                                    window.localStorage.setItem(REMEMBER_ME_KEY, values.id)
                                } else {
                                    localStorage.removeItem(REMEMBER_ME_KEY)
                                }
                                props.history.push("/")
                            } else {
                                setFormErrorMessage("Please check your Email or Password again.")
                            }
                        })
                        .catch(_ => {
                            setFormErrorMessage("Please check again.")
                            setTimeout(() => {
                                setFormErrorMessage("")
                            }, 3000)
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
                // noinspection HtmlUnknownTarget
                return (
                    <div className="app">
                        <Title level={2}>Login</Title>
                        <form onSubmit={handleSubmit} style={{width: "350px"}}>
                            <Form.Item
                                required={true}
                            >
                                <Input
                                    id={"email"}
                                    prefix={<Icon type={"user"} style={{
                                        color: 'rgba(0, 0, 0, .25) '
                                    }}/>}
                                    placeholder={"Enter your Email"}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email && (<div className="input-feedback">
                                            {errors.email}
                                        </div>)
                                    }
                                />

                            </Form.Item>

                            {/*  Password  */}
                            <Form.Item
                                required={true}
                            >
                                <Input
                                    id={"password"}
                                    prefix={<Icon type={"lock"} style={{
                                        color: 'rgba(0, 0, 0, .25) '
                                    }}/>}
                                    placeholder={"Enter your Password"}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="password"
                                    className={
                                        errors.password && touched.password && (<div className="input-feedback">
                                            {errors.password}
                                        </div>)
                                    }
                                />

                            </Form.Item>

                            {formErrorMessage && (
                                <label>
                                    <p style={{
                                        color: "#ff0000bf", fontSize: "0.72rem", border: "1px solid",
                                        padding: "1rem", borderRadius: "10px"
                                    }}>
                                        {formErrorMessage}
                                    </p>
                                </label>
                            )}
                            {/* Remember Me */}
                            <Form.Item
                            >
                                <Checkbox
                                    id={"remember-me"}
                                    checked={rememberMe}
                                    onChange={handleChange}

                                >Remember Me</Checkbox>
                                <a href="#" style={{float: 'right'}}>Forgot Password?</a>

                                <div>
                                    <Button type={"primary"} htmlType={"submit"}
                                            className={"login-fom-button"} style={{minWidth: "100%"}}
                                            disabled={isSubmitting}
                                            onSubmit={handleSubmit}>
                                        Login
                                    </Button>
                                </div>
                                Or <a href="/register">Register Now!</a>
                            </Form.Item>
                        </form>
                    </div>
                )
            }}
        </Formik>
    )
}

export default withRouter(LoginPage)