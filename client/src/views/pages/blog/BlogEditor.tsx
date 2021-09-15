import React, {Component, PropsWithChildren} from 'react'
import {
    containerTags,
    getContainerSelectedElements,
    getFirstChildContainer,
    getFirstChildWithTag,
    getFirstParentContainer, getFirstParentTextNode,
    getFirstParentWithTag, getSelectedElementTags, hasParentWithTag, removeParent, tagsUnTouch
} from "../../../utils/editor_utils";
import {
    changeFontFamilyElement,
    changeFontSizeElement,
    changeTagNewElement,
    setStyleChangeEditor, toggleAlignCenter, toggleAlignJustify, toggleAlignLeft, toggleAlignRight,
    toggleBold,
    toggleItalic,
    toggleUnderline
} from "../../../actions/editor_actions";

import MediaLibrary from "../../components/shared/MediaLibrary";
import PopupLink from "../../components/editor/Popup";
import {savePost} from "../../../actions/user_actions";

import ReactDOM from 'react-dom';
import ImageEditor, {ImageEditorFocusCallbackParams} from "../../components/editor/ImageEditor";
import {PostResponse} from "../../../interface/response_posts";
import {toast} from "react-toastify";
import {connect} from "react-redux"
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../config/config";
import {style2object} from "../../../helpers/data_process_helper";
import 'codemirror/mode/xml/xml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import HtmlEditor from "../../components/editor/HtmlEditor";

declare var textField: Window
declare var codeField: Window

const FONT_FAMILY_KEY = "FONT_FAMILY_KEY_EDITOR"
const FONT_SIZE_KEY = "FONT_SIZE_KEY_EDITOR"
const TAG_KEY = "TAG_KEY_EDITOR"

interface State {
    disableEditor: boolean,
    showCode: boolean,
}

// noinspection DuplicatedCode,JSUnusedGlobalSymbols
class BlogEditor extends Component<PropsWithChildren<any>, State> {
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
    private currentImageEditor: ImageEditor | null = null;
    private htmlEditor = React.createRef<HtmlEditor>();
    private iFrameTextField: HTMLElement | null = null;
    private iFrameCodeField: HTMLElement | null = null;
    private readonly blogId: string | null = null

    constructor(props: PropsWithChildren<any>) {
        super(props);
        this.blogId = props.match.params.blogId;
        this.state = {disableEditor: false, showCode: false}
        this.handleIFrameKeyPress = this.handleIFrameKeyPress.bind(this)
        this.handleIFrameKeyDown = this.handleIFrameKeyDown.bind(this)
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
        this.applyEditorStyleElement = this.applyEditorStyleElement.bind(this)
        this.handleImageChosen = this.handleImageChosen.bind(this)
        this.load = this.load.bind(this)

        for (let i = 12; i <= 36; i += 2) {
            this.mapFontSize.push(i);
        }
    }

