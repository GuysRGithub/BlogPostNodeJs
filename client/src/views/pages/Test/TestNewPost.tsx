import React, {Component, useState} from 'react'
import {execCommandStyle, ExecCommandStyle} from "../../../assets/ts/editor";
import {getFirstParentOfSpan, getFirstParentWithTag, styleElement} from "../../../utils/editor_utils";
import {connect, useSelector} from "react-redux"
import setStyleNotChangeEditor, {
    changeFontFamilyElement,
    changeFontSizeElement,
    changeTagNewElement,
    setStyleChangeEditor, toggleAlignCenter, toggleAlignJustify, toggleAlignLeft, toggleAlignRight,
    toggleBold,
    toggleItalic,
    toggleUnderline
} from "../../../_actions/editor_actions";
import {State} from "react-toastify/dist/hooks/toastContainerReducer";
import {Login} from "../Auth/Login";
import {elementType, instanceOf} from "prop-types";
import MediaLibrary from "../../components/Upload/MediaLibrary";
// import store from '../reducers/store';


declare var textField: Window

const FONT_FAMILY_KEY = "FONT_FAMILY_KEY_EDITOR"
const FONT_SIZE_KEY = "FONT_SIZE_KEY_EDITOR"
const TAG_KEY = "TAG_KEY_EDITOR"

class TestNewPost extends Component {

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

        const charCode = evt.key;

        // @ts-ignore
        const editorState = this.props.state;
        // @ts-ignore
        const dispatch = this.props.dispatch;

        const selection = textField.window.getSelection()
        if (selection == null) return;

        const range = selection.getRangeAt(0)
        if (range == null) return;

        let rootSelection = selection.anchorNode
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

            ////////////////////////////////          CAREFULLY            ////////////////////////////////
            element.style['white-space'] = 'normal'
            // element.classList.add("fs-1", "font-medium")

            span.style['white-space'] = 'normal'

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

                /*      //////////////////////          ADD BREAK FOR SELECT AND EDIT IN IT             ///////////////////////     */
                span.innerHTML = '<br>'
                /*      //////////////////////          ADD REMAIN STRING TO NEW SPAN AND REMOVE TAKEN STRING FROM SELECTION              ///////////////////////     */
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
            element.style['white-space'] = 'normal'

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

        // const selectionNode = selection.anchorNode as HTMLElement | null
        // Get parent node of selection node
        // Because the selection is always the text node so need to get parent twice to get
        // the actual parent of the select element
        let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
        console.log("Selection Node Handle...", selectionNode)
        if (selectionNode == null) return;

