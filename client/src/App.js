import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom"
import './App.scss';
import "react-toastify/dist/ReactToastify.css"
import "../src/assets/js/index"
import {ToastContainer} from "react-toastify";

import Auth from "./helpers/auth.js"
import {Profile} from "./views/pages/profile/Profile.jsx";
import {Register} from "./views/pages/auth/Register.jsx";
import {Login} from "./views/pages/auth/Login.jsx";
import Activate from "./views/pages/auth/Activate.jsx";
import {ForgetPassword} from "./views/pages/auth/ForgetPassword.jsx";
import ResetPassword from "./views/pages/auth/Reset.jsx";
import MediaLibrary from "./views/components/shared/MediaLibrary.jsx";
import BlogEditor from "./views/pages/blog/BlogEditor";

// Javascript script
import IndexPage from "./views/pages/home/IndexPage";
import BlogIndex from "./views/pages/blog/BlogIndex";
import BlogShow from "./views/pages/blog/BlogShow.tsx";
import {UpdateUser} from "./views/pages/auth/UpdateUser";

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <div style={{minHeight: 'calc (100vh - 80px)'}}>
                <ToastContainer/>
                <Switch>
                    <Route exact path={"/"} component={IndexPage}/>

                    {/* Authentication  Page */}
                    <Route exact path={"/users/register"} component={Auth(Register, false)}/>
                    <Route exact path={"/users/login"} component={Auth(Login, false)}/>
                    <Route exact path={"/users/private"} component={Auth(UpdateUser, true)}/>
                    <Route exact path={"/users/activate/:token"} component={Activate} />
                    <Route exact path={"/users/passwords/forget"} component={ForgetPassword}/>
                    <Route exact path={"/users/passwords/reset/:token"} component={ResetPassword}/>
                    <Route exact path={"/users/profile"} component={Profile}/>

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
