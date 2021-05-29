import React, {Component} from 'react'
import {
    getFirstChildContainer,
    getFirstChildWithTag,
    getFirstParentContainer,
    getFirstParentWithTag,
    removeAllChildNodes
} from "../../../utils/editor_utils";
import {connect} from "react-redux"
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
import MediaLibrary from "../../components/Upload/MediaLibrary";
import PopupLink from "../../components/UI/Popup";
import ReactDOM from 'react-dom';

declare var textField: Window

const FONT_FAMILY_KEY = "FONT_FAMILY_KEY_EDITOR"
const FONT_SIZE_KEY = "FONT_SIZE_KEY_EDITOR"
const TAG_KEY = "TAG_KEY_EDITOR"

class BlogNewPost extends Component {
    private mapTag = [
        {"key": "Normal Text", "value": "p"},
        {"key": "Heading 1", "value": "h1"},
        {"key": "Heading 2", "value": "h2"},
        {"key": "Heading 3", "value": "h3"},
        {"key": "Heading 4", "value": "h4"},
        {"key": "Heading 5", "value": "h5"},
        {"key": "Heading 6", "value": "h6"},
    ]

    private mapFontSize: number[] = [];
    private mapFont = ["JoseSans", "Ubuntu", "Roboto", "Raleway", "Rubik"]

