import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom"
import './App.scss';
import "react-toastify/dist/ReactToastify.css"

import Auth from "./hocs/auth.js"
import HomePage from "./views/pages/Home/HomePage.jsx";
import NewPost from "./views/pages/Post/NewPost.jsx";
import PostIndex from "./views/pages/Post/PostIndex.jsx";
import ShowPost from "./views/pages/Post/ShowPost.jsx";
import {Profile} from "./views/pages/Profile/Profile.jsx";
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
import {ToastContainer} from "react-toastify";
import BlogNewPost from "./views/pages/Blog/BlogNewPost";
import IndexPage from "./views/pages/Home/IndexPage";
import BlogIndex from "./views/pages/Blog/BlogIndex";
import ShowBlog from "./views/pages/Blog/ShowBlog";

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <div style={{minHeight: 'calc (100vh - 80px)'}}>
                <ToastContainer/>
                <Switch>
                    <Route exact path={"/"} component={IndexPage}/>

                    {/* Authentication  Page */}
                    <Route exact path={"/register"} component={Auth(Register, false)}/>
                    <Route exact path={"/login"} component={Auth(Login, false)}/>
                    <Route path="/users/activate/:token" component={Activate} />
                    <Route path="/users/passwords/forget" component={ForgetPassword}/>
                    <Route path="/users/passwords/reset/:token" component={ResetPassword}/>
                    <Route exact path={"/users/profile"} component={Profile}/>

                    <Route exact path={"/blogs/posts/index"} component={PostIndex}/>
                    <Route exact path={"/blogs/posts/new"} component={NewPost}/>
                    <Route exact path={"/blogs/posts/:postId"} component={ShowPost}/>

                    <Route exact path={"/blogs/new"} component={BlogNewPost} />
                    <Route exact path={"/blogs/index"} component={BlogIndex} />
                    <Route exact path={"/blogs/:blogId"} component={ShowBlog}/>

                    <Route exact path={"/test"} component={NewPostTest}/>
                    <Route exact path={"/dev"} component={Auth(MediaLibrary, true)}/>

                </Switch>
            </div>
        </Suspense>
    );
}

export default App;
