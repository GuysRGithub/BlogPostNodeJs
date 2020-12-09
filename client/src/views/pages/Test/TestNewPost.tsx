import React, {Component, useState} from 'react'
import {execCommandStyle, ExecCommandStyle} from "../../../assets/ts/editor";
import {styleElement} from "../../../utils/EditorUitls";
import {connect, useSelector} from "react-redux"
import setStyleNotChangeEditor, {
    setStyleChangeEditor,
    toggleBold,
    toggleItalic,
    toggleUnderline
} from "../../../_actions/editor_actions";
import {State} from "react-toastify/dist/hooks/toastContainerReducer";
import {Login} from "../Auth/Login";
// import store from '../reducers/store';


declare var textField: Window


class TestNewPost extends Component {

    // editorState: Object = {}

    constructor(props: Object) {
        super(props);
        this.handleIframeKeyPress = this.handleIframeKeyPress.bind(this)
    }

    handleIframeKeyPress(evt: KeyboardEvent) {

        let charCode = evt.key;

        // console.log("State Editor", this.editorState)
        // @ts-ignore
        let editorState = this.props.state;
        // @ts-ignore
        let dispatch = this.props.dispatch;

        if (editorState.isStyleChanged) {
            evt.preventDefault()

            let selection = textField.window.getSelection()

            if (selection == null) return
            const range = selection.getRangeAt(0)

            let element;

            if (charCode === 'Enter') {
                element = document.createElement("p")
                const span = document.createElement('span')
                span.innerHTML = '<br>'
                element.appendChild(span)
                // element.innerHTML = '<br>'
            } else {
                element = document.createElement("span")
                element.innerText = charCode
            }

            if (editorState.isStyleChanged) {
                if (editorState.boldEnable) {
                    element.style["font-weight"] = "bold"
                }
                if (editorState.italicEnable) {
                    element.style["font-style"] = "italic"
                }
                if (editorState.underlineEnable) {
                    element.style["text-decoration"] = "underline"
                }
            }

            // div.setAttribute("contentEditable", "true")
            // @ts-ignore
            // div.innerText = selection.anchorNode?.data
            // if (document.)
            element.style['white-space'] = 'pre'
            const startNode = element.childNodes[0]
            const endNode = element.childNodes[0]
            // div.appendChild(fragment)
            console.log("range", range)
            // range.insertNode(div)

            textField.document.body.appendChild(element)
            const newRange = document.createRange()
            // var sel = window.getSelection()
            // @ts-ignore
            newRange.setStart(startNode, 1)
            // newRange.setEnd(endNode, 1)
            newRange.collapse(true)

            selection.removeAllRanges()
            selection.addRange(newRange)

            dispatch(setStyleNotChangeEditor())

        }


    }


    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
        // if (prevProps.specificProperty !== this.props.specificProperty) {
        // Do whatever you want
        // }
        // console.log("FUck State", this.props)
        //
        // @ts-ignore
        // this.editorState = this.props.state
        //
        // let doc = textField.document;
        //
        // if (doc.addEventListener) {
        //     console.log("I Love Rose")
        //     doc.addEventListener("keypress", handleIframeKeyPress, false);
        //     doc.addEventListener("keyup", handleIframeKeyUp, false);
        // } else {
        //     console.log("I not Love Rose")
        //     doc.onkeypress = handleIframeKeyPress;
        // }
    }

    componentDidMount() {

        // @ts-ignore
        let state = this.props

        console.log("Fuck", state === this.props)

        // super.componentDidMount();
        // let iconEditors = document.getElementsByClassName('editor-icon');
        // for (let i = 0; i < iconEditors.length; i++) {
        //     let item = iconEditors[i]
        //     if (item.attributes['data-cmd-style'] && item.attributes['data-cmd-value']) {
        //         let cmd = item.attributes['data-cmd-style'].value;
        //         let value = item.attributes['data-cmd-value'].value;
        //         item.addEventListener("click", function () {
        //             console.log("Icon Clicked")
        //             onIconEditorClicked()
        // item.classList.toggle("active")
        // })
        // }
        // console.log("item.attributes['data-cmd']", item.attributes['data-cmd'].value)
        //
        // }

        // this.handleIframeKeyPress.bind(this);

        // function handleIframeKeyPress(evt: KeyboardEvent) {
        //     console.log("Event", evt)
        //
        //     let charCode = evt.key;
        //     console.log("sTate", state)
        //
        //
        //     if (charCode === ' ') {
        //         evt.preventDefault()
        //         // @ts-ignore
        //
        //         let selection = textField.window.getSelection()
        //
        //         if (selection == null) return
        //         // textField.document.body.innerText = ""
        //         // textField.document.body.innerText = charCode
        //
        //         // setTimeout(function () {
        //         //     textField.document.body.innerText = charCode
        //         // }, 1000)
        //         const range = selection.getRangeAt(0)
        //
        //         const div = document.createElement("span")
        //
        //         // if (state.isStyleChanged) {
        //         //     if (state.boldEnable) {
        //         //         div.style["font-weight"] = "bold"
        //         //     }
        //         //     if (state.italicEnable) {
        //         //         div.style["font-style"] = "italic"
        //         //     }
        //         //
        //         //     if (state.underlineEnable) {
        //         //         div.style["text-decoration"] = "underline"
        //         //     }
        //         // }
        //
        //         // div.setAttribute("contentEditable", "true")
        //         // @ts-ignore
        //         // div.innerText = selection.anchorNode?.data
        //         div.innerText = " "
        //         div.style['white-space'] = 'pre'
        //         const startNode = div.childNodes[0]
        //         const endNode = div.childNodes[0]
        //         // div.appendChild(fragment)
        //         range.insertNode(div)
        //
        //         const newRange = document.createRange()
        //         // var sel = window.getSelection()
        //         // @ts-ignore
        //         newRange.setStart(startNode, 1)
        //         // newRange.setEnd(endNode, 1)
        //         newRange.collapse(true)
        //
        //         selection.removeAllRanges()
        //         selection.addRange(newRange)
        //
        //         // dispatch(setStyleNotChangeEditor())
        //         setTimeout(function () {
        //             // textField.focus();
        //         }, 500);
        //     }
        //
        //
        // }

        // function handleIframeKeyUp(evt: KeyboardEvent) {
        //     console.log("Event", evt)
        //     let charCode = evt.key;
        //
        //     if (charCode === ' ') {
        //         // textField.document.body.innerText = textField.document.body.innerText.trim()
        //
        //         let selection = textField.window.getSelection()
        //
        //         if (selection == null) return
        //         // textField.document.body.innerText = ""
        //         // textField.document.body.innerText = charCode
        //
        //         // setTimeout(function () {
        //         //     textField.document.body.innerText = charCode
        //         // }, 1000)
        //         const range = selection.getRangeAt(0)
        //
        //         const div = document.createElement("span")
        //         div.style["font-weight"] = "bold"
        //         div.setAttribute("contentEditable", "true")
        //         // @ts-ignore
        //         // div.innerText = selection.anchorNode?.data
        //         div.innerText = " "
        //         div.style['white-space'] = 'pre'
        //         const startNode = div.childNodes[0]
        //         const endNode = div.childNodes[0]
        //         // div.appendChild(fragment)
        //         range.insertNode(div)
        //
        //         const newRange = document.createRange()
        //         // var sel = window.getSelection()
        //         // @ts-ignore
        //         newRange.setStart(startNode, 1)
        //         // newRange.setEnd(endNode, 1)
        //         newRange.collapse(true)
        //
        //         selection.removeAllRanges()
        //         selection.addRange(newRange)
        //
        //         setTimeout(function() {
        //             // textField.focus();
        //         }, 500);
        //     }
        //
        //
        //     // if (charCode === ' ') {
        //     //     console.log("Inner TExt", textField.document.body.innerText)
        //     //     textField.document.body.innerText = textField.document.body.innerText.trim()
        //     // }
        //
        // }


        let doc = textField.document;

        if (doc.addEventListener) {
            console.log("I Love Rose")
            doc.addEventListener("keypress", this.handleIframeKeyPress, false);
            // doc.addEventListener("keyup", handleIframeKeyUp, false);
        } else {
            console.log("I not Love Rose")
            doc.onkeypress = this.handleIframeKeyPress;
        }
    }

    render() {

        // @ts-ignore
        let dispatch = this.props.dispatch


        function load() {
            textField.document.designMode = "On";
        }


        console.log("this.props", this.props)

        function onIconEditorClicked(event: React.MouseEvent<HTMLElement> | null = null) {
            dispatch(setStyleChangeEditor())
            if (event?.target instanceof HTMLElement) {
                (event?.target as HTMLElement).classList.toggle("active")
            }
        }

        async function styleOnIconClicked(style: string, value: string) {
            await styleElement(style, value)
            onIconEditorClicked()
        }

        async function boldSelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('font-weight', 'bold')
            onIconEditorClicked(event)
            dispatch(toggleBold())
        }

        async function italicSelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('font-style', 'italic')
            onIconEditorClicked(event)
            dispatch(toggleItalic())

        }

        async function underlineSelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('text-decoration', 'underline')
            onIconEditorClicked(event)
            dispatch(toggleUnderline())

        }

        async function alignLeftSelection() {
            await styleElement('text-align', 'left')
        }

        async function alignRightSelection() {
            await styleElement('text-align', 'right')
        }

        async function alignCenterSelection() {
            await styleElement('text-align', 'center')
        }

        async function alignJustifySelection() {
            await styleElement('text-align', 'justify')
        }


        // @ts-ignore
        return (
            <div className="w-9/12 bg-white mt-break mx-auto rounded-md"
                 style={{height: '100vh', boxShadow: '0 0 5px 5px #bac7c1'}}>
                <div className="d-flex mx-3">
                    <div className="w-2/12">
                        <i className="fa fa-xs fa-check"><span className="ml-2 fs-1">Save</span></i>
                    </div>
                    <div
                        className="d-flex justify-content-between content-between align-items-center child-mx-2-not-first">
                        <i className="fa fa-xs fa-arrow-left"/>
                        <i className="fa fa-xs fa-arrow-right"/>
                    </div>
                    <div
                        className="d-flex justify-content-end w-2/12 content-end align-items-center child-mx-2-not-first">
                        <i className="fa fa-xs fa-desktop"><span className="ml-2 fs-1">Desktop</span></i>
                    </div>
                    <div
                        className="d-flex justify-content-end w-2/12 content-end align-items-center child-mx-2-not-first">
                        <i className="fa fa-xs fa-wrench"><span className="ml-2 fs-1">Tools</span></i>
                    </div>
                    <div
                        className="d-flex align-items-center justify-end justify-content-end flex-1 child-mx-2-not-first">
                        <div
                            className="d-flex justify-content-between content-between align-items-center child-mx-2-not-first">
                            <i className="fa fa-xs fa-cog"><span className="ml-2 fs-1">Pages</span></i>
                            <i className="fa fa-xs fa-fill-drip"><span className="ml-2 fs-1">Themes</span></i>
                            <i className="fa fa-xs fa-globe"><span className="ml-2 fs-1">Site</span></i>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-between mx-3 mt-5 child-mx-1 ml-auto">
                    {/*<div className="d-flex content-between">*/}
                    <div className="center-element-inner editor-icon tooltip" data-cmd="bold" onClick={boldSelection}>
                        <i className="fa fa-bold disabled"/>
                    </div>
                    <div className="center-element-inner editor-icon tooltip" onClick={italicSelection}>
                        <i className="fa fa-italic disabled"/></div>
                    <div className="center-element-inner editor-icon tooltip" onClick={underlineSelection}><i
                        className="fa fa-underline disabled"/></div>
                    <div className="center-element-inner editor-icon tooltip">
                        <i className="fa fa-strikethrough disabled"/></div>
                    <div className="center-element-inner editor-icon tooltip">
                        <i className="fa fa-align-left disabled"/></div>
                    <div className="center-element-inner editor-icon tooltip">
                        <i className="fa fa-align-center disabled"/></div>
                    <div className="center-element-inner editor-icon tooltip">
                        <i className="fa fa-align-right disabled"/></div>
                    <div className="center-element-inner editor-icon tooltip">
                        <i className="fa fa-align-justify disabled"/></div>
                    {/*</div>*/}

                    {/*<div className="d-flex">*/}
                    <div className="center-element-inner editor-icon tooltip">
                        <span className="tooltip-text">Bold</span>
                        <i className="fa fa-indent"/>
                    </div>
                    <div className="center-element-inner editor-icon tooltip">
                        <span className="tooltip-text">Bold</span>
                        <i className="fa fa-indent"/>
                    </div>
                    {/*</div>*/}

                    {/*<div className="d-flex">*/}

                    <div className="center-element-inner editor-icon tooltip">
                        <span className="tooltip-text">Bold</span>
                        <i className="fa fa-file"/>
                    </div>
                    <div className="center-element-inner editor-icon tooltip">
                        <span className="tooltip-text">Bold</span>
                        <i className="fa fa-image"/>
                    </div>
                    <div className="center-element-inner editor-icon tooltip">
                        <span className="tooltip-text">Bold</span>
                        <i className="fa fa-link"/>
                    </div>
                    {/*</div>*/}


                    {/*<div className="d-flex">*/}

                    <div className="center-element-inner editor-icon tooltip">
                        <span className="tooltip-text">Bold</span>
                        <i className="fa fa-list-ul"/>
                    </div>
                    <div className="center-element-inner editor-icon tooltip">
                        <span className="tooltip-text">Bold</span>
                        <i className="fa fa-list-ol"/>
                    </div>
                    {/*</div>*/}


                    <div className="center-element-inner editor-icon tooltip">
                        <span className="tooltip-text">Bold</span>
                        <i className="fa fa-redo-alt"/>
                    </div>
                    <div className="center-element-inner editor-icon tooltip">
                        <span className="tooltip-text">Bold</span>
                        <i className="fa fa-undo-alt"/>
                    </div>


                </div>

                <iframe name="textField" onLoad={load} style={{width: "100%", minHeight: "50vh"}}>

                </iframe>


            </div>
        )
    }
}