    componentDidMount() {

        this.iFrameCodeField = document.getElementById("codeField")
        this.iFrameTextField = document.getElementById("textField")
        // @ts-ignore
        let dispatch = this.props.dispatch;
        let textFieldDoc = textField.document;
        const scope = this;

        codeField.document.head.innerHTML = document.head.innerHTML
        textFieldDoc.head.innerHTML = document.head.innerHTML
        if (textFieldDoc.addEventListener) {
            textFieldDoc.addEventListener("keypress", this.handleIFrameKeyPress, false);
            // textFieldDoc.addEventListener("keydown", this.handleIFrameKeyDown, false)
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
            /*      //////////////////////          HANDLE PASTE             ///////////////////////     */
            textFieldDoc.addEventListener("paste", function (event) {
                // @ts-ignore
                let paste = (event.clipboardData || textField.window.clipboardData).getData('text');
                const selection = textField.window.getSelection();
                selection?.deleteFromDocument();
                if (!selection?.rangeCount) return false;
                const parentElement = getFirstParentContainer(selection?.anchorNode as HTMLElement | null)
                if (parentElement == null) {
                    const editorState = scope.props.state
                    const tagNewElement = editorState.tagNewElement
                    const container = document.createElement(tagNewElement)
                    container.appendChild(document.createTextNode(paste))
                    selection.getRangeAt(0).insertNode(container)
                    selection.getRangeAt(0).selectNodeContents(container)
                    event.preventDefault()
                    return true;
                } else {
                    const selectionNode = selection.getRangeAt(0).commonAncestorContainer
                    if (selectionNode.nodeName.toLowerCase() === "br") {
                        selectionNode.parentNode?.removeChild(selectionNode)
                    }
                    selection.getRangeAt(0).insertNode(document.createTextNode(paste))
                    event.preventDefault()
                }
            })
        } else {
            textFieldDoc.onkeypress = this.handleIFrameKeyPress;
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

        if (this.blogId != undefined) {
            let data = {
                postId: this.blogId
            }
            Axios.post<PostResponse>(`${BLOG_SERVER_URL}/getPost`, data)
                .then(response => {
                    if (response.data.success) {
                        const content = response.data.doc.content
                        this.renderContent(content);
                    } else {
                        toast.error("Something went wrong when get ShowPost")
                    }
                })

            return
        }

        textField.document.body.innerHTML = "<p contenteditable='true'></p>"
    }

    handleImageChosen(imageSrc: string | null) {
        if (this.currentImageEditor != null) {
            this.currentImageEditor.updateSrc(imageSrc)
            return;
        }

        const selectNode = textField.document.getSelection()?.anchorNode as HTMLElement | null
        const parent = getFirstParentContainer(selectNode)
        if (parent == null) return
        const tempElement = document.createElement("div")
        const props = {
            imageSrc: imageSrc,
            toggleActiveCallback: this.toggleActiveCallback
        }

        const imageElement = <ImageEditor {...props}/>
        textField.document.body.insertBefore(tempElement, parent)
        ReactDOM.render(imageElement, tempElement)
        tempElement.replaceWith(tempElement.childNodes[0])
    }

    handleIFrameKeyPress(evt: KeyboardEvent) {
        if (this.state.disableEditor) return;

        const charCode = evt.key.toLowerCase();
        const editorState = this.props.state;
        const dispatch = this.props.dispatch;
        const useCurrentStyle = editorState.useCurrentStyle;
        const selection = textField.window.getSelection()
        if (selection == null) return;
        if (selection.rangeCount == 0) return;
        const range = selection.getRangeAt(0)
        if (range == null) return;

        let rootSelection = selection.anchorNode as HTMLElement | null
        const tagNewElement = useCurrentStyle ? editorState.tagNewElement : "p"

        ////////////////////////////////          PREVENT BROWSER AUTO CREATE NEW ELEMENT            ////////////////////////////////
        if ((rootSelection?.textContent?.slice(range.startOffset)?.length || 0) == 0 && charCode === "enter") {
            evt.preventDefault()
            const element = document.createElement(tagNewElement)
            const parentSelection = getFirstParentContainer(rootSelection)

            element.innerHTML = "<br>"
            element.style['white-space'] = 'normal'
            element.contentEditable = "true"

            if (parentSelection?.nextSibling) {
                textField.document.body.insertBefore(element, parentSelection?.nextSibling)
            } else {
                ////////////////////////////////          NO NEED TO SET SELECTION AFTER TEXT (ENTER BEFORE THE ELEMENT WILL KEEP EDITING AS IT IS)            ////////////////////////////////
                textField.document.body.appendChild(element)
            }

            if (element.childNodes.length == 0) return;
            const startNode = element.childNodes[0] as HTMLElement
            const newRange = document.createRange()
            if (startNode.nodeType == Node.TEXT_NODE) {
                newRange.setStart(startNode, startNode.innerText.length) // 0 or 1 (start or end of text)
            } else {
                newRange.setStart(startNode, 0)
            }
            newRange.collapse(true)
            selection.removeAllRanges()
            selection.addRange(newRange)

            return;
        }

        const tagName = (rootSelection as HTMLElement)?.tagName?.toLowerCase()
        // When root selection is not container and un touch tags (input,...) (can be body) and not text node then insert new element
        if (rootSelection != null
            && rootSelection.tagName
            && !containerTags.includes(tagName)
            && !tagsUnTouch.includes(tagName)) {
            evt.preventDefault()
            //////////////////////////////////////////////////
            let element = document.createElement(tagNewElement)
            element.innerText = charCode
            ////////////////////////////////          CAREFULLY            ////////////////////////////////
            element.style['white-space'] = 'normal'
            element.contentEditable = 'true'

            rootSelection.appendChild(element)

            if (element.childNodes.length == 0) return;
            const startNode = element.childNodes[0]
            const newRange = document.createRange()
            newRange.setStart(startNode, 1)
            newRange.collapse(true)
            selection.removeAllRanges()
            selection.addRange(newRange)

            return;
        }

        // if (charCode === 'enter') {
        //     console.log("Log", 'enter')
        //     evt.preventDefault()
        //     let selection = textField.window.getSelection()
        //     if (selection == null) return
        //     const parentNode = getFirstParentContainer(selection.anchorNode)
        //     const range = selection.getRangeAt(0)
        //     let element;
        //     let currentContent = range.commonAncestorContainer.textContent
        //     let strAfterCursor = currentContent?.slice(range.startOffset).toString() ?? "";
        //     let strBeforeCursor = currentContent?.slice(0, range.startOffset).toString() ?? "";
        //
        //     if (currentContent && currentContent.toString().length > 0) {
        //
        //     }
        //     ///////////////////////////////////////////////////////////////////////////////
        //     if (parentNode != null) {
        //         element = document.createElement("p")
        //         element.contentEditable = "true"
        //         element.style.cssText = document.defaultView?.getComputedStyle(parentNode, "").cssText ?? parentNode.style.cssText;
        //
        //         let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
        //         if (selectionNode == null) return;
        //         ////////////////////////////////          WHEN NEW CONTENT (AFTER REMOVE REMAIN) IS EMPTY IT MEAN MOVE EVERY DOWN            ////////////////////////////////
        //         if (strBeforeCursor?.trim().length == 0) {
        //             selectionNode.innerHTML = "<br>"
        //         } else {
        //             selectionNode.innerText = strBeforeCursor
        //         }
        //
        //         /*      //////////////////////          EXTRACT REMAIN TEXT FOR NEW ELEMENT             ///////////////////////     */
        //         /*      //////////////////////          FIND SPAN TO COPY STYLE OF SPAN INSTEAD REMOVE IT             ///////////////////////     */
        //         const span = document.createElement("span")
        //         if (strAfterCursor.length == 0) {
        //             span.innerHTML = "<br>"
        //         } else {
        //             span.innerText = strAfterCursor
        //         }
        //         element.appendChild(span)
        //
        //     } else {
        //         element = document.createElement("p")
        //         const span = document.createElement('span')
        //
        //         if (useCurrentStyle) {
        //             this.applyEditorStyleElement(span, true);
        //         }
        //         /*      //////////////////////          ADD BREAK FOR SELECT AND EDIT IN IT             ///////////////////////     */
        //         span.innerHTML = '<br>'
        //         /*      //////////////////////          ADD REMAIN STRING TO NEW SPAN AND REMOVE TAKEN STRING FROM SELECTION              ///////////////////////     */
        //         if (strAfterCursor) {
        //             span.innerText += strAfterCursor
        //             let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
        //             if (selectionNode == null) return;
        //             ////////////////////////////////          WHEN NEW CONTENT (AFTER REMOVE REMAIN) IS EMPTY IT MEAN MOVE EVERY DOWN            ////////////////////////////////
        //             if (strBeforeCursor?.length == 0) {
        //                 selectionNode.innerHTML = "<br>"
        //             } else {
        //                 selectionNode.innerText = strBeforeCursor
        //             }
        //         }
        //         element.appendChild(span)
        //     }
        //
        //     if (parentNode != null && parentNode.nodeName?.toLowerCase() === 'p' && editorState.isStyleChanged && element.tagName.toLowerCase() !== "p") {
        //         // If have empty span child then use this as element (no need to append new element)
        //         if (parentNode.children && parentNode.children[0] && parentNode.children[0].tagName.toLowerCase() == "span" && (parentNode.children[0] as HTMLElement).innerText.trim().length == 0) {
        //             const newElement = parentNode.children[0] as HTMLElement;
        //             newElement.innerText = element.innerText;
        //             // Not render so cannot get css Text
        //             // newElement.style.cssText = document.defaultView?.getComputedStyle(element, "").cssText ?? newElement.style.cssText;
        //             if (useCurrentStyle) {
        //                 this.applyEditorStyleElement(newElement, true)
        //             }
        //             element = newElement;
        //         } else {
        //             parentNode.appendChild(element)
        //         }
        //     } else {
        //         // Loop through to get the root <p> element
        //         const parent = getFirstParentContainer(selection.anchorNode)
        //         if (parent != null) {
        //             if (parent.nextSibling) {
        //                 textField.document.body.insertBefore(element, parent.nextSibling)
        //             } else {
        //                 ////////////////////////////////          NO NEED TO SET SELECTION AFTER TEXT (ENTER BEFORE THE ELEMENT WILL KEEP EDITING AS IT IS)            ////////////////////////////////
        //                 textField.document.body.appendChild(element)
        //             }
        //         } else {
        //             textField.document.body.appendChild(element)
        //         }
        //     }
        //
        //     element.style['white-space'] = 'normal'
        //     if (element.childNodes.length == 0) return;
        //     const startNode = element.childNodes[0]
        //     const newRange = document.createRange()
        //     newRange.setStart(startNode, 0) // 0 or 1 (start or end of text)
        //     newRange.collapse(true)
        //     selection.removeAllRanges()
        //     selection.addRange(newRange)
        //
        //     return;
        // }

        // Char code is enter
        // if (editorState.isStyleChanged || charCode === 'enter') {
        //     console.log("skjfksjsfkk", useCurrentStyle)
        //     evt.preventDefault()
        //     let selection = textField.window.getSelection()
        //     if (selection == null) return
        //
        //     // Get parent node of selection node
        //     const parentNode = getFirstParentContainer(selection.anchorNode)
        //     // Get range selection
        //     const range = selection.getRangeAt(0)
        //     let element;
        //     // If is enter (break) then insert container (p or div)
        //     if (charCode === 'enter') {
        //         // Get the text of selection element
        //         let currentContent = range.commonAncestorContainer.textContent
        //         // Get the string after cursor of element
        //         let remainStr = currentContent?.slice(range.startOffset).toString().trim() ?? "";
        //         if (currentContent && currentContent.toString().trim().length > 0) {
        //
        //         }
        //         ///////////////////////////////////////////////////////////////////////////////
        //         if (parentNode != null) {
        //             element = document.createElement("p")
        //             element.contentEditable = "true"
        //             element.style.cssText = document.defaultView?.getComputedStyle(parentNode, "").cssText ?? parentNode.style.cssText;
        //
        //             let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
        //             if (selectionNode == null) return;
        //             const newContent = currentContent?.replace(remainStr, "") ?? ""
        //             ////////////////////////////////          WHEN NEW CONTENT (AFTER REMOVE REMAIN) IS EMPTY IT MEAN MOVE EVERY DOWN            ////////////////////////////////
        //             if (newContent?.trim().length == 0) {
        //                 selectionNode.innerHTML = "<br>"
        //             } else {
        //                 selectionNode.innerText = newContent
        //             }
        //
        //             /*      //////////////////////          EXTRACT REMAIN TEXT FOR NEW ELEMENT             ///////////////////////     */
        //             /*      //////////////////////          FIND SPAN TO COPY STYLE OF SPAN INSTEAD REMOVE IT             ///////////////////////     */
        //             const span = getFirstChildWithTag("span", parentNode)?.cloneNode(false) as HTMLElement | null
        //             if (span != null) {
        //                 if (remainStr.length == 0) {
        //                     span.innerHTML = "<br>"
        //                 } else {
        //                     span.innerText = remainStr
        //                 }
        //                 element.appendChild(span)
        //             } else {
        //                 element.innerText = remainStr
        //             }
        //
        //         } else {
        //             element = document.createElement("p")
        //             const span = document.createElement('span')
        //
        //             if (useCurrentStyle) {
        //                 this.applyEditorStyleElement(span, true);
        //             }
        //             /*      //////////////////////          ADD BREAK FOR SELECT AND EDIT IN IT             ///////////////////////     */
        //             span.innerHTML = '<br>'
        //             /*      //////////////////////          ADD REMAIN STRING TO NEW SPAN AND REMOVE TAKEN STRING FROM SELECTION              ///////////////////////     */
        //             if (remainStr) {
        //                 span.innerText += remainStr
        //                 let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
        //                 if (selectionNode == null) return;
        //                 const newContent = currentContent?.replace(remainStr, "") ?? ""
        //                 ////////////////////////////////          WHEN NEW CONTENT (AFTER REMOVE REMAIN) IS EMPTY IT MEAN MOVE EVERY DOWN            ////////////////////////////////
        //                 if (newContent?.trim().length == 0) {
        //                     selectionNode.innerHTML = "<br>"
        //                 } else {
        //                     selectionNode.innerText = newContent
        //                 }
        //             }
        //             element.appendChild(span)
        //         }
        //
        //     } else {
        //         element = document.createElement("span")
        //         element.innerText = charCode
        //     }
        //
        //     // If has style changed then need to apply style to it
        //     if (useCurrentStyle) {
        //         this.applyEditorStyleElement(element)
        //     }
        //     //  If have container then need to append element inside container instead fragment to not break the paragraph
        //     if (parentNode != null && parentNode.nodeName?.toLowerCase() === 'p' && editorState.isStyleChanged && element.tagName.toLowerCase() !== "p") {
        //         // If have empty span child then use this as element (no need to append new element)
        //         if (parentNode.children && parentNode.children[0] && parentNode.children[0].tagName.toLowerCase() == "span" && (parentNode.children[0] as HTMLElement).innerText.trim().length == 0) {
        //             const newElement = parentNode.children[0] as HTMLElement;
        //             newElement.innerText = element.innerText;
        //             // Not render so cannot get css Text
        //             // newElement.style.cssText = document.defaultView?.getComputedStyle(element, "").cssText ?? newElement.style.cssText;
        //             if (useCurrentStyle) {
        //                 this.applyEditorStyleElement(newElement, true)
        //             }
        //             element = newElement;
        //         } else {
        //             parentNode.appendChild(element)
        //         }
        //     } else {
        //         // Loop through to get the root <p> element
        //         const parent = getFirstParentContainer(selection.anchorNode)
        //         if (parent != null) {
        //             if (parent.nextSibling) {
        //                 textField.document.body.insertBefore(element, parent.nextSibling)
        //             } else {
        //                 ////////////////////////////////          NO NEED TO SET SELECTION AFTER TEXT (ENTER BEFORE THE ELEMENT WILL KEEP EDITING AS IT IS)            ////////////////////////////////
        //                 textField.document.body.appendChild(element)
        //             }
        //         } else {
        //             textField.document.body.appendChild(element)
        //         }
        //     }
        //
        //     // Keep white space to can set start selection in this node
        //     element.style['white-space'] = 'normal'
        //     if (element.childNodes.length == 0) return;
        //     const startNode = element.childNodes[0]
        //     const newRange = document.createRange()
        //     newRange.setStart(startNode, 0) // 0 or 1 (start or end of text)
        //     newRange.collapse(true)
        //     selection.removeAllRanges()
        //     selection.addRange(newRange)
        //
        //     dispatch(setStyleNotChangeEditor())
        //
        //     return;
        //
        // }

    }

    handleIFrameKeyDown(evt: KeyboardEvent) {
        if (this.state.disableEditor) return;
        const selection = textField.window.getSelection()
        if (selection == null) return;

        const charCode = evt.key.toLowerCase();
        let rootSelection = selection.anchorNode as HTMLElement | null
        /*      //////////////////////          KEEP ELEMENT EVEN AFTER DELETE ALL INNER TEXT WHEN USE CTRL BACKSPACE             ///////////////////////     */
        if (rootSelection?.nodeType == Node.TEXT_NODE && charCode === "backspace" && evt.ctrlKey) {
            const text = rootSelection?.textContent
            if (text == null) return;
            if (text.split(" ").length == 1) {
                rootSelection.textContent = ""
                getFirstParentWithTag("span", rootSelection)?.appendChild(document.createElement("br"))
                evt.preventDefault()
                return;
            }

            if (rootSelection?.textContent?.length == 0) {
                getFirstParentContainer(rootSelection)?.remove()
                evt.preventDefault()
                return;
            }

            return;
        }

        /*      //////////////////////          KEEP ELEMENT EVEN AFTER DELETE ALL INNER TEXT             ///////////////////////     */
        if (rootSelection?.nodeType == Node.TEXT_NODE && charCode === "backspace") {
            /*      //////////////////////          KEEP br when have only one char left             ///////////////////////     */
            if (rootSelection?.textContent?.length == 1) {
                rootSelection.textContent = ""
                getFirstParentWithTag("span", rootSelection)?.appendChild(document.createElement("br"))
                evt.preventDefault()
                return;
            }

            if (rootSelection?.textContent?.length == 0) {
                getFirstParentContainer(rootSelection)?.remove()
                evt.preventDefault()
                return;
            }

        }

        /*      //////////////////////          IF WANT TO PLACE CURSOR IN BEGINNING OF PREVIOUS WHEN AFTER DELETE ELEMENT             ///////////////////////     */
        if (charCode === "backspace") {
            let remainStr = rootSelection?.textContent?.slice(0, selection?.getRangeAt(0).startOffset).toString()
            if (remainStr?.length !== 0) return;
            const container = getFirstParentContainer(rootSelection)

            if (container?.previousSibling) {
                const previousSibling = container.previousSibling
                const preChildCount = previousSibling.childNodes.length
                while (container?.childNodes.length > 0) {
                    previousSibling.appendChild(container.childNodes[0]);
                }

                if (previousSibling.childNodes.length == 0) return;
                const startNode = previousSibling.childNodes[0]
                const newRange = document.createRange()
                newRange.setStart(startNode, preChildCount) // 0 or 1 (start or end of text)
                newRange.collapse(true)
                selection.removeAllRanges()
                selection.addRange(newRange)
            }
            container?.remove()
            evt.preventDefault()

            return;
        }

    }

    handleSelectionChange() {
        if (this.state.disableEditor) return;
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
        this.toggleActiveIconStyle(iconBold, element, ["strong"], "font-weight")
    }

    toggleActiveItalic(element: HTMLElement) {
        let iconItalic = document.getElementById("editor-icon-italic")
        if (iconItalic == null) return;
        this.toggleActiveIconStyle(iconItalic, element, ["i"], "font-style")
    }

    toggleActiveUnderline(element: HTMLElement) {
        let iconUnderline = document.getElementById("editor-icon-underline")
        if (iconUnderline == null) return;
        this.toggleActiveIconStyle(iconUnderline, element, ["u"], "text-decoration")
    }

    toggleStrikeIcon(element: HTMLElement) {
        let iconStrike = document.getElementById("editor-icon-strike")
        if (iconStrike == null) return;
        this.toggleActiveIconStyle(iconStrike, element, ["strike"])
    }

    toggleActiveIconStyle(icon: HTMLElement, element: HTMLElement, tags: Array<String>, style: string | null = null) {
        if (element.style == null) return;
        const container = getFirstParentContainer(element);
        if (container == null) return;

        let selection = textField.window.getSelection()
        if (selection && selection.anchorNode && hasParentWithTag(tags, selection.anchorNode)) {
            if (icon.classList.contains("active")) return;
            icon.classList.toggle("active")
            return;
        }

        if (container.style['text-decoration'] === 'underline') {
            if (icon.classList.contains("active")) return;
            icon.classList.toggle("active")
        } else {
            if (icon.classList.contains("active")) {
                icon.classList.toggle("active")
            }
        }

        if (style == null) return;
        for (let i = 0; i < container.children.length; i++) {
            let child = container.children[i] as HTMLElement | null
            if (child == null) return;
            if (child.style[style] === 'underline') {
                if (icon.classList.contains("active")) return;
                icon.classList.toggle("active")
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

        /*      //////////////////////          IF HAS PARENT WITH OL OR UL TAG...             ///////////////////////     */
        const listParent = getFirstParentWithTag(ordered ? "ol" : "ul", element) ?? getFirstChildWithTag(ordered ? "ol" : "ul", element)
        if (listParent == null) {
            /*      //////////////////////          NOT HAVE QUOTE BLOCK             ///////////////////////     */
            if (iconList.classList.contains("active")) {
                iconList.classList.toggle("active")
            }
            return;
        }

        if (typeof element.querySelectorAll == undefined) return;
        /*      //////////////////////          IF HAS DESCENDANT (IT ALSO IS LIST)             ///////////////////////     */
        if (element.querySelectorAll(ordered ? "ol" : "ul").length > 0) {
            if (iconList.classList.contains("active")) return;
            iconList.classList.toggle("active")
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
        const firstParent = getFirstParentTextNode(element)
        if (firstParent) {
            if (!firstParent.style['font-size']) return;
            const inputFontSize = document.getElementById("input-select-font-size")
            if (inputFontSize == null) return;
            inputFontSize.innerText = firstParent.style['font-size']
            return;
        }

        const span = getFirstParentWithTag("span", element)
        if (span == null) return
        if (!span.style['font-size']) return;
        const inputFontSize = document.getElementById("input-select-font-size")
        if (inputFontSize == null) return;
        inputFontSize.innerText = span.style['font-size']
    }

    updateFontOptions(element: HTMLElement) {
        const firstParent = getFirstParentTextNode(element)
        if (firstParent) {
            if (!firstParent.style['font-family']) return;
            const inputFontSize = document.getElementById("input-select-font-family")
            if (inputFontSize == null) return;
            inputFontSize.innerText = firstParent.style['font-family']
            return;
        }

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
        pElement.querySelectorAll("span").forEach(span => {
            span.style['font-size'] = 'unset'
        })
        let container = document.createElement(value);
        container.innerHTML = pElement.innerHTML;
        container.style.cssText = pElement.style.cssText
        /*      //////////////////////          SELECT CONTENT NODE FOR SAME AS BEFORE             ///////////////////////     */
        // pElement.remove()
        // container.innerHTML = pElement.parentElement.innerHTML;
        // pElement.parentElement.parentElement?.replaceChild(container, pElement.parentElement);
        pElement.parentElement?.replaceChild(container, pElement);
        // selection.deleteFromDocument()
        // selection.getRangeAt(0).insertNode(container);
        selection.getRangeAt(0).selectNodeContents(container)

        /************************************************************************************************
         *****************   !END CHANGE THE TAG OF CURRENT SELECT ELEMENT COMMENT    *******************
         ************************************************************************************************/
    }

    /************************************************************************************************
     * ADD FONT FAMILY STYLE FOR CONTAINER
     ************************************************************************************************/
    handleFontFamilyClicked(value: string) {
        this.handleIconToggleSelection('font-family', `${value}`, "p", true)
    }

    /************************************************************************************************
     * STYLE FONT SIZE FOR CONTAINER ELEMENT
     ************************************************************************************************/
    handleFontSizeClicked(value: string) {
        this.handleIconToggleSelection('font-size', `${value}px`, "p", true)
    }

    /************************************************************************************************
     * STRIKE/UN STRIKE THROUGH STYLE THE ELEMENT
     ************************************************************************************************/
    handleStrikeSelection() {
        /************************************************************************************************
         * CHANGE THE TAG OF CURRENT SELECT ELEMENT
         ************************************************************************************************/
        getContainerSelectedElements(textField.window).forEach(element => {
            (element as HTMLElement).querySelectorAll("span").forEach(spanElement => {
                if (spanElement == null || spanElement.parentElement == null) return;
                let d = document.createElement("strike");
                d.innerHTML = spanElement.innerHTML;
                ////////////////////////////////          CLEAR CONTENT            ////////////////////////////////
                spanElement.innerHTML = ""
                spanElement?.appendChild(d)
            })
        })

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
        if (parent == null) return;
        /*      //////////////////////          HAVE QUOTE BLOCK             ///////////////////////     */
        if (parent.classList.contains("quote-container")) {
            parent.classList.remove("quote-container", "fa")
            return;
        }

        // const spanElement = getFirstParentWithTag("span", selectionNode) ?? getFirstChildWithTag("span", selectionNode)
        //
        // if (spanElement == null || spanElement.parentElement == null) return;
        // spanElement.parentElement.classList.add("quote-container", "fa")
        parent.classList.add("quote-container", "fa")

        this.handleUpdateUI(selectionNode)
        /************************************************************************************************
         *****************   !END CHANGE THE TAG OF CURRENT SELECT ELEMENT COMMENT    *******************
         ************************************************************************************************/
    }

    handleIntentElement(increase: boolean = true) {
        const selectedElements = getContainerSelectedElements(textField.window)
        selectedElements.forEach(it => {
            const element = it as HTMLElement
            const x = parseInt(element.style.marginLeft || "0")
            element.style['margin-left'] = `${x + (increase ? 1 : -1)}em`
        })
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
            listElement.childNodes.forEach(function (it) {
                if (it.childNodes.length != 0) {
                    /************************************************************************************************
                     * NOTE: ONLY CLONE THE CHILD OF LI ELEMENT NOT OTHER ELEMENT (IF IT NOT LI ELEMENT JUST KEEP IT)
                     * FOR WORKING WITH LIST ELEMENT AGAIN (INSERT BEFORE NEED TO FIND CONTAINER)
                     ************************************************************************************************/
                    if (it.nodeName.toLowerCase() == "li") {
                        const x = it.childNodes[0].cloneNode(true)
                        childrenCloned.push(x)
                    } else {
                        childrenCloned.push(it)
                    }
                }
            })

            if (childrenCloned.length == 0) return;
            const fragment = document.createDocumentFragment();
            childrenCloned.forEach(it => {
                fragment.appendChild(it)
            })
            listElement.parentElement?.parentElement?.replaceChild(fragment, listElement.parentElement)

            const range = new Range()
            // range.selectNodeContents(fragment)
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
            /************************************************************************************************
             * HERE IT WILL GET ALL SELECT ELEMENTS AND WRAP IT IN DIV > OL OR UL > LI > ELEMENT
             ************************************************************************************************/
            const selectedElements = getSelectedElementTags(textField.window) ?? []
            const container = document.createElement("div")
            const list = document.createElement(ordered ? "ol" : "ul")
            container.classList.add("ml-4")
            container.appendChild(list)
            let flagFirst = false // Only add container for once
            for (let i = 0; i < selectedElements.length; i++) {
                const child = selectedElements[i]
                if (child.nodeName.toLowerCase() === "p") {
                    /*      //////////////////////          KEEP IT AS IF IT IS EMPTY ELEMENT             ///////////////////////     */
                    if ((child as HTMLElement).innerText.trim().length == 0) {
                        list.appendChild(child)
                        continue;
                    }
                    /*      //////////////////////          WRAP IT IN LI             ///////////////////////     */
                    const li = document.createElement("li")
                    child.parentNode?.replaceChild(li, child)
                    li.appendChild(child)
                    /*      //////////////////////          WRAP IN CONTAINER             ///////////////////////     */
                    if (!flagFirst) {
                        li.parentNode?.replaceChild(container, li)
                        flagFirst = true
                    }
                    list.appendChild(li)
                }
            }

            /*      //////////////////////          UNCOMMENT IF ONLY WANT TO LIST THE SELECT (EVEN PARTIAL)             ///////////////////////     */
            /*      //////////////////////          ONLY LIST SELECTED ELEMENT (PARTIAL NOT WHOLE)             ///////////////////////     */
            /*      //////////////////////          WRAP LIST AROUND SELECTED ELEMENTS             ///////////////////////     */
            // for (let i = 0; i < content.children.length; i++) {
            //     const child = content.children[i]
            //     if ((child as HTMLElement).innerText.trim().length == 0) continue;
            //     const li = document.createElement("li")
            //     child.parentNode?.replaceChild(li, child)
            //     li.appendChild(child)
            // }
            //
            // const containerSelect = getFirstParentContainer(selectionNode)
            // const parent = containerSelect?.parentElement
            // if (parent == null) return;
            /*      //////////////////////          REMOVE SELECT ELEMENTS             ///////////////////////     */
            // const x = range.extractContents()

            // const container = document.createElement("div")
            // const list = document.createElement(ordered ? "ol" : "ul")
            // list.appendChild(content)
            // container.classList.add("ml-4")
            // container.appendChild(list)
            //
            // // parent.appendChild(container)
            // parent.insertBefore(container, containerSelect)
            // range.selectNode(container)

            this.handleUpdateUI(container)
        }

        /************************************************************************************************
         *****************   !END CHANGE THE TAG OF CURRENT SELECT ELEMENT COMMENT    *******************
         ************************************************************************************************/
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
        let selectionElement = selection.anchorNode as HTMLElement | null
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

        /************************************************************************************************
         * WHEN USE PARENT THEN NEED TO APPLY STYLE ON CONTAINER TO MAKE WHOLE CHILD EFFECT
         * USEFUL WHEN UPDATE TAG OF SELECTED
         * ABOVE HAS ADD STYLE IT NOT USE PARENT SO ONLY APPLY STYLE IF USE PARENT (NOT APPLY STYLE AGAIN FOR SPAN,
         * IT IS INCORRECT)
         ************************************************************************************************/
        if (useParent) {
            const selectedElements = getContainerSelectedElements(textField.window)
            selectedElements.forEach(it => {
                const element = it as HTMLElement
                if (element.style[style] === value) {
                    element.style[style] = ``
                } else {
                    element.style[style] = value
                }
            })
            this.handleUpdateUI(selectionElement)
            return;
        } else {
            /************************************************************************************************
             * CAN USE TWO CASE (MODIFY EXITS AND REPLACE WITH NEW)
             * CHOOSE CAREFULLY...
             ************************************************************************************************/

            /*      //////////////////////          MODIFY CHILD CASE             ///////////////////////     */
            getContainerSelectedElements(textField.window).forEach(element => {
                const parent = (element as HTMLElement)
                parent.querySelectorAll("span").forEach((element: HTMLElement) => {
                    if (element.style[style] === value) {
                        element.style[style] = ``
                    } else {
                        element.style[style] = value
                    }
                })
            })

            /*      //////////////////////          REPLACE CHILD CASE             ///////////////////////     */
            // removeAllChildNodes(parent)
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

            this.handleUpdateUI(selectionElement)
            return;
        }

        /*      //////////////////////          ONLY APPLY THE SELECTED PART NOT ENTIRE ELEMENT             ///////////////////////     */
        // let startSelected = range.startOffset
        // let endSelected = range.endOffset
        // let spanSelected = getFirstParentWithTag("span", selectionElement)
        // if (spanSelected == null) return;
        // /************************************************************************************************
        //  * WHEN SELECT PART TEXT NODE OF ELEMENT (SELECT ONLY SOME CONTENT NOT ENTIRE ELEMENT)
        //  ************************************************************************************************/
        // if (startSelected !== endSelected && range.startContainer.nodeType == Node.TEXT_NODE
        //     && endSelected - startSelected != spanSelected.innerText.length) {
        //     const textContent = range.commonAncestorContainer.textContent
        //     if (textContent == null) return;
        //     const selectText = textContent?.slice(startSelected, endSelected).toString();
        //     const remainText = textContent.slice(endSelected).toString()
        //     if (selectText == null) return;
        //
        //     let span = document.createElement("span")
        //
        //     span.style.cssText = spanSelected?.style.cssText ?? span.style.cssText
        //     span.innerText = selectText
        //     span.style[style] = value
        //     getFirstParentContainer(selectionElement)?.appendChild(span)
        //
        //     range.commonAncestorContainer.textContent = textContent.replace(selectText, "")
        //
        //     /************************************************************************************************
        //      * IF HAS REMAIN STRING ADD NEW SPAN FOR REMAIN STR
        //      ************************************************************************************************/
        //     if (remainText.length === 0) return;
        //
        //     range.commonAncestorContainer.textContent = textContent.replace(remainText, "").replace(selectText, "")
        //     let spanRemain = document.createElement("span")
        //     spanRemain.style.cssText = getFirstParentWithTag("span", selectionElement)?.style.cssText ?? span.style.cssText
        //     spanRemain.innerText = remainText
        //     getFirstParentContainer(selectionElement)?.appendChild(spanRemain)
        //
        //     return;
        // }
    }

    /************************************************************************************************
     * UPDATE STATE OF ICONS
     ************************************************************************************************/
    handleUpdateUI(selectElement: HTMLElement | null) {
        if (selectElement == null) return

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

    handleToggleCode() {
        let iconCode = document.getElementById("editor-icon-toggle-code")
        if (iconCode == null) return;
        if (textField.document.body.children.length <= 0) return;
        const htmlText = String(textField.document.body.innerHTML);

        iconCode.classList.toggle("active")
        const showCode = !this.state.showCode
        this.setState({showCode: showCode})
        this.setState({disableEditor: showCode})

        /*      //////////////////////          IF NOT SHOW CODE UN HIDE ALL ELEMENTS AND HIDE html editor            ///////////////////////     */
        if (!showCode) {
            this.iFrameTextField && (this.iFrameTextField.style['display'] = 'inherit');
            this.iFrameCodeField && (this.iFrameCodeField.style['display'] = 'none');
            const code = this.htmlEditor?.current?.getCode()
            if (code) {
                this.renderContent(code)
            }

            return;
        }

        /*      //////////////////////          HIDE ALL CHILDREN             ///////////////////////     */
        // for (let i = 0; i < textField.document.body.children.length; i++) {
        //     (textField.document.body.children[i] as HTMLElement).style['display'] = 'None';
        //     // textField.document.body.style['display'] = 'None';
        //
        // }

        this.iFrameTextField && (this.iFrameTextField.style['display'] = 'none');
        this.iFrameCodeField && (this.iFrameCodeField.style['display'] = 'inherit');

        /*      //////////////////////          IF ADDED CODE JUST NEED TO SHOW  IT             ///////////////////////     */
        if (this.htmlEditor.current != null) {
            this.htmlEditor.current.toggleVisible(true)
            this.htmlEditor.current.setCode(textField.document.body.innerHTML)
            return;
        }

        const htmlEditor = <HtmlEditor value={htmlText} ref={this.htmlEditor}/>
        const fragment = codeField.document.createDocumentFragment()
        ReactDOM.render(htmlEditor, fragment)
        codeField.document.body.appendChild(fragment)

        // const x = <HtmlEditor value={htmlText} ref={this.htmlEditor}/>
        // const f = codeField.document.createDocumentFragment()
        // ReactDOM.render(x, f)
        // codeField.document.body.appendChild(f)

    }

    handleToggleUseStyle() {

    }

    handleToggleWrapTextContent(wrapperTag: string) {
        /************************************************************************************************
         * CHANGE FONT WEIGHT OF SPAN ELEMENT
         * CAREFULLY USE GET PARENT CONTAINER OR CHILD CONTAINER DEPEND ON TYPE OF SELECTION
         ************************************************************************************************/

        let selection = textField.window.getSelection()
        if (selection == null || selection.anchorNode == null) return
        let selectionElement = getFirstParentTextNode(selection.anchorNode)
        let container = getFirstParentContainer(selection.anchorNode)
        if (selectionElement == null || selectionElement.textContent == null || container == null) return;

        const wrapperBefore =
            container.querySelector(wrapperTag)
        if (wrapperBefore) {
            removeParent(wrapperBefore)
            return;
        }

        getContainerSelectedElements(textField.window).forEach(element => {
            const wrapper = document.createElement(wrapperTag)
            while (element?.childNodes.length > 0) {
                wrapper.appendChild(element.childNodes[0]);
            }
            element.appendChild(wrapper)
        })
    }

    toggleActiveCallback = (callbackParams: ImageEditorFocusCallbackParams) => {
        if (callbackParams.focus) {
            this.currentImageEditor = callbackParams.ref
        } else {
            this.currentImageEditor = null
        }
    }

    private renderContent(content: string) {
        /*      //////////////////////          MUST NEED TO USE textField.document because it is contextual             ///////////////////////     */
        const fragment = textField.document.createRange().createContextualFragment(content)
        const attrs = fragment.querySelectorAll("figure")
        attrs.forEach(att => {
            for (let i = 0; i < (att?.attributes?.length || 2); i++) {
                if (att?.attributes[i].nodeName == "style") {
                    const src = att.querySelector("img")?.src
                    const figcaption = att.querySelector("figcaption")
                    const props = {
                        imageSrc: src,
                        elementStyle: style2object(att?.attributes[i].nodeValue),
                        toggleActiveCallback: this.toggleActiveCallback,
                        caption: figcaption?.innerHTML
                    }
                    const imageElement = <ImageEditor {...props}/>
                    ReactDOM.render(imageElement, att)
                    att.replaceWith(att.childNodes[0])
                }
            }
        })

        textField.document.body.innerHTML = ""
        textField.document.body.appendChild(fragment)
    }

    /************************************************************************************************
     * MOVE FROM RENDER
     ************************************************************************************************/
    load() {
        textField.document.designMode = "On";
        textField.document.body.spellcheck = false;
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

            // scope.handleIconToggleSelection('font-weight', 'bold')
            scope.handleToggleWrapTextContent("strong")

        }

        async function italicSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            dispatch(toggleItalic())

            // scope.handleIconToggleSelection('font-style', 'italic')
            scope.handleToggleWrapTextContent("i")

        }

        async function underlineSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            dispatch(toggleUnderline())

            // scope.handleIconToggleSelection('text-decoration', 'underline')
            scope.handleToggleWrapTextContent("u")

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

            // scope.handleStrikeSelection()
            scope.handleToggleWrapTextContent("strike")
        }

        function quoteSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            // dispatch(toggleAlignCenter())

            scope.handleQuoteElement()
        }

        function indentSelection() {
            scope.handleIntentElement()
        }

        function dedentSelection() {
            scope.handleIntentElement(false)
        }

        function listItemsSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            scope.handleListElement(false)
        }

