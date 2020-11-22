import React from 'react'
import "./xd_style.scss"

const XdTest = (props) => {
    return (
        <div>
            <div className="header dark-theme">
                <div className="nav">
                    <div className="logo">
                        <span><i className="fas fa-pencil-alt"></i></span>
                        <div><span>Write Article</span></div>
                    </div>
                    <div className="logo-web">

                    </div>
                    <div className="nav-options">
                        <div id="ic_search">

                        </div>

                        <div id="ic_notifications">

                        </div>

                        <div className="img-container">
                            <img src={require("../../../assets/images/xd/Avatar.png")}/>
                        </div>

                    </div>
                </div>
            </div>
            <div className="content">

            </div>
        </div>
    );
}

export default XdTest