// export default function NewPostTest() {
//
//     // const boldSelection = () => {
//     //     let action: ExecCommandStyle = {
//     //         style: 'color',
//     //         value: "red",
//     //         initial: (element: HTMLElement | null) => new Promise<boolean>(((resolve) => {
//     //             if (element?.style["color"]) {
//     //                 resolve(true)
//     //             } else {
//     //                 resolve(false)
//     //             }
//     //         }))
//     //     }
//     //
//     //     let x = execCommandStyle(action, "div")
//     //     console.log("Test Exec cmd")
//     // }
//
//     function load() {
//         textField.document.designMode = "On";
//     }
//
//     return (
//         <div className="w-9/12 bg-white mt-break mx-auto" style={{height: '100vh', boxShadow: '0 0 5px 5px #bac7c1'}}>
//             <div className="d-flex mx-3">
//                 <div className="w-2/12">
//                     <i className="fa fa-xs fa-check"><span className="ml-2 fs-1">Save</span></i>
//                 </div>
//                 <div className="d-flex justify-content-between content-between align-items-center child-mx-2-not-first">
//                     <i className="fa fa-xs fa-arrow-left"/>
//                     <i className="fa fa-xs fa-arrow-right"/>
//                 </div>
//                 <div className="d-flex justify-content-end w-2/12 content-end align-items-center child-mx-2-not-first">
//                     <i className="fa fa-xs fa-desktop"><span className="ml-2 fs-1">Desktop</span></i>
//                 </div>
//                 <div className="d-flex justify-content-end w-2/12 content-end align-items-center child-mx-2-not-first">
//                     <i className="fa fa-xs fa-wrench"><span className="ml-2 fs-1">Tools</span></i>
//                 </div>
//                 <div className="d-flex align-items-center justify-end justify-content-end flex-1 child-mx-2-not-first">
//                     <div
//                         className="d-flex justify-content-between content-between align-items-center child-mx-2-not-first">
//                         <i className="fa fa-xs fa-cog"><span className="ml-2 fs-1">Pages</span></i>
//                         <i className="fa fa-xs fa-fill-drip"><span className="ml-2 fs-1">Themes</span></i>
//                         <i className="fa fa-xs fa-globe"><span className="ml-2 fs-1">Site</span></i>
//                     </div>
//                 </div>
//             </div>
//             <div className="d-flex justify-between mx-3 mt-5 child-mx-1 ml-auto">
//                 {/*<div className="d-flex content-between">*/}
//                 <div className="center-element-inner editor-icon tooltip" onClick={boldSelection}><i
//                     className="fa fa-bold"/>
//                 </div>
//                 <div className="center-element-inner editor-icon tooltip" onClick={italicSelection}><i
//                     className="fa fa-italic"/></div>
//                 <div className="center-element-inner editor-icon tooltip" onClick={underlineSelection}><i
//                     className="fa fa-underline"/></div>
//                 <div className="center-element-inner editor-icon tooltip" onClick={underlineSelection}><i
//                     className="fa fa-strikethrough"/></div>
//                 <div className="center-element-inner editor-icon tooltip" onClick={alignLeftSelection}><i
//                     className="fa fa-align-left"/></div>
//                 <div className="center-element-inner editor-icon tooltip" onClick={alignCenterSelection}><i
//                     className="fa fa-align-center"/></div>
//                 <div className="center-element-inner editor-icon tooltip" onClick={alignRightSelection}><i
//                     className="fa fa-align-right"/></div>
//                 <div className="center-element-inner editor-icon tooltip" onClick={alignJustifySelection}><i
//                     className="fa fa-align-justify"/></div>
//                 {/*</div>*/}
//
//                 {/*<div className="d-flex">*/}
//                 <div className="center-element-inner editor-icon tooltip">
//                     <span className="tooltip-text">Bold</span>
//                     <i className="fa fa-indent"/>
//                 </div>
//                 <div className="center-element-inner editor-icon tooltip">
//                     <span className="tooltip-text">Bold</span>
//                     <i className="fa fa-indent"/>
//                 </div>
//                 {/*</div>*/}
//
//                 {/*<div className="d-flex">*/}
//
//                 <div className="center-element-inner editor-icon tooltip">
//                     <span className="tooltip-text">Bold</span>
//                     <i className="fa fa-file"/>
//                 </div>
//                 <div className="center-element-inner editor-icon tooltip">
//                     <span className="tooltip-text">Bold</span>
//                     <i className="fa fa-image"/>
//                 </div>
//                 <div className="center-element-inner editor-icon tooltip">
//                     <span className="tooltip-text">Bold</span>
//                     <i className="fa fa-link"/>
//                 </div>
//                 {/*</div>*/}
//
//
//
//                 {/*<div className="d-flex">*/}
//
//                 <div className="center-element-inner editor-icon tooltip">
//                     <span className="tooltip-text">Bold</span>
//                     <i className="fa fa-list-ul"/>
//                 </div>
//                 <div className="center-element-inner editor-icon tooltip">
//                     <span className="tooltip-text">Bold</span>
//                     <i className="fa fa-list-ol"/>
//                 </div>
//                 {/*</div>*/}
//
//
//                 <div className="center-element-inner editor-icon tooltip">
//                     <span className="tooltip-text">Bold</span>
//                     <i className="fa fa-redo-alt"/>
//                 </div>
//                 <div className="center-element-inner editor-icon tooltip">
//                     <span className="tooltip-text">Bold</span>
//                     <i className="fa fa-undo-alt"/>
//                 </div>
//
//
//             </div>
//
//             <iframe name="textField" onLoad={load} style={{width: "100%", minHeight: "50vh"}}>
//
//             </iframe>
//
//
//         </div>
//     )
// }
const mapStateToProps = (state: State) => {
    // @ts-ignore
    if (state.editorReducer) {
        return {
            // @ts-ignore
            state: state.editorReducer
        };
    }
}
export default connect(mapStateToProps)(TestNewPost);