        function listItemsOrderedSelection(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)
            scope.handleListElement(true)
        }

        function toggleCode(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)

            scope.handleToggleCode()
        }

        function toggleUseCurrentStyle(event: React.MouseEvent<HTMLElement>) {
            onIconEditorClicked(event)

            scope.handleToggleCode()
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
                                     onApply={(text: string, link: string) => {
                                         // textField.document.getElementById("popup-add-link")?.remove()
                                         const a = document.createElement("a")
                                         a.title = text
                                         a.href = link
                                         a.appendChild(document.createTextNode(text))
                                         // textField.document.body.appendChild(a)
                                         container.parentNode?.insertBefore(a, container)
                                         container.remove()
                                         if (selectionNode?.nodeType === Node.TEXT_NODE) {
                                             selectionNode?.remove()
                                         }
                                         scope.setState({disableEditor: false})
                                     }}/>

            if (constraint == null) {
                textField.document.body.appendChild(container)
                ReactDOM.render(popup, container)
                return
            }

            constraint.appendChild(container)
            ReactDOM.render(popup, container)

            scope.setState({disableEditor: true})
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
            const content = textField.document.body.innerHTML
            const title = getFirstChildContainer(textField.document.body)?.innerText

            let data = {
                title: title,
                content: content,
                blogId: scope.blogId
            }

            dispatch(savePost(data))
                // @ts-ignore
                .then((response) => {
                    if (response.payload.success) {
                        toast.success("Save post successfully!")
                    } else {
                        toast.error("Failed to save post. Please try again!")
                    }
                })
                // @ts-ignore
                .catch(_ => {
                    toast.error("Failed to save post. Please try again")
                })
        }

        // @ts-ignore
        return (
            <div className="w-11/12 bg-white mt-break mx-auto"
                 style={{height: '100vh', backgroundColor: "#f0f1f2"}}>
                <div>
                    <div className="py-2 flex justify-content-end mx-5">
                        <div onClick={handleSave}
                             className="d-flex font-roboto outline-none-imp font-weight-bold align-items-center duration-500 custom-btn-rounded bg-blue-600">
                            <i className="fa fa-shopping-cart mr-3 duration-500"/>
                            Publish
                        </div>
                    </div>
                    <div className="flex justify-between mx-3 flex-wrap child-mx-1 ml-auto py-3 mr-0 rounded-md px-3"
                         style={{backgroundColor: "#ffffff"}}>

                        <div className="flex justify-between child-mx-2 md:w-6/12 lg:w-4/12">
                            <ul className="custom-dropdown" id="custom-dropdown">
                                <div className="tooltip w-100 h-full absolute z-10">
                                    <span className="tooltip-text">Select Heading</span>
                                </div>

                                <p id="input-select-tag-new-element" className="pl-5 py-1">Normal Text</p>

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
                                <p id="input-select-font-family" className="pl-5 py-1">Roboto</p>
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

                                <p id="input-select-font-size" className="pl-5 py-1">18</p>
                                <ul className="options" id="options">
                                    {this.mapFontSize.map(function (item) {
                                        return <li key={`${item}-${FONT_SIZE_KEY}`} data-value={item}
                                                   data-key={FONT_SIZE_KEY}><span
                                            style={{fontSize: `${item}px`}}>{item}</span></li>
                                    })}
                                </ul>
                            </ul>
                        </div>
                        <div className="flex justify-content-between flex-wrap flex-grow md:mt-4 lg:mt-0">
                            <div className="center-element-inner editor-icon tooltip" id="editor-icon-bold"
                                 data-cmd="bold"
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

                            <div className="center-element-inner editor-icon tooltip"
                                 onClick={indentSelection}>
                                <span className="tooltip-text">Indent Text</span>
                                <i className="fa fa-indent"/>
                            </div>
                            <div className="center-element-inner editor-icon tooltip"
                                 onClick={dedentSelection}>
                                <span className="tooltip-text">Dedent Text</span>
                                <i className="fa fa-outdent"/>
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

                            <div className="center-element-inner editor-icon tooltip"
                                 id="editor-icon-toggle-code"
                                 onClick={toggleCode}>
                                <span className="tooltip-text">Toggle code</span>
                                <i className="fas fa-code"/>
                            </div>

                            <div className="center-element-inner editor-icon tooltip">
                                <span className="tooltip-text">Undo</span>
                                <i className="fa fa-redo-alt"/>
                            </div>
                            <div className="center-element-inner editor-icon tooltip">
                                <span className="tooltip-text">Redo</span>
                                <i className="fa fa-undo-alt"/>
                            </div>

                            <div className="center-element-inner editor-icon tooltip"
                                 id="editor-icon-toggle-code"
                                 onClick={toggleUseCurrentStyle}>
                                <span className="tooltip-text">Use current style for next element</span>
                                <i className="fas fa-check"/>
                            </div>
                        </div>

                    </div>
                    <iframe name="textField" id="textField"
                            className="mx-auto mt-12 bg-white shadow rounded-md px-8 py-4"
                            spellCheck="false"
                            onLoad={this.load}
                            style={{width: "80%", minHeight: "75vh"}}>
                        <style>
                        </style>

                    </iframe>

                    <iframe name="codeField" id="codeField"
                            className="mx-auto mt-12 bg-white shadow rounded-md px-8 py-4"
                            spellCheck="false"
                            style={{width: "80%", minHeight: "75vh", display: "none"}}>
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
export default connect(mapStateToProps)(BlogEditor);