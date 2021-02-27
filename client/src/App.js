import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom"
import './App.scss';
import "react-toastify/dist/ReactToastify.css"

import Auth from "./hocs/auth.js"
import HomePage from "./views/pages/HomePage/HomePage.jsx";
import NewPost from "./views/pages/BlogPage/Post/NewPost.jsx";
import BlogPostIndex from "./views/pages/BlogPage/Post/BlogPostIndex.jsx";
import ShowPost from "./views/pages/BlogPage/Post/ShowPost.jsx";
import {Profile} from "./views/react_html_up/Profile.jsx";
import PostCard from "./views/components/Shared/PostCard.jsx";
import {Register} from "./views/pages/Auth/Register.jsx";
import {Login} from "./views/pages/Auth/Login.jsx";
import Activate from "./views/pages/Auth/Activate.jsx";
import {ForgetPassword} from "./views/pages/Auth/ForgetPassword.jsx";
import ResetPassword from "./views/pages/Auth/Reset.jsx";
import NewPostTest from "./views/pages/Test/TestNewPost";
import TestNewPost from "./views/pages/Test/TestNewPost";
import NewTestCK from "./views/pages/Test/TestCK";
import Upload from "./views/pages/Test/Upload";
import MediaLibrary from "./views/components/Upload/MediaLibrary.jsx";

// Javascript script
import "../src/assets/js/index"


function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <div style={{minHeight: 'calc (100vh - 80px)'}}>
                <Switch>
                    <Route exact path={"/"} component={HomePage}/>

                    {/* Authentication  Page */}
                    <Route exact path={"/register"} component={Auth(Register, false)}/>
                    <Route exact path={"/login"} component={Auth(Login, false)}/>
                    <Route path="/users/activate/:token" component={Activate} />
                    <Route path="/users/passwords/forget" component={ForgetPassword}/>
                    <Route path="/users/passwords/reset/:token" component={ResetPassword}/>
                    <Route exact path={"/users/profile"} component={Profile}/>


                    <Route exact path={"/blogs/posts/index"} component={BlogPostIndex}/>
                    <Route exact path={"/blogs/posts/new"} component={NewPost}/>
                    <Route exact path={"/blogs/posts/:postId"} component={ShowPost}/>
                    <Route exact path={"/test"} component={NewPostTest}/>
                    <Route exact path={"/dev"} component={Auth(MediaLibrary, true)}/>

                </Switch>
            </div>
        </Suspense>
    );
}

export default App;