        this.handleUpdateUI(selectionNode)

    }

    toggleActiveBold(element: HTMLElement) {
        let iconBold = document.getElementById("editor-icon-bold")
        if (iconBold == null) return;

        if (element.style == null) return;

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

        if (element.style == null) return;

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
        if (element.style == null) return;

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
        const elementAlign = getFirstParentOfSpan(element)

        if (elementAlign == null) return;
        if (iconAlignLeft == null) return;
        if (elementAlign.style == null) return;

        if (elementAlign.style['text-align'] === 'left') {
            if (iconAlignLeft.classList.contains("active")) return;
            iconAlignLeft.classList.toggle("active")
        } else {
            if (iconAlignLeft.classList.contains("active")) {
                iconAlignLeft.classList.toggle("active")
            }
        }

        // let parentElement = element.parentNode as HTMLElement
        // while (parentElement != null && (parentElement as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
        //
        //     if (!parentElement.style) return;
        //     if (parentElement.style['text-align'] === 'left') {
        //         if (iconAlignLeft.classList.contains("active")) return;
        //         iconAlignLeft.classList.toggle("active")
        //     }
        //
        //     parentElement = parentElement.parentNode as HTMLElement
        // }
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
        const elementAlign = getFirstParentOfSpan(element)
        if (iconAlignLeft == null) return;
        if (elementAlign == null) return;
        if (elementAlign.style == null) return;

        if (elementAlign.style['text-align'] === 'right') {
            if (iconAlignLeft.classList.contains("active")) return;
            iconAlignLeft.classList.toggle("active")
        } else {
            if (iconAlignLeft.classList.contains("active")) {
                iconAlignLeft.classList.toggle("active")
            }
        }

        // let parentElement = element.parentNode as HTMLElement
        // while (parentElement != null && (parentElement as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
        //
        //     if (!parentElement.style) return;
        //     if (parentElement.style['text-align'] === 'right') {
        //         if (iconAlignLeft.classList.contains("active")) return;
        //         iconAlignLeft.classList.toggle("active")
        //     }
        //
        //     parentElement = parentElement.parentNode as HTMLElement
        // }

    }

    toggleActiveAlignCenter(element: HTMLElement) {

        let iconAlignLeft = document.getElementById("editor-icon-align-center")
        const elementAlign = getFirstParentOfSpan(element)
        if (iconAlignLeft == null) return;
        if (elementAlign == null) return;
        if (elementAlign.style == null) return;

        if (elementAlign.style['text-align'] === 'center') {
            if (iconAlignLeft.classList.contains("active")) return;
            iconAlignLeft.classList.toggle("active")
        } else {
            if (iconAlignLeft.classList.contains("active")) {
                iconAlignLeft.classList.toggle("active")
            }
        }

        // let parentElement = element.parentNode as HTMLElement
        // while (parentElement != null && (parentElement as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
        //
        //     if (!parentElement.style) return;
        //     if (parentElement.style['text-align'] === 'center') {
        //         if (iconAlignLeft.classList.contains("active")) return;
        //         iconAlignLeft.classList.toggle("active")
        //     }
        //
        //     parentElement = parentElement.parentNode as HTMLElement
        // }

    }

    toggleActiveAlignJustify(element: HTMLElement) {

        let iconAlignJustify = document.getElementById("editor-icon-align-justify")
        const elementAlign = getFirstParentOfSpan(element)

        if (iconAlignJustify == null) return;
        if (elementAlign == null) return;
        if (elementAlign.style == null) return;

        if (elementAlign.style['text-align'] === 'justify') {
            if (iconAlignJustify.classList.contains("active")) return;
            iconAlignJustify.classList.toggle("active")
        } else {
            if (iconAlignJustify.classList.contains("active")) {
                iconAlignJustify.classList.toggle("active")
            }
        }


        // let parentElement = element.parentNode as HTMLElement
        // while (parentElement != null && (parentElement as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
        //
        //     if (!parentElement.style) return;
        //     if (parentElement.style['text-align'] === 'justify') {
        //         if (iconAlignLeft.classList.contains("active")) return;
        //         iconAlignLeft.classList.toggle("active")
        //     }
        //
        //     parentElement = parentElement.parentNode as HTMLElement
        // }
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
            // if (editorState.isAlignLeft) {
            //     element.style["text-align"] = "left"
            // }
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
        let dispatch = this.props.dispatch;
        let textFieldDoc = textField.document;

        const scope = this;

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

        const options = document.getElementsByClassName("options")

        for (let i = 0; i < options.length; i++) {

            // const optionsList = document.getElementById("options")?.children
            const optionsList = options[i].children

            if (optionsList == null) return

            for (let i = 0; i < optionsList.length; i++) {
                const option = optionsList[i] as HTMLElement
                console.log("Options List", option.innerText)

                option.addEventListener("click", function () {
                    console.log("Option list Clicked", option.getAttribute("data-value"))
                    const key = option.getAttribute("data-key")
                    const value = option.getAttribute("data-value") ?? "p"
                    if (key === TAG_KEY) {
                        dispatch(changeTagNewElement(value))
                        scope.handleTagOptionClicked(value)
                        const input = document.getElementById("input-select-tag-new-element") as HTMLElement
                        if (input == null) return
                        input.innerText = option.innerText

                    } else if (key === FONT_SIZE_KEY) {
                        dispatch(changeFontSizeElement(value))
                        scope.handleFontSizeClicked(value)
                        const input = document.getElementById("input-select-font-size") as HTMLElement
                        if (input == null) return
                        input.style['font-size'] = `${value}px`
                        input.innerText = option.innerText

                    } else if (key === FONT_FAMILY_KEY) {
                        dispatch(changeFontFamilyElement(value))
                        scope.handleFontFamilyClicked(value)

                        const input = document.getElementById("input-select-font-family") as HTMLElement
                        if (input == null) return
                        input.style['font-family'] = value
                        input.innerText = option.innerText
                    }


                })
            }
        }
    }

    handleTagOptionClicked(value: string) {
        /************************************************************************************************
         * CHANGE THE TAG OF CURRENT SELECT ELEMENT
         ************************************************************************************************/
        let selection = textField.window.getSelection()
        if (selection == null) return

        let selectionNode = selection.anchorNode as HTMLElement | null
        const pElement = getFirstParentOfSpan(selectionNode)

        if (pElement == null || pElement.parentElement == null) return;
        let d = document.createElement(value);
        d.innerHTML = pElement.parentElement.innerHTML;
        pElement.parentElement.parentElement?.replaceChild(d, pElement.parentElement);

        /************************************************************************************************
         *****************   !END CHANGE THE TAG OF CURRENT SELECT ELEMENT COMMENT    *******************
         ************************************************************************************************/
    }

    handleFontFamilyClicked(value: string) {

        /************************************************************************************************
         * CHANGE FONT FAMILY OF SPAN ELEMENT
         ************************************************************************************************/
        let selection = textField.window.getSelection()
        if (selection == null) return

        let selectionNode = selection.anchorNode as HTMLElement | null
        const pElement = getFirstParentOfSpan(selectionNode)

        if (pElement == null) return;

        pElement.style['font-family'] = value
    }

    handleFontSizeClicked(value: string) {
        /************************************************************************************************
         * CHANGE FONT FAMILY OF SPAN ELEMENT
         ************************************************************************************************/
        let selection = textField.window.getSelection()
        if (selection == null) return

        let selectionNode = selection.anchorNode as HTMLElement | null
        const pElement = getFirstParentWithTag("span", selectionNode)

        if (pElement == null) return;

        pElement.style['font-size'] = `${value}px`
    }

    handleIconToggleSelection(style: string, value: string, tag: string = "span", useParent: boolean = false) {
        /************************************************************************************************
         * CHANGE FONT WEIGHT OF SPAN ELEMENT
         ************************************************************************************************/


        let selection = textField.window.getSelection()
        if (selection == null) return
        let selectionStyle = selection.anchorNode as HTMLElement | null

        console.log("Selection count", selection.anchorNode)

        /*      //////////////////////          IF ONLY WANT APPLY STYLE FOR NEW SPAN WHEN SELECT AT THE END OF ELEMENT THEN UN COMMENT IT             ///////////////////////     */
        // const range = selection.getRangeAt(0)
        // let currentContent = range.commonAncestorContainer.textContent
        // // Get the string after cursor of element
        // let remainStr = currentContent?.slice(range.startOffset).toString().trim();
        // if (remainStr?.length === 0) {
        //     if (tag === "span") {
        //         const span = document.createElement(tag)
        //         span.style['white-space'] = 'pre'
        //         span.innerHTML = "<br>"
        //         const parent = getFirstParentOfSpan(selectionStyle)
        //         parent?.appendChild(span)
        //         span.style[style] = value
        //         console.log("Span style.............ssssss", span)
        //         return;
        //     }
        // }

        // const spanSelected = getFirstParentWithTag(tag, selectionStyle)

        const range = selection.getRangeAt(0)
        let startSelected = range.startOffset
        let endSelected = range.endOffset

        if (startSelected !== endSelected) {
            const textContent = range.commonAncestorContainer.textContent
            if (textContent == null) return;
            const selectText = textContent?.slice(startSelected, endSelected).toString();
            const remainText = textContent.slice(endSelected).toString()
            if (selectText == null) return;

            let span = document.createElement("span")
            span.style.cssText = getFirstParentWithTag("span", selectionStyle)?.style.cssText ?? span.style.cssText
            span.innerText = selectText
            span.style[style] = value
            getFirstParentOfSpan(selectionStyle)?.appendChild(span)

            console.log("Span Selected", span)
            range.commonAncestorContainer.textContent = textContent.replace(selectText, "")

            /************************************************************************************************
             * IF HAS REMAIN STRING ADD NEW SPAN FOR REMAIN STR
             ************************************************************************************************/
            if (remainText.length === 0) return;

            range.commonAncestorContainer.textContent = textContent.replace(remainText, "").replace(selectText, "")
            let spanRemain = document.createElement("span")
            spanRemain.style.cssText = getFirstParentWithTag("span", selectionStyle)?.style.cssText ?? span.style.cssText
            spanRemain.innerText = remainText
            getFirstParentOfSpan(selectionStyle)?.appendChild(spanRemain)
            return;
        }

        if (useParent) {
            selectionStyle = getFirstParentOfSpan(selectionStyle)
        } else {
            selectionStyle = getFirstParentWithTag(tag, selectionStyle)
        }

        console.log("Fucking selection", selectionStyle)
        if (selectionStyle == null || selectionStyle.style == null) return;

        if (selectionStyle.style[style] === value) {
            selectionStyle.style[style] = ``
        } else {
            selectionStyle.style[style] = value
        }

        this.handleUpdateUI(selectionStyle)
    }

    handleUpdateUI(selectElement: HTMLElement) {

        this.toggleActiveBold(selectElement)
        this.toggleActiveItalic(selectElement)
        this.toggleActiveUnderline(selectElement)
        this.toggleActiveAlignLeft(selectElement)
        this.toggleActiveAlignRight(selectElement)
        this.toggleActiveAlignCenter(selectElement)
        this.toggleActiveAlignJustify(selectElement)
        this.toggleActiveAlignJustify(selectElement)
    }

    /************************************************************************************************
     * MOVE FROM RENDER
     ************************************************************************************************/
    load() {
        textField.document.designMode = "On";
    }


    render() {

        const scope = this;
        // @ts-ignore
        let dispatch = this.props.dispatch

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

            scope.handleIconToggleSelection('font-weight', 'bold')

        }

        async function italicSelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('font-style', 'italic')
            onIconEditorClicked(event)
            dispatch(toggleItalic())
            scope.handleIconToggleSelection('font-style', 'italic')

        }

        async function underlineSelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('text-decoration', 'underline')
            onIconEditorClicked(event)
            dispatch(toggleUnderline())

            scope.handleIconToggleSelection('text-decoration', 'underline')

        }

        async function alignLeftSelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('text-align', 'left')
            onIconEditorClicked(event)
            dispatch(toggleAlignLeft())

            scope.handleIconToggleSelection('text-align', 'left', "p", true)
        }

        async function alignRightSelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('text-align', 'right')
            onIconEditorClicked(event)
            dispatch(toggleAlignRight())

            scope.handleIconToggleSelection('text-align', 'right', "p", true)

        }

        async function alignCenterSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            dispatch(toggleAlignCenter())

            scope.handleIconToggleSelection('text-align', 'center', "p", true)
        }

        async function alignJustifySelection(event: React.MouseEvent<HTMLElement>) {
            // await styleElement('text-align', 'justify')

            onIconEditorClicked(event)
            dispatch(toggleAlignJustify())

            scope.handleIconToggleSelection("text-align", 'justify', "p", true)

            // let selection = textField.window.getSelection()
            //
            // if (selection == null) return
            //
            // // Get parent node of selection node
            // // Because the selection is always the text node so need to get parent twice to get
            // // the actual parent of the select element
            // let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
            // while (selectionNode != null && selectionNode.parentNode && (selectionNode?.parentNode as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
            //     selectionNode = selectionNode.parentNode as HTMLElement | null
            // }
            // if (selectionNode == null) return;
            //
            // selectionNode.style['text-align'] = 'justify'
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

        const mapTag = [
            {"key": "Normal Text", "value": "p"},
            {"key": "Heading 1", "value": "h1"},
            {"key": "Heading 2", "value": "h2"},
            {"key": "Heading 3", "value": "h3"},
            {"key": "Heading 4", "value": "h4"},
            {"key": "Heading 5", "value": "h5"},
            {"key": "Heading 6", "value": "h6"},
        ]

        const mapFontSize = [];

        for (let i = 12; i <= 36; i += 2) {
            mapFontSize.push(i);
        }
        const mapFont = ["JoseSans", "Ubuntu", "Roboto", "Raleway", "Rubik"]

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

                        <ul className="custom-dropdown" id="custom-dropdown">
                            <p id="input-select-tag-new-element" className="pl-5">Normal text</p>

                            <ul className="options" id="options">
                                {mapTag.map(function (item) {
                                    return <li data-value={item.value} data-key={TAG_KEY}><span
                                        className={item.value}>{item.key}</span></li>
                                })}
                            </ul>
                        </ul>

                        <ul className="custom-dropdown" id="custom-dropdown">
                            <p id="input-select-font-family" className="pl-5">Roboto</p>

                            <ul className="options" id="options">
                                {mapFont.map(function (item) {
                                    return <li data-value={item} data-key={FONT_FAMILY_KEY}><span
                                        className={`font-${item.toLowerCase()}`}>{item}</span>
                                    </li>
                                })}
                            </ul>
                        </ul>

                        <ul className="custom-dropdown" id="custom-dropdown">
                            <p id="input-select-font-size" className="pl-5">18</p>
                            <ul className="options" id="options">
                                {mapFontSize.map(function (item) {
                                    return <li data-value={item} data-key={FONT_SIZE_KEY}><span
                                        style={{fontSize: `${item}px`}}>{item}</span></li>
                                })}
                            </ul>
                        </ul>

                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-bold" data-cmd="bold"
                             onClick={boldSelection}>
                            <i className="fa fa-bold disabled"/>
                        </div>

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
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-align-justify"
                             onClick={alignJustifySelection}>
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
                            onLoad={this.load}
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