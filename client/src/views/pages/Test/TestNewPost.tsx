import React, {Component, useState} from 'react'
import {execCommandStyle, ExecCommandStyle} from "../../../assets/ts/editor";
import {getFirstParentWithTag, styleElement} from "../../../utils/editor_utils";
import {connect, useSelector} from "react-redux"
import setStyleNotChangeEditor, {
    changeTagNewElement,
    setStyleChangeEditor, toggleAlignCenter, toggleAlignJustify, toggleAlignLeft, toggleAlignRight,
    toggleBold,
    toggleItalic,
    toggleUnderline
} from "../../../_actions/editor_actions";
import {State} from "react-toastify/dist/hooks/toastContainerReducer";
import {Login} from "../Auth/Login";
import {instanceOf} from "prop-types";
import MediaLibrary from "../../components/Upload/MediaLibrary";
// import store from '../reducers/store';


declare var textField: Window


class TestNewPost extends Component {

    // editorState: Object = {}

    constructor(props: Object) {
        super(props);
        this.handleIframeKeyPress = this.handleIframeKeyPress.bind(this)
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
        this.applyEditorStyleElement = this.applyEditorStyleElement.bind(this)
        this.handleImageChosen = this.handleImageChosen.bind(this)
    }

    handleImageChosen(imagePath: string) {
        console.log("Insert image ...", imagePath)
        const element = document.createElement("img")
        element.src = imagePath
        element.classList.add("w-9/12")
        textField.document.body.appendChild(element)
    }

