import React, {Component, useState} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ClassicEditor from '../../../../helpers/ckeditor5/build/ckeditor';

import Icon from "antd/es/icon";
import {Button, Checkbox, Form, Input} from "antd";
import {Formik} from "formik";
import * as Yup from "yup"
import {useDispatch} from "react-redux";
import {loginUser, savePost} from "../../../../_actions/user_actions";
import {REMEMBER_ME_KEY} from "../../../../config/LocalStorageKeys";

function NewPost(props) {

    const dispatch = useDispatch()
    const [PostContent, setPostContent] = useState("<p>Edit Post Here</p>")

    const [FormErrorMessage, setFormErrorMessage] = useState("");


    return (
        <Formik
            initialValues={{
                title: "",
            }}

            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .min(1, "Title is too short")
                    .required("Title is required"),
            })}

            // onSubmit={(values, {setSubmitting}) => {
            //     console.log("Fuck It")
            // }}

            onSubmit={(values, {setSubmitting}) => {
                console.log("Submitting")

                setTimeout(() => {
                    let data = {
                        title: values.title,
                        content: PostContent,
                        author: window.localStorage.getItem('userId')
                    }


                    dispatch(savePost(data))
                        .then(response => {
                            if (response.payload.success) {
                                props.history.push("/")
                            } else {
                                alert("Failed to save post. Please try again")
                            }
                        })
                        .catch(_ => {
                            alert("Failed to save post. Please try again")
                            // setFormErrorMessage("Please check your Email or Password again.")
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

                return (
                    <div className="container-lg px-6 py-6 dark-theme min-h-100 dark-theme-editor custom-label relative">
                        <h2 className="text-center font-ubuntu text-body my-6">Using CKEditor 5 build in React</h2>
                        <form>
                            <Form.Item
                                required={true}
                                label="Title">
                                <input
                                    id={"title"}
                                    prefix={<Icon type={"lock"} style={{
                                        color: 'rgba(0, 0, 0, .25) '
                                    }}/>}
                                    placeholder={"Enter Post Title"}
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.firstname && touched.firstname ? 'text-input_error w-4/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2'
                                            : 'text-input px-6 py-3 w-4/12 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2'
                                    }
                                />
                                {errors.title && touched.title && (
                                    <div className="input-feedback">
                                        {errors.title}
                                    </div>
                                )}
                            </Form.Item>

                        </form>

                        <div className="mt-5 row content-between justify-content-between">
                            <div className="w-8/12 font-pt-serif">
                                <CKEditor
                                    config={{
                                        ckfinder: {
                                            uploadUrl: "/api/uploads"
                                        },
                                        skin: "",
                                        plugin: [],
                                        heading: {
                                            options: [
                                                {
                                                    model: 'paragraph',
                                                    title: 'Paragraph',
                                                    class: 'ck-heading_paragraph'
                                                },
                                                {
                                                    model: 'heading1',
                                                    view: 'h1',
                                                    title: 'Heading 1',
                                                    class: 'ck-heading_heading1'
                                                },
                                                {
                                                    model: 'heading2',
                                                    view: 'h2',
                                                    title: 'Heading 2',
                                                    class: 'ck-heading_heading2'
                                                }
                                            ]
                                        }
                                    }}

                                    editor={ClassicEditor}
                                    data={PostContent}
                                    onInit={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setPostContent(data)
                                        console.log(data);
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div>
                            <div className="w-3/12 p-0-imp child-px-5 mx-3 my-border">
                                <div className="my-border-b mt-2">
                                    <h3 className="font-ubuntu font-weight-bold mx-2">Publish</h3>
                                </div>
                                <div className="flex mx-0 mt-6 content-between justify-content-between">
                                    <button className="custom-btn-primary">Save Draft</button>
                                    <button className="custom-btn-primary">Preview</button>
                                </div>
                                <div>
                                    <div className="flex mt-6 mx-0">
                                        <i className="fs-3 fas fa-map-pin"/>
                                        <div className="fs-1 ml-3 letter-space-4">
                                            Status Draft
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex mt-6 mx-0">
                                        <i className="fs-3 fas fa-eye"/>
                                        <div className="fs-1 ml-3 letter-space-4">
                                            Visibility
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex mt-6 mx-0 justify-content-between content-between">
                                        <div className="row flex mx-0">
                                            <i className="fs-3 fab fa-old-republic"/>
                                            <div className="fs-1 ml-3 letter-space-4">
                                                Save
                                            </div>
                                        </div>
                                        <Form.Item>
                                            <button type="submit"
                                                    disabled={isSubmitting}
                                                    className="custom-btn-primary"
                                                    onSubmit={(e) => {
                                                        handleSubmit(e)
                                                        console.log("Submit Fuck")
                                                    }}
                                                    onClick={handleSubmit}>
                                                Save
                                            </button>
                                        </Form.Item>

                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>

                )


            }}
        </Formik>
    );

}

export default NewPost;