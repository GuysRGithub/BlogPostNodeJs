import React, {PropsWithChildren} from 'react';
import ReactDOM from 'react-dom';
import MediaLibrary from "../Upload/MediaLibrary";

class ImageEditor extends React.Component {

    private mapAlignStyle = {
        "center": {float: "none"},
        "left": {float: "left"},
        "right": {float: "right"},
    }

    constructor(props: PropsWithChildren<any>) {
        super(props);
        this.state = {
            align: "center",
            imageSrc: props.imageSrc,
            renderMedia: false
        }

        this.onImageChosenCallback = this.onImageChosenCallback.bind(this)
        this.pickImage = this.pickImage.bind(this)
    }

    private handleAlign = (e: React.MouseEvent<HTMLElement>) => {
        this.setState({align: e.currentTarget.getAttribute("data-value")})
    }

    private focusElement = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.classList.toggle("active")
    }

    private readonly onImageChosenCallback = (imageSrc: string | null) => {
        this.setState({imageSrc: imageSrc})
    }

    public updateSrc = (imageSrc: string | null) => {
        this.setState({imageSrc: imageSrc})
    }

    pickImage = () => {
        const popup = window.document.getElementById("popup-pick-media")
        if (popup == null) {
            const element = document.createDocumentFragment()
            ReactDOM.render(<MediaLibrary onImageChosenCallback={this.onImageChosenCallback} style={{
                background: "rgb(10 10 10 / 60%)",
                position: "fixed",
                zIndex: "100",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                padding: "3rem",
            }}/>, element)
            document.body.appendChild(element)
            return
        }
        popup.style.display = "flex"
        popup.onclick = (e) => {
            if (e.target === popup) {
                popup.style.display = "none"
            }
        }
    }

    // private pickImage() {
    //     this.setState({renderMedia: true})
    //     const popup = window.document.getElementById("popup-pick-media")
    //     if (popup == null) {
    //         const element = document.createDocumentFragment()
    //         ReactDOM.render(<MediaLibrary onImageChosenCallback={this.onImageChosenCallback} style={{
    //             background: "rgb(10 10 10 / 60%)",
    //             position: "fixed",
    //             zIndex: "100",
    //             top: "0",
    //             left: "0",
    //             width: "100%",
    //             height: "100%",
    //             padding: "3rem",
    //         }}/>, element)
    //         document.body.appendChild(element)
    //         return
    //     }
    //     popup.style.display = "flex"
    //     popup.onclick = (e) => {
    //         if (e.target === popup) {
    //             popup.style.display = "none"
    //         }
    //     }
    // }


    render() {
        return (<>
                <figure className="image-editor-element"
                        style={this.mapAlignStyle[this.state["align"]]}
                        onClick={this.focusElement}
                >
                    <div className="shadow-md image-editor-popup">
                        <div className="center-element-inner editor-icon tooltip" data-value="left"
                             onClick={this.handleAlign}>
                            <span className="tooltip-text">Align Left</span>
                            <i className="fa fa-align-left disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" data-value="center"
                             onClick={this.handleAlign}>
                            <span className="tooltip-text">Align Center</span>
                            <i className="fa fa-align-center disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" data-value="right"
                             onClick={this.handleAlign}>
                            <span className="tooltip-text">Align Right</span>
                            <i className="fa fa-align-right disabled"/>
                        </div>
                        <div className="center-element-inner editor-icon tooltip"
                             onClick={this.pickImage}>
                            <span className="tooltip-text">Insert Image</span>
                            <i className="fa fa-image"/>
                        </div>
                    </div>
                    <img src={this.state["imageSrc"] || require("../../../assets/images/posts/newsletter.jpg").default}
                         alt="Three Monks walking on ancient temple."
                         style={this.mapAlignStyle[this.state["align"]]}
                    />
                    <div className="image-editor-insert-paragraph-after">
                        <i className="fas fa-level-down-alt"/>
                    </div>
                    <div className="image-editor-insert-paragraph-before">
                        <i className="fas fa-level-up-alt"/>
                    </div>
                    <figcaption
                        style={{
                            textAlign: "center",
                            padding: "2rem"
                        }}
                    >
                        <p onClick={() => console.log("Fucking shit")}>
                            Leaving your comfort zone might lead you to such beautiful sceneries like this one.
                        </p>
                    </figcaption>
                </figure>
                {/*{this.state["renderMedia"] ?*/}
                {/*    <MediaLibrary onImageChosenCallback={this.onImageChosenCallback} style={{*/}
                {/*        background: "rgb(10 10 10 / 60%)",*/}
                {/*        position: "fixed",*/}
                {/*        zIndex: "100",*/}
                {/*        top: "0",*/}
                {/*        left: "0",*/}
                {/*        width: "100%",*/}
                {/*        height: "100%",*/}
                {/*        padding: "3rem",*/}
                {/*    }}/> : null}*/}
            </>
        )
    }

    ;
}


export default ImageEditor;