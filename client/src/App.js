import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom"
import './App.scss';
import Auth from "./hocs/auth.js"
import RegisterPage from "./views/pages/RegisterPage/RegisterPage";
import LoginPage from "./views/pages/LoginPage/LoginPage";
import HomePage from "./views/pages/HomePage/HomePage";
import ShowBlogPage from "./views/pages/BlogPage/ShowBlogPage";
import NewPost from "./views/pages/BlogPage/NewPost";
import BlogHome from "./views/pages/BlogPage/BlogHome";
import ShowPost from "./views/pages/BlogPage/ShowPost";

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <div style={{minHeight: 'calc (100vh - 80px)'}}>
                <Switch>
                    <Route exact path={"/register"} component={Auth(RegisterPage, false)}/>
                    <Route exact path={"/login"} component={Auth(LoginPage, false)}/>
                    <Route exact path={"/"} component={HomePage}/>

                    <Route exact path={"/blogs/new"} component={NewPost}/>
                    <Route exact path={"/blogs/index"} component={BlogHome}/>
                    <Route exact path={"/blogs/:id"} component={ShowBlogPage}/>
                    <Route exact path={"/blogs/posts/:postId"} component={ShowPost}/>


                </Switch>
            </div>
        </Suspense>
    );
}

export default App;