    constructor(props: Object) {
        super(props);
        this.handleIframeKeyPress = this.handleIframeKeyPress.bind(this)
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
        this.applyEditorStyleElement = this.applyEditorStyleElement.bind(this)
        this.handleImageChosen = this.handleImageChosen.bind(this)

        for (let i = 12; i <= 36; i += 2) {
            this.mapFontSize.push(i);
        }
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

            /*      //////////////////////          HANDLE PASTE             ///////////////////////     */
            textFieldDoc.addEventListener("paste", function (event) {
                // @ts-ignore
                let paste = (event.clipboardData || textField.window.clipboardData).getData('text');
                const selection = textField.window.getSelection();
                if (!selection?.rangeCount) return false;
                if (getFirstParentContainer(selection?.anchorNode as HTMLElement | null) == null) {
                    // @ts-ignore
                    const editorState = scope.props.state
                    const tagNewElement = editorState.tagNewElement
                    const container = document.createElement(tagNewElement)
                    const span = document.createElement("span")
                    span.appendChild(document.createTextNode(paste))
                    container.appendChild(span)
                    selection.getRangeAt(0).insertNode(container)
                    selection.getRangeAt(0).selectNodeContents(container)
                    event.preventDefault()
                    return
                }
                selection.deleteFromDocument();
                selection.getRangeAt(0).insertNode(document.createTextNode(paste));
                event.preventDefault()
            })
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

                option.addEventListener("click", function () {
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
                        // input.style['font-size'] = `${value}px`
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

    handleImageChosen(imagePath: string) {
        const element = document.createElement("img")
        element.src = imagePath
        element.classList.add("w-9/12")
        textField.document.getSelection()?.anchorNode?.appendChild(element)
        // textField.document.body.appndChild(element)
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
        const tagNewElement = editorState.tagNewElement

        // If body then insert <p> element
        if (rootSelection != null && (rootSelection as HTMLElement).tagName && (rootSelection as HTMLElement).tagName.toLowerCase() === 'body') {
            evt.preventDefault()
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
            span.style['white-space'] = 'normal'

            const startNode = element.childNodes[0]
            console.log("range", range)

            const newRange = document.createRange()
            // @ts-ignore
            newRange.setStart(startNode, 1)
            // newRange.setEnd(endNode, 1)
            newRange.collapse(true)

            selection.removeAllRanges()
            selection.addRange(newRange)

            return;
        }

        // Char code is enter
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
                // Get the text of selection element
                let currentContent = range.commonAncestorContainer.textContent
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
                    if (selectionNode == null) return;
                    const newContent = currentContent?.replace(remainStr, "") ?? ""
                    ////////////////////////////////          WHEN NEW CONTENT (AFTER REMOVE REMAIN) IS EMPTY IT MEAN MOVE EVERY DOWN            ////////////////////////////////
                    if (newContent?.trim().length == 0) {
                        selectionNode.innerHTML = "<br>"
                    } else {
                        selectionNode.innerText = newContent
                    }
                }
                element.appendChild(span)
            } else {
                element = document.createElement("span")
                element.innerText = charCode
            }

            // If has style changed then need to apply style to it
            this.applyEditorStyleElement(element)
            //  If have container then need to append element inside container instead fragment to not break the paragraph
            if (parentNode != null && parentNode.nodeName?.toLowerCase() === 'p' && editorState.isStyleChanged && element.tagName.toLowerCase() !== "p") {
                // If have empty span child then use this as element (no need to append new element)
                if (parentNode.children && parentNode.children[0] && parentNode.children[0].tagName.toLowerCase() == "span" && (parentNode.children[0] as HTMLElement).innerText.trim().length == 0) {
                    const newElement = parentNode.children[0] as HTMLElement;
                    newElement.innerText = element.innerText;
                    // Not render so cannot get css Text
                    // newElement.style.cssText = document.defaultView?.getComputedStyle(element, "").cssText ?? newElement.style.cssText;
                    this.applyEditorStyleElement(newElement, true)
                    element = newElement;
                } else {
                    parentNode.appendChild(element)
                }
            } else {
                // Loop through to get the root <p> element
                let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
                while (selectionNode != null && selectionNode.parentNode && (selectionNode?.parentNode as HTMLElement | null)?.tagName?.toLowerCase() !== "body") {
                    selectionNode = selectionNode.parentNode as HTMLElement | null
                }
                if (selectionNode != null && selectionNode.tagName && selectionNode.tagName.toLowerCase() !== "body") {
                    if (selectionNode.nextSibling) {
                        textField.document.body.insertBefore(element, selectionNode.nextSibling)
                    } else {
                        ////////////////////////////////          NO NEED TO SET SELECTION AFTER TEXT (ENTER BEFORE THE ELEMENT WILL KEEP EDITING AS IT IS)            ////////////////////////////////
                        textField.document.body.appendChild(element)
                    }
                } else {
                    textField.document.body.appendChild(element)
                }
            }

            // Keep white space to can set start selection in this node
            console.log("range", range)
            element.style['white-space'] = 'normal'

            const startNode = element.childNodes[0]
            const newRange = document.createRange()
            newRange.setStart(startNode, 0) // 0 or 1 (start or end of text)
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
        if (selectionNode == null) return;

        this.handleUpdateUI(selectionNode)

    }

    toggleActiveBold(element: HTMLElement) {
        let iconBold = document.getElementById("editor-icon-bold")
        if (iconBold == null) return;
        if (element.style == null) return;
        const container = getFirstParentContainer(element);
        if (container == null) return;
        if (container.style['font-weight'] === 'bold') {
            if (iconBold.classList.contains("active")) return;
            iconBold.classList.toggle("active")
        } else {
            if (iconBold.classList.contains("active")) {
                iconBold.classList.toggle("active")
            }
        }

        for (let i = 0; i < container.children.length; i++) {
            let child = container.children[i] as HTMLElement | null
            if (child == null) return;
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
        const container = getFirstParentContainer(element);
        if (container == null) return;

        if (container.style['font-style'] === 'italic') {
            if (iconItalic.classList.contains("active")) return;
            iconItalic.classList.toggle("active")
        } else {
            if (iconItalic.classList.contains("active")) {
                iconItalic.classList.toggle("active")
            }
        }

        for (let i = 0; i < container.children.length; i++) {
            let child = container.children[i] as HTMLElement | null
            if (child == null) return;
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
        const container = getFirstParentContainer(element);
        if (container == null) return;

        if (container.style['text-decoration'] === 'underline') {
            if (iconUnderline.classList.contains("active")) return;
            iconUnderline.classList.toggle("active")
        } else {
            if (iconUnderline.classList.contains("active")) {
                iconUnderline.classList.toggle("active")
            }
        }


        for (let i = 0; i < container.children.length; i++) {
            let child = container.children[i] as HTMLElement | null
            if (child == null) return;
            if (child.style['text-decoration'] === 'underline') {
                if (iconUnderline.classList.contains("active")) return;
                iconUnderline.classList.toggle("active")
            }
        }

    }

    toggleActiveAlignLeft(element: HTMLElement) {

        let iconAlignLeft = document.getElementById("editor-icon-align-left")
        const elementAlign = getFirstParentContainer(element)

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
        const elementAlign = getFirstParentContainer(element)
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

        let iconAlignCenter = document.getElementById("editor-icon-align-center")
        const elementAlign = getFirstParentContainer(element)
        if (iconAlignCenter == null) return;
        if (elementAlign == null) return;
        if (elementAlign.style == null) return;

        if (elementAlign.style['text-align'] === 'center') {
            if (iconAlignCenter.classList.contains("active")) return;
            iconAlignCenter.classList.toggle("active")
        } else {
            if (iconAlignCenter.classList.contains("active")) {
                iconAlignCenter.classList.toggle("active")
            }
        }

    }

    toggleActiveAlignJustify(element: HTMLElement) {

        let iconAlignJustify = document.getElementById("editor-icon-align-justify")
        const elementAlign = getFirstParentContainer(element)

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
    }

    toggleStrikeIcon(element: HTMLElement) {

        let iconStrike = document.getElementById("editor-icon-strike")
        const elementAlign = getFirstParentContainer(element)

        if (iconStrike == null) return;
        if (elementAlign == null) return;

        let strikeElement = getFirstParentWithTag("strike", element) ?? getFirstChildWithTag("strike", element)

        /*      //////////////////////          DOES NOT HAVE STRIKE             ///////////////////////     */
        if (strikeElement == null) {
            if (iconStrike.classList.contains("active")) {
                iconStrike.classList.toggle("active")
            }

            return;
        }

        /*      //////////////////////          HAVE STRIKE             ///////////////////////     */
        if (iconStrike.classList.contains("active")) return;
        iconStrike.classList.toggle("active")

    }

    toggleQuoteIcon(element: HTMLElement) {

        let iconStrike = document.getElementById("editor-icon-quote")
        const elementAlign = getFirstParentContainer(element)

        if (iconStrike == null) return;
        if (elementAlign == null) return;

        let parent = getFirstParentContainer(element)

        /*      //////////////////////          HAVE QUOTE BLOCK             ///////////////////////     */
        if (parent?.classList.contains("quote-container")) {
            if (iconStrike.classList.contains("active")) return;
            iconStrike.classList.toggle("active")

            return;
        }

        /*      //////////////////////          NOT HAVE QUOTE BLOCK             ///////////////////////     */
        if (iconStrike.classList.contains("active")) {
            iconStrike.classList.toggle("active")
        }

    }

    toggleListIcon(element: HTMLElement, ordered: boolean = false) {

        let iconList = document.getElementById(ordered ? "editor-icon-ordered-list" : "editor-icon-unordered-list")
        if (iconList == null) return;

        /*      //////////////////////          IF HAS DESCENDANT (IT ALSO IS LIST)             ///////////////////////     */
        if (element.querySelectorAll(ordered ? "ol" : "ul").length > 0) {
            if (iconList.classList.contains("active")) return;
            iconList.classList.toggle("active")
            return;
        }

        /*      //////////////////////          IF HAS PARENT WITH OL OR UL TAG...             ///////////////////////     */
        const listParent = getFirstParentWithTag(ordered ? "ol" : "ul", element)
        if (listParent == null) {
            /*      //////////////////////          NOT HAVE QUOTE BLOCK             ///////////////////////     */
            if (iconList.classList.contains("active")) {
                iconList.classList.toggle("active")
            }
            return;
        }

        if (iconList.classList.contains("active")) return;
        iconList.classList.toggle("active")
        return;

    }

    updateTagOptions(element: HTMLElement) {
        const container = getFirstParentContainer(element)
        this.mapTag.forEach(it => {
            if (it["value"] == container?.tagName.toLowerCase()) {
                const input = document.getElementById("input-select-tag-new-element")
                if (input == null) return
                input.innerText = it["key"]
            }
        })
    }

    updateFontSizeOptions(element: HTMLElement) {
        const span = getFirstParentWithTag("span", element)
        if (span == null) return
        if (!span.style['font-size']) return;
        const inputFontSize = document.getElementById("input-select-font-size")
        if (inputFontSize == null) return;
        inputFontSize.innerText = span.style['font-size']
    }

    updateFontOptions(element: HTMLElement) {
        const span = getFirstParentWithTag("span", element)
        if (span == null) return
        if (!span.style['font-family']) return;
        const inputFontSize = document.getElementById("input-select-font-family")
        if (inputFontSize == null) return;
        inputFontSize.innerText = span.style['font-family']
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
        }
    }

    /************************************************************************************************
     * REPLACE THE TAG FOR CONTAINER ELEMENT (p, h1, h2, ...)
     ************************************************************************************************/
    handleTagOptionClicked(value: string) {
        /************************************************************************************************
         * CHANGE THE TAG OF CURRENT SELECT ELEMENT
         ************************************************************************************************/
        let selection = textField.window.getSelection()
        if (selection == null) return;

        const selectionNode = selection.anchorNode as HTMLElement | null
        const pElement = selectionNode?.nodeType == Node.TEXT_NODE
            ? getFirstParentContainer(selectionNode) ?? getFirstChildContainer(selectionNode)
            : getFirstChildContainer(selectionNode) ?? getFirstParentContainer(selectionNode)

        if (pElement == null || pElement.parentElement == null) return;
        let container = document.createElement(value);
        container.innerHTML = pElement.innerHTML;
        container.style.cssText = pElement.style.cssText
        /*      //////////////////////          SELECT CONTENT NODE FOR SAME AS BEFORE             ///////////////////////     */
        // pElement.remove()
        // container.innerHTML = pElement.parentElement.innerHTML;
        // pElement.parentElement.parentElement?.replaceChild(container, pElement.parentElement);

        pElement.parentElement?.replaceChild(container, pElement);
        selection.deleteFromDocument()
        // selection.getRangeAt(0).insertNode(container);
        selection.getRangeAt(0).selectNodeContents(container)


        /************************************************************************************************
         *****************   !END CHANGE THE TAG OF CURRENT SELECT ELEMENT COMMENT    *******************
         ************************************************************************************************/
    }

    /************************************************************************************************
     * STRIKE/UN STRIKE THROUGH STYLE THE ELEMENT
     ************************************************************************************************/
    handleStrikeSelection() {
        /************************************************************************************************
         * CHANGE THE TAG OF CURRENT SELECT ELEMENT
         ************************************************************************************************/
        let selection = textField.window.getSelection()
        if (selection == null) return

        let selectionNode = selection.anchorNode as HTMLElement | null
        const spanElement = getFirstParentWithTag("span", selectionNode) ?? getFirstChildWithTag("span", selectionNode)

        if (spanElement == null || spanElement.parentElement == null) return;
        let d = document.createElement("strike");
        d.innerHTML = spanElement.innerHTML;
        ////////////////////////////////          CLEAR CONTENT            ////////////////////////////////
        spanElement.innerHTML = ""
        spanElement?.appendChild(d)

        /************************************************************************************************
         *****************   !END CHANGE THE TAG OF CURRENT SELECT ELEMENT COMMENT    *******************
         ************************************************************************************************/
    }

    /************************************************************************************************
     * WRAP/UNWRAP ELEMENT INSIDE QUOTE
     ************************************************************************************************/
    handleQuoteElement() {
        /************************************************************************************************
         * CHANGE THE TAG OF CURRENT SELECT ELEMENT
         ************************************************************************************************/
        let selection = textField.window.getSelection()
        if (selection == null) return

        let selectionNode = selection.anchorNode as HTMLElement | null
        if (selectionNode == null) return;

        let parent = getFirstParentContainer(selectionNode) ?? getFirstChildContainer(selectionNode)
        /*      //////////////////////          HAVE QUOTE BLOCK             ///////////////////////     */
        if (parent?.classList.contains("quote-container")) {
            parent?.classList.remove("quote-container", "fa")
            return;
        }

        const spanElement = getFirstParentWithTag("span", selectionNode) ?? getFirstChildWithTag("span", selectionNode)

        if (spanElement == null || spanElement.parentElement == null) return;
        spanElement.parentElement.classList.add("quote-container", "fa")

        this.handleUpdateUI(selectionNode)
        /************************************************************************************************
         *****************   !END CHANGE THE TAG OF CURRENT SELECT ELEMENT COMMENT    *******************
         ************************************************************************************************/
    }

    /************************************************************************************************
     * LIST/UN LIST ELEMENT(S)
     ************************************************************************************************/
    handleListElement(ordered: boolean = false) {
        /************************************************************************************************
         * MAKE LIST FROM ELEMENT(S)
         ************************************************************************************************/
        let selection = textField.window.getSelection()
        if (selection == null) return
        if (selection.rangeCount <= 0) return;
        const range = selection.getRangeAt(0)
        const content = range.cloneContents()
        // const content = range.extractContents()
        let selectionNode = selection.anchorNode as HTMLElement | null
        if (selectionNode == null) return;

        /*      //////////////////////          IF LIST ELEMENT PRESENT IT MEAN REMOVE LIST ATTRS (DISABLE LIST)            ///////////////////////     */
        const listElement = getFirstParentWithTag(ordered ? "ol" : "ul", selectionNode) ??
            getFirstChildWithTag(ordered ? "ol" : "ul", selectionNode)
        if (listElement != null) {
            /*      //////////////////////          CLONED KEEP NODE AND APPEND TO PARENT OF WILL REMOVE ELEMENT             ///////////////////////     */
            const childrenCloned: Node[] = []
            listElement.childNodes.forEach(it => {
                const x = it.childNodes[0].cloneNode(true)
                childrenCloned.push(x)
                listElement.parentElement?.parentElement?.appendChild(x)
            })
            listElement.parentElement?.remove()

            if (childrenCloned.length == 0) return;
            const endElement = childrenCloned[childrenCloned.length - 1]
            if (endElement.childNodes.length == 0) return;

            const range = new Range()
            range.setStart(childrenCloned[0], 0)
            range.setEnd(childrenCloned[childrenCloned.length - 1], 1)

            selection.removeAllRanges()
            selection.addRange(range)

            return;
        }

        /*      //////////////////////          CHANGE LIST STYLE (OL TO UL AND VERSE)             ///////////////////////     */
        const currentListElementReverse = getFirstParentWithTag(ordered ? "ul" : "ol", selectionNode) ??
            getFirstChildWithTag(ordered ? "ul" : "ol", selectionNode)
        if (currentListElementReverse != null) {
            const listOpposite = document.createElement(ordered ? "ol" : "ul")
            listOpposite.innerHTML = currentListElementReverse.innerHTML
            currentListElementReverse.parentElement?.replaceChild(listOpposite, currentListElementReverse)
            this.handleUpdateUI(listOpposite)
            return;
        }

        /*      //////////////////////          ELSE HAVE NO LIST STYLE SO LIST ELEMENTS             ///////////////////////     */
        /*      //////////////////////          WHEN ONLY HAVE ONE OR NO ELEMENT IN FRAGMENT CONTENT (CONTENT CLONE NODES FROM RANGE)             ///////////////////////     */
        /*      //////////////////////          SO NEED TO MANUALLY LIST ELEMENT             ///////////////////////     */
        if (content.children.length <= 1) {
            const parent = getFirstParentContainer(selectionNode)
            if (parent != null) {
                const li = document.createElement("li")
                parent.parentElement?.replaceChild(li, parent)
                li.appendChild(parent)

                const container = document.createElement("div")
                li.parentElement?.replaceChild(container, li)
                const list = document.createElement(ordered ? "ol" : "ul")
                list.appendChild(li)
                container.classList.add("ml-4")
                container.appendChild(list)
                range.selectNode(container)
            }

        } else {
            /*      //////////////////////          WRAP LIST AROUND SELECTED ELEMENTS             ///////////////////////     */
            for (let i = 0; i < content.children.length; i++) {
                const child = content.children[i]
                const li = document.createElement("li")
                child.parentNode?.replaceChild(li, child)
                li.appendChild(child)
            }

            const parent = getFirstParentContainer(selectionNode)?.parentElement
            if (parent == null) return;

            removeAllChildNodes(parent)

            const container = document.createElement("div")
            const list = document.createElement(ordered ? "ol" : "ul")
            list.appendChild(content)
            container.classList.add("ml-4")
            container.appendChild(list)

            parent.appendChild(container)
            range.selectNode(parent)

            this.handleUpdateUI(container)
        }

        /************************************************************************************************
         *****************   !END CHANGE THE TAG OF CURRENT SELECT ELEMENT COMMENT    *******************
         ************************************************************************************************/
    }

    /************************************************************************************************
     * ADD FONT FAMILY STYLE FOR CONTAINER
     ************************************************************************************************/
    handleFontFamilyClicked(value: string) {
        /************************************************************************************************
         * CHANGE FONT FAMILY OF SPAN ELEMENT
         ************************************************************************************************/
        let selection = textField.window.getSelection()
        if (selection == null) return
        let selectionNode = selection.anchorNode as HTMLElement | null
        const span = getFirstParentWithTag("span", selectionNode)
        if (span == null) return;
        span.style['font-family'] = value
    }

    /************************************************************************************************
     * STYLE FONT SIZE FOR CONTAINER ELEMENT
     ************************************************************************************************/
    handleFontSizeClicked(value: string) {
        /************************************************************************************************
         * CHANGE FONT FAMILY OF SPAN ELEMENT
         ************************************************************************************************/
        let selection = textField.window.getSelection()
        if (selection == null) return

        let selectionNode = selection.anchorNode as HTMLElement | null
        const pElement = getFirstParentWithTag("span", selectionNode) ?? getFirstChildWithTag("span", selectionNode)

        if (pElement == null) return;

        pElement.style['font-size'] = `${value}px`
    }

    /************************************************************************************************
     * TOGGLE BOLD, ITALIC, ALIGN ... FOR ELEMENT
     * NOTE: ALIGN STYLE NEED TO APPLY ON PARENT SO IT SHOULD SET USE PARENT TO TRUE
     ************************************************************************************************/
    handleIconToggleSelection(style: string, value: string, tag: string = "span", useParent: boolean = false) {
        /************************************************************************************************
         * CHANGE FONT WEIGHT OF SPAN ELEMENT
         * CAREFULLY USE GET PARENT CONTAINER OR CHILD CONTAINER DEPEND ON TYPE OF SELECTION
         ************************************************************************************************/

        let selection = textField.window.getSelection()
        if (selection == null) return
        let selectionStyle = selection.anchorNode as HTMLElement | null
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
        //         return;
        //     }
        // }

        // const spanSelected = getFirstParentWithTag(tag, selectionStyle)
        const range = selection.getRangeAt(0)
        const content = range.cloneContents()

        /*      //////////////////////          WRAP LIST AROUND SELECTED ELEMENTS             ///////////////////////     */
        if (content.children.length <= 1 || content.nodeType == Node.TEXT_NODE) {
            const parent = getFirstChildContainer(selectionStyle) ?? getFirstParentContainer(selectionStyle)
            if (parent == null) return;
            /************************************************************************************************
             * CAN USE TWO CASE (MODIFY EXITS AND REPLACE WITH NEW)
             * CHOOSE CAREFULLY...
             ************************************************************************************************/

            /*      //////////////////////          MODIFY CHILD CASE             ///////////////////////     */
            if (!useParent) {
                parent.querySelectorAll("span").forEach((element: HTMLElement) => {
                    if (element.style[style] === value) {
                        element.style[style] = ``
                    } else {
                        element.style[style] = value
                    }
                })
            }

        } else {
            const parent = getFirstChildContainer(selectionStyle) ?? getFirstParentContainer(selectionStyle)
            if (parent == null) return;
            /************************************************************************************************
             * CAN USE TWO CASE (MODIFY EXITS AND REPLACE WITH NEW)
             * CHOOSE CAREFULLY...
             ************************************************************************************************/

            /*      //////////////////////          MODIFY CHILD CASE             ///////////////////////     */
            if (!useParent) {
                parent.querySelectorAll("span").forEach((element: HTMLElement) => {
                    if (element.style[style] === value) {
                        element.style[style] = ``
                    } else {
                        element.style[style] = value
                    }
                    // element.style[style] = value
                })
            }

            /*      //////////////////////          REPLACE CHILD CASE             ///////////////////////     */
            // console.log("Fucking parent", parent)
            // removeAllChildNodes(parent)
            // console.log("Fucking children", content.children.length)
            // for (let i = 0; i < content.children.length; i++) {
            //     const child = content.children[i].cloneNode(true) as HTMLElement
            //     const oldSpan = getFirstChildWithTag("span", child) as HTMLElement
            //     if (oldSpan != null) {
            //         // const textContent = range.commonAncestorContainer.textContent
            //         // if (textContent == null) return;
            //         // const selectText = textContent?.slice(startSelected, endSelected).toString();
            //         // const remainText = textContent.slice(endSelected).toString()
            //         // if (selectText == null) return;
            //
            //         // let span = document.createElement("span")
            //         // span.style.cssText = oldSpan.style.cssText
            //         // span.innerText = selectText
            //         oldSpan.style[style] = value
            //         // child.appendChild(span)
            //     }
            //     parent.appendChild(child)
            // }

            return;
        }

        /************************************************************************************************
         * WHEN USE PARENT THEN NEED TO APPLY STYLE ON CONTAINER TO MAKE WHOLE CHILD EFFECT
         * USEFUL WHEN UPDATE TAG OF SELECTED
         * ABOVE HAS ADD STYLE IT NOT USE PARENT SO ONLY APPLY STYLE IF USE PARENT (NOT APPLY STYLE AGAIN FOR SPAN,
         * IT IS INCORRECT)
         ************************************************************************************************/
        if (useParent) {
            selectionStyle = getFirstParentContainer(selectionStyle) ?? getFirstChildContainer(selectionStyle)
            /*      //////////////////////          NO NEED TO CHECK WHETHER SELECT ALL ELEMENT OR NOT SINCE USE PARENT             ///////////////////////     */
            if (selectionStyle == null || selectionStyle.style == null) return;
            if (selectionStyle.style[style] === value) {
                selectionStyle.style[style] = ``
            } else {
                selectionStyle.style[style] = value
            }
            this.handleUpdateUI(selectionStyle)
            return;
        } else {
            selectionStyle = getFirstParentWithTag(tag, selectionStyle) ?? getFirstChildWithTag(tag, selectionStyle)
            if (selectionStyle == null || selectionStyle.style == null) return;
        }

        let startSelected = range.startOffset
        let endSelected = range.endOffset
        let spanSelected = getFirstParentWithTag("span", selectionStyle)
        if (spanSelected == null) return;
        /************************************************************************************************
         * WHEN SELECT PART TEXT NODE OF ELEMENT (SELECT ONLY SOME CONTENT NOT ENTIRE ELEMENT)
         ************************************************************************************************/
        if (startSelected !== endSelected && range.startContainer.nodeType == Node.TEXT_NODE
            && endSelected - startSelected != spanSelected.innerText.length) {
            const textContent = range.commonAncestorContainer.textContent
            if (textContent == null) return;
            const selectText = textContent?.slice(startSelected, endSelected).toString();
            const remainText = textContent.slice(endSelected).toString()
            if (selectText == null) return;

            let span = document.createElement("span")

            span.style.cssText = spanSelected?.style.cssText ?? span.style.cssText
            span.innerText = selectText
            span.style[style] = value
            getFirstParentContainer(selectionStyle)?.appendChild(span)

            range.commonAncestorContainer.textContent = textContent.replace(selectText, "")

            /************************************************************************************************
             * IF HAS REMAIN STRING ADD NEW SPAN FOR REMAIN STR
             ************************************************************************************************/
            if (remainText.length === 0) return;

            range.commonAncestorContainer.textContent = textContent.replace(remainText, "").replace(selectText, "")
            let spanRemain = document.createElement("span")
            spanRemain.style.cssText = getFirstParentWithTag("span", selectionStyle)?.style.cssText ?? span.style.cssText
            spanRemain.innerText = remainText
            getFirstParentContainer(selectionStyle)?.appendChild(spanRemain)

            return;
        }

        this.handleUpdateUI(selectionStyle)
    }

    /************************************************************************************************
     * UPDATE STATE OF ICONS
     ************************************************************************************************/
    handleUpdateUI(selectElement: HTMLElement) {

        this.toggleActiveBold(selectElement)
        this.toggleActiveItalic(selectElement)
        this.toggleActiveUnderline(selectElement)
        this.toggleActiveAlignLeft(selectElement)
        this.toggleActiveAlignRight(selectElement)
        this.toggleActiveAlignCenter(selectElement)
        this.toggleActiveAlignJustify(selectElement)
        this.toggleActiveAlignJustify(selectElement)
        this.toggleStrikeIcon(selectElement)
        this.toggleQuoteIcon(selectElement)
        this.toggleListIcon(selectElement, false)
        this.toggleListIcon(selectElement, true)
        this.updateTagOptions(selectElement)
        this.updateFontSizeOptions(selectElement)
        this.updateFontOptions(selectElement)

    }

    /************************************************************************************************
     * MOVE FROM RENDER
     ************************************************************************************************/
    load() {
        textField.document.designMode = "On";
        textField.document.body.innerHTML = "<h1 style=\"font-family: Ubuntu;\"><span style=\"font-weight: bold;\">6 Tips to Freshen up your workplace</span></h1><p style=\"font-weight: bold; white-space: normal;\"><span style=\"font-weight: bold;\">15 Feb 2018</span></p><p style=\"white-space: normal;\"><span style=\"font-weight: bold;\"><br></span></p><p style=\"white-space: normal; font-family: JoseSans;\"><span style=\"font-size: 18px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus aliquet elit, ac condimentum sapien convallis at. Cras nec eros ultricies, rutrum elit nec, rhoncus nibh. Sed ultrices diam quis mollis imperdiet. Morbi sagittis erat vitae pellentesque feugiat. Maecenas placerat mollis ultricies. Nullam eu nulla ex.<br></span></p><p style=\"white-space: normal;\"><span><br></span></p><p style=\"white-space: normal; font-family: JoseSans;\"><span style=\"font-size: 14px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus aliquet elit, ac condimentum sapien convallis at. Cras nec eros ultricies, rutrum elit nec, rhoncus nibh. Sed ultrices diam quis mollis imperdiet. Morbi sagittis erat vitae pellentesque feugiat. Maecenas placerat mollis ultricies. Nullam eu nulla ex.<br></span></p><p style=\"white-space: normal;\"><span><br></span></p><p style=\"white-space: normal; font-family: Ubuntu;\"><span style=\"font-weight: bold;\">Provide kitchen snacks</span></p><p style=\"font-weight: bold; white-space: normal;\"><span style=\"font-weight: bold;\"><br></span></p><p style=\"white-space: normal; font-family: JoseSans;\"><span style=\"font-size: 14px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus aliquet elit, ac condimentum sapien convallis at. Cras nec eros ultricies, rutrum elit nec, rhoncus nibh. Sed ultrices diam quis mollis imperdiet. Morbi sagittis erat vitae pellentesque feugiat. Maecenas placerat mollis ultricies. Nullam eu nulla ex.<br></span></p><p style=\"white-space: normal;\"><span><br></span></p><p style=\"white-space: normal; font-family: Ubuntu;\"><span style=\"font-weight: bold;\">New year clean</span></p><p style=\"white-space: normal;\"><span style=\"font-weight: bold;\"><br></span></p><p style=\"white-space: normal; font-family: JoseSans;\"><span style=\"font-size: 14px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus aliquet elit, ac condimentum sapien convallis at. Cras nec eros ultricies, rutrum elit nec, rhoncus nibh. Sed ultrices diam quis mollis imperdiet. Morbi sagittis erat vitae pellentesque feugiat. Maecenas placerat mollis ultricies. Nullam eu nulla ex.<br></span></p><p style=\"white-space: normal;\"><span><br></span></p><p style=\"white-space: normal; font-family: Ubuntu;\"><span style=\"font-weight: bold;\">Greenery</span></p><p style=\"white-space: normal;\"><span><br></span></p><p style=\"white-space: normal; font-family: JoseSans;\"><span style=\"font-size: 14px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus aliquet elit, ac condimentum sapien convallis at. Cras nec eros ultricies, rutrum elit nec, rhoncus nibh. Sed ultrices diam quis mollis imperdiet. Morbi sagittis erat vitae pellentesque feugiat. Maecenas placerat mollis ultricies. Nullam eu nulla ex.</span></p><p style=\"white-space: normal;\"><span><br></span></p><p style=\"white-space: normal; font-family: JoseSans;\"><span style=\"font-size: 14px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus aliquet elit, ac condimentum sapien convallis at. Cras nec eros ultricies, rutrum elit nec, rhoncus nibh. Sed ultrices diam quis mollis imperdiet. Morbi sagittis erat vitae pellentesque feugiat. Maecenas placerat mollis ultricies. Nullam eu nulla ex.<br></span></p><p style=\"white-space: normal;\"><span><br></span></p><p style=\"white-space: normal; font-family: Ubuntu;\"><span style=\"font-weight: bold;\">Add some colour</span></p><p style=\"white-space: normal;\"><span><br></span></p><p style=\"white-space: normal; font-family: JoseSans;\"><span style=\"font-size: 14px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus aliquet elit, ac condimentum sapien convallis at. Cras nec eros ultricies, rutrum elit nec, rhoncus nibh. Sed ultrices diam quis mollis imperdiet. Morbi sagittis erat vitae pellentesque feugiat. Maecenas placerat mollis ultricies. Nullam eu nulla ex.<br></span></p>"
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

        async function boldSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            dispatch(toggleBold())

            scope.handleIconToggleSelection('font-weight', 'bold')

        }

        async function italicSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            dispatch(toggleItalic())
            scope.handleIconToggleSelection('font-style', 'italic')

        }

        async function underlineSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            dispatch(toggleUnderline())

            scope.handleIconToggleSelection('text-decoration', 'underline')

        }

