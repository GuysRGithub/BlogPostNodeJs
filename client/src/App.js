import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom"
import './App.scss';
import "react-toastify/dist/ReactToastify.css"
// import "../src/assets/js/home"
import "../src/assets/js/index"
import Auth from "./hocs/auth.js"
import HomePage from "./views/pages/HomePage/HomePage";
import Home from "./views/pages/BlogPage/Home";
import NewPost from "./views/pages/BlogPage/Post/NewPost";
import BlogPostIndex from "./views/pages/BlogPage/Post/BlogPostIndex";
import ShowPost from "./views/pages/BlogPage/Post/ShowPost";
import {Profile} from "./views/react_html_up/Profile";
import PostCard from "./views/components/PostCard";
import {Register} from "./views/pages/Auth/Register";
import {Login} from "./views/pages/Auth/Login";
import Activate from "./views/pages/Auth/Activate";
import {ForgetPassword} from "./views/pages/Auth/ForgetPassword";
import ResetPassword from "./views/pages/Auth/Reset";
import NewPostTest from "./views/pages/Test/TestNewPost";
import Test from "./views/pages/Test/test";
import TestNewPost from "./views/pages/Test/TestNewPost";
import NewTestCK from "./views/pages/Test/TestCK";

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

                </Switch>
            </div>
        </Suspense>
    );
}

export default App;
