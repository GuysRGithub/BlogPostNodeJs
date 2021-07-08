import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom"
import './App.scss';
import "react-toastify/dist/ReactToastify.css"
import "../src/assets/js/index"
import {ToastContainer} from "react-toastify";

import Auth from "./hocs/auth.js"
import NewPost from "./views/pages/Post/NewPost.jsx";
import PostIndex from "./views/pages/Post/PostIndex.jsx";
import {Profile} from "./views/pages/Profile/Profile.jsx";
import {Register} from "./views/pages/Auth/Register.jsx";
import {Login} from "./views/pages/Auth/Login.jsx";
import Activate from "./views/pages/Auth/Activate.jsx";
import {ForgetPassword} from "./views/pages/Auth/ForgetPassword.jsx";
import ResetPassword from "./views/pages/Auth/Reset.jsx";
import MediaLibrary from "./views/components/Upload/MediaLibrary.jsx";
import BlogEditor from "./views/pages/Blog/BlogEditor";

// Javascript script
import IndexPage from "./views/pages/Home/IndexPage";
import BlogIndex from "./views/pages/Blog/BlogIndex";
import BlogShow from "./views/pages/Blog/BlogShow.tsx";
import ShowPost from "./views/pages/Post/ShowPost";

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

                    <Route exact path={"/blogs/new"} component={Auth(BlogEditor, true)} />
                    <Route exact path={"/blogs/edit/:blogId"} component={Auth(BlogEditor, true)} />
                    <Route exact path={"/blogs"} component={BlogIndex} />
                    <Route exact path={"/blogs/index"} component={BlogIndex} />
                    <Route exact path={"/blogs/:blogId"} component={BlogShow}/>

                    <Route exact path={"/dev"} component={Auth(MediaLibrary, true)}/>

                </Switch>
            </div>
        </Suspense>
    );
}

export default App;