    handleIframeKeyPress(evt: KeyboardEvent) {

        let charCode = evt.key;

        // @ts-ignore
        let editorState = this.props.state;
        // @ts-ignore
        let dispatch = this.props.dispatch;

        let selection = textField.window.getSelection()
        if (selection == null) return;

        const range = selection.getRangeAt(0)

        if (range == null) return;

        let rootSelection = selection?.anchorNode
        console.log("Root Selection", rootSelection)
        console.log("range", range.commonAncestorContainer.textContent?.slice(range.startOffset))

        const tagNewElement = editorState.tagNewElement

        // If body then insert <p> element
        if (rootSelection != null && (rootSelection as HTMLElement).tagName && (rootSelection as HTMLElement).tagName.toLowerCase() === 'body') {

            evt.preventDefault()

            console.log("If Root selection is body...")

            //////////////////////////////////////////////////
            let element = document.createElement(tagNewElement)

            const span = document.createElement('span')
            // Apply style and set not changed style
            this.applyEditorStyleElement(span)

            dispatch(setStyleNotChangeEditor())

            span.innerText = charCode

            element.appendChild(span)

            rootSelection.appendChild(element)

            element.style['white-space'] = 'pre'
            // element.classList.add("fs-1", "font-medium")

            span.style['white-space'] = 'pre'

            const startNode = element.childNodes[0]
            // const endNode = element.childNodes[0]
            // div.appendChild(fragment)
            console.log("range", range)
            // range.insertNode(div)
            // console.log("Element", element)

            const newRange = document.createRange()
            // var sel = window.getSelection()
            // @ts-ignore
            newRange.setStart(startNode, 1)
            // newRange.setEnd(endNode, 1)
            newRange.collapse(true)

            selection.removeAllRanges()
            selection.addRange(newRange)

            return;
        }

        // Char code is enter
        console.log("Char code is enter ... or styled change", charCode === 'Enter', charCode, "Styled", editorState.isStyleChanged)
        if (editorState.isStyleChanged || charCode === 'Enter') {

            evt.preventDefault()

            let selection = textField.window.getSelection()

            if (selection == null) return

            // Get parent node of selection node
            // Because the selection is always the text node so need to get parent twice to get
            // the actual parent of the select element the parent <p> of the <span>
            // let parentNode = selection.anchorNode?.parentNode?.parentNode
            let parentNode = selection.anchorNode?.parentNode
            while (parentNode != null && parentNode.parentNode && (parentNode?.parentNode as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
                parentNode = parentNode.parentNode as HTMLElement | null
            }

            // console.log("Selection", selection.anchorNode?.parentNode?.parentNode?.nodeName)
            // Get range selection
            const range = selection.getRangeAt(0)

            let element;
            // If is enter (break) then insert container (p or div)
            if (charCode === 'Enter') {
                console.log("If charCode === Enter...")
                // Get the text of selection element
                let currentContent = range.commonAncestorContainer.textContent
                console.log("Current Get Text Element", range.commonAncestorContainer)
                // Get the string after cursor of element
                let remainStr = currentContent?.slice(range.startOffset).toString().trim();

                if (currentContent && currentContent.toString().trim().length > 0) {

                }

                ///////////////////////////////////////////////////////////////////////////////
                element = document.createElement(tagNewElement)
                const span = document.createElement('span')

                this.applyEditorStyleElement(span, true);

                span.innerHTML = '<br>'
                if (remainStr) {
                    span.innerText += remainStr
                    let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
                    console.log("Selection Node", selectionNode)
                    // console.log("Selection Node", selectionNode)
                    if (selectionNode == null) return;
                    const newContent = currentContent?.replace(remainStr, "")
                    if (newContent) {
                        selectionNode.innerText = newContent
                    }
                }
                // element.innerHTML = ' '
                // console.log("FUCk", span.childNodes[0])
                element.appendChild(span)

            } else {
                console.log("If charCode !== Enter...")
                element = document.createElement("span")
                element.innerText = charCode
            }

            // If has style changed then need to apply style to it
            this.applyEditorStyleElement(element)
            console.log("ParentNode", parentNode)
            //  If have container then need to append element inside container instead fragment to not break the paragraph
            if (parentNode != null && parentNode.nodeName?.toLowerCase() === 'p' && editorState.isStyleChanged && element.tagName.toLowerCase() !== "p") {
                console.log("If parentNode is p...")
                // If have empty span child then use this as element (no need to append new element)
                if (parentNode.children && parentNode.children[0] && parentNode.children[0].tagName.toLowerCase() == "span" && (parentNode.children[0] as HTMLElement).innerText.trim().length == 0) {
                    console.log("If has empty span child...")
                    const newElement = parentNode.children[0] as HTMLElement;
                    newElement.innerText = element.innerText;
                    // Not render so cannot get css Text
                    // newElement.style.cssText = document.defaultView?.getComputedStyle(element, "").cssText ?? newElement.style.cssText;
                    this.applyEditorStyleElement(newElement, true)
                    element = newElement;
                    console.log("New Element Style", newElement)
                } else {
                    console.log("If not has empty span child...")
                    parentNode.appendChild(element)
                }
                // parentNode.appendChild(element)

            } else {
                console.log("If parentNode is not p...")
                // Loop through to get the root <p> element
                let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
                while (selectionNode != null && selectionNode.parentNode && (selectionNode?.parentNode as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
                    selectionNode = selectionNode.parentNode as HTMLElement | null
                }
                console.log("Selection Node Insert", selectionNode)
                console.log("Selection Node Insert", selectionNode?.children[0])

                // if (selectionNode == null) return;

                if (selectionNode != null && selectionNode.tagName && selectionNode.tagName.toLowerCase() !== "body") {
                    if (selectionNode.nextSibling) {
                        textField.document.body.insertBefore(element, selectionNode.nextSibling)
                    } else {
                        textField.document.body.appendChild(element)
                    }
                } else {
                    textField.document.body.appendChild(element)
                }
            }

            // Keep white space to can set start selection in this node
            element.style['white-space'] = 'pre'

            const startNode = element.childNodes[0]
            // const endNode = element.childNodes[0]
            // div.appendChild(fragment)
            console.log("range", range)
            // range.insertNode(div)

            const newRange = document.createRange()
            newRange.setStart(startNode, 1)
            // newRange.setEnd(endNode, 1)
            newRange.collapse(true)

            selection.removeAllRanges()
            selection.addRange(newRange)

            dispatch(setStyleNotChangeEditor())

        }


    }

    handleSelectionChange() {
        let selection = textField.window.getSelection()

        if (selection == null) return

        // Get parent node of selection node
        // Because the selection is always the text node so need to get parent twice to get
        // the actual parent of the select element
        let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
        console.log("Selection Node Handle...", selectionNode)
        // console.log("Selection Node", selectionNode)
        if (selectionNode == null) return;

        // console.log("Has bold", selectionNode.style['font-weight'] === 'bold')
        this.toggleActiveBold(selectionNode)
        this.toggleActiveItalic(selectionNode)
        this.toggleActiveUnderline(selectionNode)
        this.toggleActiveAlignLeft(selectionNode)
        this.toggleActiveAlignRight(selectionNode)
        this.toggleActiveAlignCenter(selectionNode)
        this.toggleActiveAlignJustify(selectionNode)

    }

    toggleActiveBold(element: HTMLElement) {
        let iconBold = document.getElementById("editor-icon-bold")
        if (iconBold == null) return;

        if (element.style['font-weight'] === 'bold') {
            if (iconBold.classList.contains("active")) return;
            iconBold.classList.toggle("active")
        } else {
            if (iconBold.classList.contains("active")) {
                iconBold.classList.toggle("active")
            }
        }

        for (let i = 0; i < element.children.length; i++) {
            if (!(element.children[i] instanceof HTMLElement)) return;
            let child = element.children[i] as HTMLElement
            if (child.style['font-weight'] === 'bold') {
                if (iconBold.classList.contains("active")) return;
                iconBold.classList.toggle("active")
            }
        }

    }

    toggleActiveItalic(element: HTMLElement) {
        let iconItalic = document.getElementById("editor-icon-italic")
        if (iconItalic == null) return;

        if (element.style['font-style'] === 'italic') {
            if (iconItalic.classList.contains("active")) return;
            iconItalic.classList.toggle("active")
        } else {
            if (iconItalic.classList.contains("active")) {
                iconItalic.classList.toggle("active")
            }
        }

        for (let i = 0; i < element.children.length; i++) {
            if (!(element.children[i] instanceof HTMLElement)) return;
            let child = element.children[i] as HTMLElement
            if (child.style['font-style'] === 'italic') {
                if (iconItalic.classList.contains("active")) return;
                iconItalic.classList.toggle("active")
            }
        }
    }

    toggleActiveUnderline(element: HTMLElement) {

        let iconUnderline = document.getElementById("editor-icon-underline")
        if (iconUnderline == null) return;

        if (element.style['text-decoration'] === 'underline') {
            if (iconUnderline.classList.contains("active")) return;
            iconUnderline.classList.toggle("active")
        } else {
            if (iconUnderline.classList.contains("active")) {
                iconUnderline.classList.toggle("active")
            }
        }


        for (let i = 0; i < element.children.length; i++) {
            if (!(element.children[i] instanceof HTMLElement)) return;
            let child = element.children[i] as HTMLElement
            if (child.style['text-decoration'] === 'underline') {
                if (iconUnderline.classList.contains("active")) return;
                iconUnderline.classList.toggle("active")
            }
        }

    }

    toggleActiveAlignLeft(element: HTMLElement) {

        let iconAlignLeft = document.getElementById("editor-icon-align-left")
        if (iconAlignLeft == null) return;

        if (element.style['text-align'] === 'left') {
            if (iconAlignLeft.classList.contains("active")) return;
            iconAlignLeft.classList.toggle("active")
        } else {
            if (iconAlignLeft.classList.contains("active")) {
                iconAlignLeft.classList.toggle("active")
            }
        }


        let parentElement = element.parentNode as HTMLElement
        while (parentElement != null && (parentElement as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {

            if (!parentElement.style) return;
            if (parentElement.style['text-align'] === 'left') {
                if (iconAlignLeft.classList.contains("active")) return;
                iconAlignLeft.classList.toggle("active")
            }

            parentElement = parentElement.parentNode as HTMLElement
        }
        // for (let i = 0; i < element.children.length; i++) {
        //     if (!(element.children[i] instanceof HTMLElement)) return;
        //     let child = element.children[i] as HTMLElement
        //     if (child.style['text-align'] === 'left') {
        //         if (iconAlignLeft.classList.contains("active")) return;
        //         iconAlignLeft.classList.toggle("active")
        //     }
        // }

    }

    toggleActiveAlignRight(element: HTMLElement) {

        let iconAlignLeft = document.getElementById("editor-icon-align-right")
        if (iconAlignLeft == null) return;

        if (element.style['text-align'] === 'right') {
            if (iconAlignLeft.classList.contains("active")) return;
            iconAlignLeft.classList.toggle("active")
        } else {
            if (iconAlignLeft.classList.contains("active")) {
                iconAlignLeft.classList.toggle("active")
            }
        }


        let parentElement = element.parentNode as HTMLElement
        while (parentElement != null && (parentElement as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {

            if (!parentElement.style) return;
            if (parentElement.style['text-align'] === 'right') {
                if (iconAlignLeft.classList.contains("active")) return;
                iconAlignLeft.classList.toggle("active")
            }

            parentElement = parentElement.parentNode as HTMLElement
        }

    }

    toggleActiveAlignCenter(element: HTMLElement) {

        let iconAlignLeft = document.getElementById("editor-icon-align-center")
        if (iconAlignLeft == null) return;

        if (element.style['text-align'] === 'center') {
            if (iconAlignLeft.classList.contains("active")) return;
            iconAlignLeft.classList.toggle("active")
        } else {
            if (iconAlignLeft.classList.contains("active")) {
                iconAlignLeft.classList.toggle("active")
            }
        }


        let parentElement = element.parentNode as HTMLElement
        while (parentElement != null && (parentElement as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {

            if (!parentElement.style) return;
            if (parentElement.style['text-align'] === 'center') {
                if (iconAlignLeft.classList.contains("active")) return;
                iconAlignLeft.classList.toggle("active")
            }

            parentElement = parentElement.parentNode as HTMLElement
        }

    }

    toggleActiveAlignJustify(element: HTMLElement) {

        let iconAlignLeft = document.getElementById("editor-icon-align-justify")
        if (iconAlignLeft == null) return;

        if (element.style['text-align'] === 'justify') {
            if (iconAlignLeft.classList.contains("active")) return;
            iconAlignLeft.classList.toggle("active")
        } else {
            if (iconAlignLeft.classList.contains("active")) {
                iconAlignLeft.classList.toggle("active")
            }
        }


        let parentElement = element.parentNode as HTMLElement
        while (parentElement != null && (parentElement as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {

            if (!parentElement.style) return;
            if (parentElement.style['text-align'] === 'justify') {
                if (iconAlignLeft.classList.contains("active")) return;
                iconAlignLeft.classList.toggle("active")
            }

            parentElement = parentElement.parentNode as HTMLElement
        }
    }

    applyEditorStyleElement(element: HTMLElement, forceApply: boolean = false) {
        // @ts-ignore
        let editorState = this.props.state

        if (editorState.isStyleChanged || forceApply) {
            if (editorState.boldEnable) {
                element.style["font-weight"] = "bold"
            }
            if (editorState.italicEnable) {
                element.style["font-style"] = "italic"
            }
            if (editorState.underlineEnable) {
                element.style["text-decoration"] = "underline"
            }
            if (editorState.isAlignLeft) {
                element.style["text-align"] = "left"
            }
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
        // let state = this.props

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

        let dispatch = this.props.dispatch

        let textFieldDoc = textField.document;

        if (textFieldDoc.addEventListener) {
            textFieldDoc.addEventListener("keypress", this.handleIframeKeyPress, false);
            textFieldDoc.addEventListener("selectionchange", this.handleSelectionChange, false);
            /************************************************************************************************
             * Hide Popup Selection when click outside
             ************************************************************************************************/
            textFieldDoc.addEventListener("click", function (e) {
                let dropdown = document.getElementById("dropdown")
                if (e == null || dropdown == null || e.target ! instanceof Node) return
                const target = e.target as Node
                if (!dropdown.contains(target)) {
                    dropdown.classList.remove("show")
                }
            })
            textFieldDoc.head.innerHTML = document.head.innerHTML
            // doc.addEventListener("keyup", handleIframeKeyUp, false);
        } else {
            textFieldDoc.onkeypress = this.handleIframeKeyPress;
        }

        const optionsList = document.getElementById("options")?.children

        if (optionsList == null) return

        for (let i = 0; i < optionsList.length; i++) {
            const option = optionsList[i] as HTMLElement
            console.log("Options List", option.innerText)
            option.addEventListener("click", function () {
                console.log("Option list Clicked", option.getAttribute("data-value"))
                const tag = option.getAttribute("data-value") ?? "p"
                const input = document.getElementById("input-select-tag-new-element") as HTMLElement
                dispatch(changeTagNewElement(tag))
                if (input == null) return
                input.innerText = option.innerText

                /************************************************************************************************
                 * CHANGE THE TAG OF CURRENT SELECT ELEMENT
                 ************************************************************************************************/
                let selection = textField.window.getSelection()
                if (selection == null) return

                let selectionNode = selection.anchorNode as HTMLElement | null
                const pElement = getFirstParentWithTag("span", selectionNode)

                if (pElement == null || pElement.parentElement == null) return;
                let d = document.createElement(tag);
                d.innerHTML = pElement.parentElement.innerHTML;
                pElement.parentElement.parentElement?.replaceChild(d, pElement.parentElement);

                /************************************************************************************************
                 *****************   !END CHANGE THE TAG OF CURRENT SELECT ELEMENT COMMENT    *******************
                 ************************************************************************************************/
            })
        }
    }

    render() {

        // @ts-ignore
        let dispatch = this.props.dispatch

        function load() {
            textField.document.designMode = "On";
        }

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

        async function alignLeftSelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('text-align', 'left')
            onIconEditorClicked(event)
            dispatch(toggleAlignLeft())

            let selection = textField.window.getSelection()

            if (selection == null) return

            // Get parent node of selection node
            // Because the selection is always the text node so need to get parent twice to get
            // the actual parent of the select element
            let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
            while (selectionNode != null && selectionNode.parentNode && (selectionNode?.parentNode as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
                selectionNode = selectionNode.parentNode as HTMLElement | null
            }
            if (selectionNode == null) return;

            selectionNode.style['text-align'] = 'left'
        }

        async function alignRightSelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('text-align', 'right')
            onIconEditorClicked(event)
            dispatch(toggleAlignRight())

            let selection = textField.window.getSelection()

            if (selection == null) return

            // Get parent node of selection node
            // Because the selection is always the text node so need to get parent twice to get
            // the actual parent of the select element
            let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
            while (selectionNode != null && selectionNode.parentNode && (selectionNode?.parentNode as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
                selectionNode = selectionNode.parentNode as HTMLElement | null
            }
            if (selectionNode == null) return;

            selectionNode.style['text-align'] = 'right'
        }

        async function alignCenterSelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('text-align', 'center')

            let selection = textField.window.getSelection()

            if (selection == null) return

            console.log("Fuck Selection", selection)
            // Get parent node of selection node
            // Because the selection is always the text node so need to get parent twice to get
            // the actual parent of the select element
            let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
            while (selectionNode != null && selectionNode.parentNode && (selectionNode?.parentNode as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
                selectionNode = selectionNode.parentNode as HTMLElement | null
            }
            if (selectionNode == null) return;
            if (selectionNode.style == null) return;

            selectionNode.style['text-align'] = 'center'
            onIconEditorClicked(event)
            dispatch(toggleAlignCenter())
        }

        async function alignJustifySelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('text-align', 'justify')

            onIconEditorClicked(event)
            dispatch(toggleAlignJustify())

            let selection = textField.window.getSelection()

            if (selection == null) return

            // Get parent node of selection node
            // Because the selection is always the text node so need to get parent twice to get
            // the actual parent of the select element
            let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
            while (selectionNode != null && selectionNode.parentNode && (selectionNode?.parentNode as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
                selectionNode = selectionNode.parentNode as HTMLElement | null
            }
            if (selectionNode == null) return;

            selectionNode.style['text-align'] = 'justify'
        }

        function pickImage() {
            const popup = document.getElementById("popup-pick-media")
            if (popup == null) return
            popup.style.display = "flex"
            popup.onclick = (e) => {
                if (e.target === popup) {
                    popup.style.display = "none"
                }
            }
        }

        // @ts-ignore
        return (
            <div className="w-11/12 bg-white mt-break mx-auto"
                 style={{height: '100vh', backgroundColor: "#ededed"}}>
                <div>

                    {/*<div className="d-flex mx-3">*/}
                    {/*    <div className="w-2/12">*/}
                    {/*        <i className="fa fa-xs fa-check"><span className="ml-2 fs-1">Save</span></i>*/}
                    {/*    </div>*/}
                    {/*    <div*/}
                    {/*        className="d-flex justify-content-between content-between align-items-center child-mx-2-not-first">*/}
                    {/*        <i className="fa fa-xs fa-arrow-left"/>*/}
                    {/*        <i className="fa fa-xs fa-arrow-right"/>*/}
                    {/*    </div>*/}
                    {/*    <div*/}
                    {/*        className="d-flex justify-content-end w-2/12 content-end align-items-center child-mx-2-not-first">*/}
                    {/*        <i className="fa fa-xs fa-desktop"><span className="ml-2 fs-1">Desktop</span></i>*/}
                    {/*    </div>*/}
                    {/*    <div*/}
                    {/*        className="d-flex justify-content-end w-2/12 content-end align-items-center child-mx-2-not-first">*/}
                    {/*        <i className="fa fa-xs fa-wrench"><span className="ml-2 fs-1">Tools</span></i>*/}
                    {/*    </div>*/}
                    {/*    <div*/}
                    {/*        className="d-flex align-items-center justify-end justify-content-end flex-1 child-mx-2-not-first">*/}
                    {/*        <div*/}
                    {/*            className="d-flex justify-content-between content-between align-items-center child-mx-2-not-first">*/}
                    {/*            <i className="fa fa-xs fa-cog"><span className="ml-2 fs-1">Pages</span></i>*/}
                    {/*            <i className="fa fa-xs fa-fill-drip"><span className="ml-2 fs-1">Themes</span></i>*/}
                    {/*            <i className="fa fa-xs fa-globe"><span className="ml-2 fs-1">Site</span></i>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="d-flex justify-between mx-3 mt-5 child-mx-1 ml-auto py-3 mr-0 rounded-md px-3"
                         style={{backgroundColor: "#f7f7f7"}}>
                        {/*<div className="d-flex content-between">*/}
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-bold" data-cmd="bold"
                             onClick={boldSelection}>
                            <i className="fa fa-bold disabled"/>
                        </div>

                        <ul className="dropdown" id="dropdown">
                            <p id="input-select-tag-new-element" className="pl-5">Normal text</p>
                            {/*type="text" value="Select Option" readOnly/>*/}
                            {/*<li><p>Select Option</p></li>*/}

                            <ul className="options" id="options">
                                <li data-value="p"><p>Normal Text</p></li>
                                <li data-value="h1"><h1>Heading 1</h1></li>
                                <li data-value="h2"><h2>Heading 2</h2></li>
                                <li data-value="h3"><h3>Heading 3</h3></li>
                                <li data-value="h4"><h4>Heading 4</h4></li>
                                <li data-value="h5"><h5>Heading 5</h5></li>
                                <li data-value="h6"><h6>Heading 6</h6></li>
                            </ul>
                        </ul>

                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-italic"
                             onClick={italicSelection}>
                            <i className="fa fa-italic disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-underline"
                             onClick={underlineSelection}><i
                            className="fa fa-underline disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-strike">
                            <i className="fa fa-strikethrough disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-align-left"
                             onClick={alignLeftSelection}>
                            <i className="fa fa-align-left disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-align-center"
                             onClick={alignCenterSelection}>
                            <i className="fa fa-align-center disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-align-right"
                             onClick={alignRightSelection}>
                            <i className="fa fa-align-right disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-justify">
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
                        <div className="center-element-inner editor-icon tooltip"
                             onClick={pickImage}>
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

                    <iframe name="textField" className="mx-auto mt-12 bg-white shadow rounded-md px-8 py-4"
                            onLoad={load}
                            style={{width: "80%", minHeight: "75vh"}}>
                        <style>

                        </style>

                    </iframe>

                </div>

                <MediaLibrary onImageChosenCallback={this.handleImageChosen} style={{
                    background: "rgb(10 10 10 / 60%)",
                    position: "fixed",
                    zIndex: "100",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    padding: "3rem",
                    display: "none"
                }}/>
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