        async function alignLeftSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            dispatch(toggleAlignLeft())

            scope.handleIconToggleSelection('text-align', 'left', "p", true)
        }

        async function alignRightSelection(event: React.MouseEvent<HTMLElement>) {
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
            onIconEditorClicked(event)
            dispatch(toggleAlignJustify())

            scope.handleIconToggleSelection("text-align", 'justify', "p", true)
        }

        function strikeSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            // dispatch(toggleAlignCenter())

            scope.handleStrikeSelection()
        }

        function quoteSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            // dispatch(toggleAlignCenter())

            scope.handleQuoteElement()
        }

        function listItemsSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            scope.handleListElement(false)
        }

        function listItemsOrderedSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            scope.handleListElement(true)
        }

        /************************************************************************************************
         * ADD POPUP TO TAKE INPUT FROM USER AND CREATE LINK FROM SELECTION
         ************************************************************************************************/
        function linkSelection() {
            const selectionNode = textField.document.getSelection()?.anchorNode as HTMLElement | null
            const constraint = getFirstParentContainer(selectionNode)
            const container = document.createElement("div")
            ////////////////////////////////          DO NOT ENABLE EDIT FOR POPUP            ////////////////////////////////
            container.attributes['contentEditable'] = false

            /*      //////////////////////          REMOVE POPUP WHEN CLICK OUTSIDE             ///////////////////////     */
            textField.document.addEventListener("click", function (e) {
                if (e == null || e.target ! instanceof Node) return
                const target = e.target as Node
                if (!container.contains(target)) {
                    container.remove()
                }
            })

            const popup = <PopupLink text={selectionNode?.nodeValue ?? ""}
                                     onApply={function (text: string, link: string) {
                                         container.remove()
                                         // textField.document.getElementById("popup-add-link")?.remove()
                                         const a = document.createElement("a")
                                         a.title = text
                                         a.appendChild(document.createTextNode(text))
                                         a.href = link
                                         textField.document.body.appendChild(a)
                                         if (selectionNode?.nodeType === Node.TEXT_NODE) {
                                             selectionNode?.remove()
                                         }
                                     }}/>

            if (constraint == null) {
                textField.document.body.appendChild(container)
                ReactDOM.render(popup, container)
                return
            }

            constraint.appendChild(container)
            ReactDOM.render(popup, container)
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

        function handleSave() {
            console.log(textField.document.body.innerHTML)
        }

        // @ts-ignore
        return (
            <div className="w-11/12 bg-white mt-break mx-auto"
                 style={{height: '100vh', backgroundColor: "#f0f1f2"}}>
                <div>
                    <div className="py-2 flex justify-content-end mx-5">
                        <div onClick={handleSave}
                             className="d-flex font-roboto outline-none-imp font-weight-bold align-items-center duration-500 custom-btn-rounded bg-blue-600">
                            <i className="fa fa-shopping-cart mr-3 duration-500"/>Publish
                        </div>
                    </div>
                    <div className="d-flex justify-between mx-3 child-mx-1 ml-auto py-3 mr-0 rounded-md px-3"
                         style={{backgroundColor: "#ffffff"}}>

                        <ul className="custom-dropdown" id="custom-dropdown">
                            <div className="tooltip w-100 h-full absolute z-10">
                                <span className="tooltip-text">Select Heading</span>
                            </div>

                            <p id="input-select-tag-new-element" className="pl-5">Normal Text</p>

                            <ul className="options" id="options">
                                {this.mapTag.map(function (item) {
                                    return <li key={`${item.value}-${TAG_KEY}`} data-value={item.value}
                                               data-key={TAG_KEY}><span
                                        className={item.value}>{item.key}</span></li>
                                })}
                            </ul>
                        </ul>

                        <ul className="custom-dropdown" id="custom-dropdown">
                            <div className="tooltip w-100 h-full absolute z-10">
                                <span className="tooltip-text">Select font</span>
                            </div>
                            <p id="input-select-font-family" className="pl-5">Roboto</p>
                            <ul className="options tooltip-disabled" id="options">
                                {this.mapFont.map(function (item) {
                                    return <li key={`${item}-${FONT_FAMILY_KEY}`} data-value={item}
                                               data-key={FONT_FAMILY_KEY}><span
                                        className={`font-${item.toLowerCase()}`}>{item}</span>
                                    </li>
                                })}
                            </ul>
                        </ul>

                        <ul className="custom-dropdown" id="custom-dropdown">
                            <div className="tooltip w-100 h-full absolute z-10">
                                <span className="tooltip-text">Select Text Size</span>
                            </div>

                            <p id="input-select-font-size" className="pl-5">18</p>
                            <ul className="options" id="options">
                                {this.mapFontSize.map(function (item) {
                                    return <li key={`${item}-${FONT_SIZE_KEY}`} data-value={item}
                                               data-key={FONT_SIZE_KEY}><span
                                        style={{fontSize: `${item}px`}}>{item}</span></li>
                                })}
                            </ul>
                        </ul>

                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-bold" data-cmd="bold"
                             onClick={boldSelection}>
                            <span className="tooltip-text">Bold Text</span>
                            <i className="fa fa-bold disabled"/>
                        </div>

                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-italic"
                             onClick={italicSelection}>
                            <span className="tooltip-text">Italic Text</span>
                            <i className="fa fa-italic disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-underline"
                             onClick={underlineSelection}>
                            <span className="tooltip-text">Center Text</span>
                            <i className="fa fa-underline disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-strike"
                             onClick={strikeSelection}>
                            <span className="tooltip-text">Strike Text</span>
                            <i className="fa fa-strikethrough disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-align-left"
                             onClick={alignLeftSelection}>
                            <span className="tooltip-text">Align Text Left</span>
                            <i className="fa fa-align-left disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-align-center"
                             onClick={alignCenterSelection}>
                            <span className="tooltip-text">Align Text Center</span>
                            <i className="fa fa-align-center disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-align-right"
                             onClick={alignRightSelection}>
                            <span className="tooltip-text">Align Text Right</span>
                            <i className="fa fa-align-right disabled"/></div>
                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-align-justify"
                             onClick={alignJustifySelection}>
                            <span className="tooltip-text">Justify Text</span>
                            <i className="fa fa-align-justify disabled"/></div>
                        {/*</div>*/}

                        {/*<div className="d-flex">*/}

                        <div className="center-element-inner editor-icon tooltip" id="editor-icon-quote"
                             onClick={quoteSelection}>
                            <span className="tooltip-text">Quote</span>
                            <i className="fa fa-quote-left"/>
                        </div>

                        <div className="center-element-inner editor-icon tooltip">
                            <span className="tooltip-text">Dedent Text</span>
                            <i className="fa fa-indent"/>
                        </div>
                        <div className="center-element-inner editor-icon tooltip">
                            <span className="tooltip-text">Indent Text</span>
                            <i className="fa fa-indent"/>
                        </div>
                        {/*</div>*/}

                        {/*<div className="d-flex">*/}

                        <div className="center-element-inner editor-icon tooltip">
                            <span className="tooltip-text">Import file</span>
                            <i className="fa fa-file"/>
                        </div>
                        <div className="center-element-inner editor-icon tooltip"
                             onClick={pickImage}>
                            <span className="tooltip-text">Insert Image</span>
                            <i className="fa fa-image"/>
                        </div>
                        <div className="center-element-inner editor-icon tooltip"
                             onClick={linkSelection}>
                            <span className="tooltip-text">Create link</span>
                            <i className="fa fa-link"/>
                        </div>
                        {/*</div>*/}

                        {/*<div className="d-flex">*/}

                        <div className="center-element-inner editor-icon tooltip"
                             id="editor-icon-unordered-list"
                             onClick={listItemsSelection}>
                            <span className="tooltip-text">List element (unordered)</span>
                            <i className="fa fa-list-ul"/>
                        </div>
                        <div className="center-element-inner editor-icon tooltip"
                             id="editor-icon-ordered-list"
                             onClick={listItemsOrderedSelection}>
                            <span className="tooltip-text">List element (ordered)</span>
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

const mapStateToProps = (state: State) => {
    // @ts-ignore
    if (state.editorReducer) {
        return {
            // @ts-ignore
            state: state.editorReducer
        };
    }
}
export default connect(mapStateToProps)(BlogNewPost);