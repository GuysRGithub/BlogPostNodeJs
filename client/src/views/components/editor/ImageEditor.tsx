import React, {CSSProperties} from 'react';
import ReactDOM from 'react-dom';
import MediaLibrary from "../shared/MediaLibrary";
import HtmlParser from "react-html-parser";

export interface ImageEditorFocusCallbackParams {
    focus: boolean,
    ref: ImageEditor
}

interface ImageEditorProp {
    imageSrc: string | null | undefined,
    toggleActiveCallback?: ((params: ImageEditorFocusCallbackParams) => void) | undefined,
    elementStyle?: CSSProperties | undefined,
    caption?: string | null | undefined,
    showCaption?: boolean | undefined
}

interface ImageEditorState {
    imageSrc: string | null | undefined,
    renderMedia: false,
    toggleActiveCallback?: ((params: ImageEditorFocusCallbackParams) => void) | undefined,
    elementStyle?: CSSProperties | undefined,
    caption?: string | null | undefined,
    showCaption?: boolean | undefined
}

class ImageEditor extends React.Component<ImageEditorProp, ImageEditorState> {

    private mapAlignStyle = {
        "center": {float: "none", margin: "auto"},
        "left": {float: "left", marginRight: "1rem"},
        "right": {float: "right", marginLeft: "1rem"},
        "full": {float: "none", width: "100%", margin: "auto"}
    }

    private caption: HTMLElement | null = null
    private figure: HTMLElement | null = null

    constructor(props: ImageEditorProp) {
        super(props);
        this.state = {
            imageSrc: props.imageSrc,
            renderMedia: false,
            toggleActiveCallback: props.toggleActiveCallback,
            elementStyle: props.elementStyle,
            caption: props.caption,
            showCaption: props.showCaption ?? true,
        }

        this.onImageChosenCallback = this.onImageChosenCallback.bind(this)
        this.pickImage = this.pickImage.bind(this)
        this.focusElement = this.focusElement.bind(this)
    }

    componentDidMount() {
        /************************************************************************************************
         * ADD CLICK LISTENER TO REMOVE HIGHLIGHT WHEN CLICK OUTSIDE
         ************************************************************************************************/
        const textField = document.getElementById("textField") as HTMLIFrameElement | null
        const doc = textField?.contentDocument || textField?.contentWindow?.document;
        if (doc != null) {
            // noinspection DuplicatedCode
            doc?.addEventListener("click", (e) => {
                const target = e.target as Node | null
                if (target == null) return;
                if (!this.figure?.contains(target)) {
                    this.figure?.classList.remove("active")
                    if (this.state["toggleActiveCallback"]) {
                        const params: ImageEditorFocusCallbackParams = {focus: false, ref: this}
                        this.state["toggleActiveCallback"](params)
                    }
                }
            })
            return;
        }

        // noinspection DuplicatedCode
        document.addEventListener("click", (e) => {
            const target = e.target as Node | null
            if (target == null) return;
            if (!this.figure?.contains(target)) {
                this.figure?.classList.remove("active")
                if (this.state["toggleActiveCallback"]
                ) {
                    const params: ImageEditorFocusCallbackParams = {focus: false, ref: this}
                    this.state["toggleActiveCallback"](params)
                }
            }
        })
    }

    private handleAlign = (e: React.MouseEvent<HTMLElement>) => {
        this.setState({elementStyle: this.mapAlignStyle[e.currentTarget.getAttribute("data-value") ?? "center"]})
    }

    private handleToggleCaption = (e: React.MouseEvent<HTMLElement>) => {
        this.setState({showCaption: !this.state.showCaption})
        e.currentTarget.classList.toggle("active")
    }

    private readonly focusElement = (e: React.MouseEvent<HTMLElement>) => {
        if (this.figure?.contains(e.currentTarget) && this.figure?.classList.contains("active")) return
        e.currentTarget.classList.add("active")
        if (this.state["toggleActiveCallback"]
        ) {
            const params: ImageEditorFocusCallbackParams = {focus: true, ref: this}
            this.state["toggleActiveCallback"](params)
        }
        if (this.caption != null) {
            if (e.currentTarget.classList.contains("active")) {
                this.caption.classList.remove("visibility-hidden")
            } else {
                if (this.caption.innerText.trim().length == 0) {
                    this.caption.classList.add("visibility-hidden")
                }
            }
        }
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

    handleRemove = () => {
        this.figure?.remove()
    }

    insertParagraphBefore = () => {
        this.figure?.parentElement?.insertBefore(document.createElement("p"), this.figure)
    }

    insertParagraphAfter = () => {
        const element = document.createElement("p")
        element.contentEditable = "true"
        element.style['white-space'] = 'normal'
        element.innerHTML = "<br>"
        this.figure?.parentElement?.insertBefore(element, this.figure?.nextSibling)
    }

    render() {
        return (<>
                <figure className="image-editor-element cursor-default"
                        contentEditable="false"
                        style={this.state["elementStyle"]}
                        onClick={this.focusElement}
                        ref={ref => this.figure = ref}
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
                        <div className="center-element-inner editor-icon tooltip" data-value="full"
                             onClick={this.handleAlign}>
                            <span className="tooltip-text">Full Screen</span>
                            <i className="fas fa-expand disabled"/>
                        </div>
                        <div className="center-element-inner editor-icon tooltip"
                             onClick={this.pickImage}>
                            <span className="tooltip-text">Replace Image</span>
                            <i className="fa fa-image"/>
                        </div>
                        <div className="center-element-inner editor-icon tooltip active"
                             onClick={this.handleToggleCaption}>
                            <span className="tooltip-text">Toggle Caption</span>
                            <i className="fas fa-closed-captioning"/>
                        </div>
                        <div className="center-element-inner editor-icon tooltip"
                             onClick={this.handleRemove}>
                            <span className="tooltip-text">Remove</span>
                            <i className="fas fa-trash"/>
                        </div>
                    </div>
                    <div>
                        <img
                            src={this.state["imageSrc"] || require("../../../assets/images/posts/newsletter.jpg").default}
                            alt="Three Monks walking on ancient temple."
                            style={this.state['elementStyle']}
                        />
                    </div>

                    <div className="image-editor-insert-paragraph-before"
                         onClick={this.insertParagraphBefore}>
                        <i className="fas fa-level-up-alt"/>
                    </div>
                    <div className="image-editor-insert-paragraph-after"
                         onClick={this.insertParagraphAfter}>
                        <i className="fas fa-level-down-alt"/>
                    </div>

                    {this.state.showCaption && (<figcaption
                        className="figcaption cursor-text w-100"
                        contentEditable="false"
                        style={this.state['elementStyle']}
                        ref={ref => this.caption = ref}>
                        {HtmlParser(this.state.caption ?? "")}
                        {/*<p contentEditable="true">*/}
                        {/*    <span>{this.state.caption}</span>*/}
                        {/*</p>*/}
                    </figcaption>)}
                </figure>

            </>
        )
    }

    ;
}


export default ImageEditor;