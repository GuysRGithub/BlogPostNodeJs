import React from 'react'
import {execCommandStyle, ExecCommandStyle} from "../../../assets/ts/editor";
import {
    alignCenterSelection, alignJustifySelection,
    alignLeftSelection, alignRightSelection,
    boldSelection,
    italicSelection,
    underlineSelection
} from "../../../utils/EditorUitls";
declare var textField: Window
export default function NewPostTest() {

    // const boldSelection = () => {
    //     let action: ExecCommandStyle = {
    //         style: 'color',
    //         value: "red",
    //         initial: (element: HTMLElement | null) => new Promise<boolean>(((resolve) => {
    //             if (element?.style["color"]) {
    //                 resolve(true)
    //             } else {
    //                 resolve(false)
    //             }
    //         }))
    //     }
    //
    //     let x = execCommandStyle(action, "div")
    //     console.log("Test Exec cmd")
    // }

    function load(){
        textField.document.designMode="On";
    }

    return (
        <div className="w-9/12 bg-white mt-break mx-auto" style={{height: '100vh', boxShadow: '0 0 5px 5px #bac7c1'}}>
            <div className="d-flex mx-3">
                <div className="w-2/12">
                    <i className="fa fa-xs fa-check"><span className="ml-2 fs-1">Save</span></i>
                </div>
                <div className="d-flex justify-content-between content-between align-items-center child-mx-2-not-first">
                    <i className="fa fa-xs fa-arrow-left"/>
                    <i className="fa fa-xs fa-arrow-right"/>
                </div>
                <div className="d-flex justify-content-end w-2/12 content-end align-items-center child-mx-2-not-first">
                    <i className="fa fa-xs fa-desktop"><span className="ml-2 fs-1">Desktop</span></i>
                </div>
                <div className="d-flex justify-content-end w-2/12 content-end align-items-center child-mx-2-not-first">
                    <i className="fa fa-xs fa-wrench"><span className="ml-2 fs-1">Tools</span></i>
                </div>
                <div className="d-flex align-items-center justify-end justify-content-end flex-1 child-mx-2-not-first">
                    <div
                        className="d-flex justify-content-between content-between align-items-center child-mx-2-not-first">
                        <i className="fa fa-xs fa-cog"><span className="ml-2 fs-1">Pages</span></i>
                        <i className="fa fa-xs fa-fill-drip"><span className="ml-2 fs-1">Themes</span></i>
                        <i className="fa fa-xs fa-globe"><span className="ml-2 fs-1">Site</span></i>
                    </div>
                </div>
            </div>
            <div className="d-flex mx-3 mt-5 w-8/12 child-mx-1 ml-auto">
                <div className="d-flex">
                    <div className="center-element-inner editor-icon" onClick={boldSelection}><i className="fa fa-bold"/></div>
                    <div className="center-element-inner editor-icon" onClick={italicSelection}><i className="fa fa-italic"/></div>
                    <div className="center-element-inner editor-icon" onClick={underlineSelection}><i className="fa fa-underline"/></div>
                    <div className="center-element-inner editor-icon" onClick={alignLeftSelection}><i className="fa fa-align-left"/></div>
                    <div className="center-element-inner editor-icon" onClick={alignCenterSelection}><i className="fa fa-align-center"/></div>
                    <div className="center-element-inner editor-icon" onClick={alignRightSelection}><i className="fa fa-align-right"/></div>
                    <div className="center-element-inner editor-icon" onClick={alignJustifySelection}><i className="fa fa-align-justify"/></div>
                </div>

                <div className="d-flex">
                    <div className="center-element-inner editor-icon"><i className="fa fa-indent"/></div>
                    <div className="center-element-inner editor-icon"><i className="fa fa-indent"/></div>
                </div>

                <div className="d-flex">
                    <div className="center-element-inner editor-icon"><i className="fa fa-file"/></div>
                    <div className="center-element-inner editor-icon"><i className="fa fa-image"/></div>
                    <div className="center-element-inner editor-icon"><i className="fa fa-link"/></div>
                </div>

                <div className="d-flex">
                    <div className="center-element-inner editor-icon"><i className="fa fa-list-ul"/></div>
                    <div className="center-element-inner editor-icon"><i className="fa fa-list-ol"/></div>
                </div>

            </div>

            <iframe name="textField" onLoad={load}>

            </iframe>


        </div>
    )
}