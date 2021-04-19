import {execCommandStyle, ExecCommandStyle} from "../assets/ts/editor";

export async function boldSelection() {
    await styleElement('font-weight', 'bold')
}

export async function italicSelection() {
    await styleElement('font-style', 'italic')
}

export async function underlineSelection() {
    await styleElement('text-decoration', 'underline')
}

export async function alignLeftSelection() {
    await styleElement('text-align', 'left')
}

export async function alignRightSelection() {
    await styleElement('text-align', 'right')
}

export async function alignCenterSelection() {
    await styleElement('text-align', 'center')
}

export async function alignJustifySelection() {
    await styleElement('text-align', 'justify')
}

export async function styleElement(style: string, value: string) {
    let action: ExecCommandStyle = {
        style: style,
        value: value,
        initial: (element: HTMLElement | null) => new Promise<boolean>(((resolve) => {
            if (element?.style[style]) {
                resolve(true)
            } else {
                resolve(false)
            }
        }))
    }

    await execCommandStyle(action, "div")
}

export function getFirstParentWithTag(tag: string, child: HTMLElement | null) {
    // let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
    let selectionNode: HTMLElement | null = child
    while (selectionNode != null && selectionNode.tagName?.toLowerCase() !== tag.toLowerCase()) {
        selectionNode = selectionNode.parentElement
    }
    return selectionNode
}

export function getFirstChildWithTag(tag: string, child: HTMLElement | null) {
    if (child == null || !child.querySelectorAll) return null;
    const selects = child.querySelectorAll(tag)
    if (selects.length > 0) {
        return selects[0]
    }
    return null;
}

export function getFirstParent(child: HTMLElement | null) {
    // let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
    return getFirstParentWithTags(["p", "h1", "h2", "h3", "h4", "h5", "h6"], child)
}

export function getFirstParentWithTags(tag: Array<String>, child: HTMLElement | null) {
    // let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
    let selectionNode: HTMLElement | null = child
    while (selectionNode != null && !tag.includes(selectionNode.tagName?.toLowerCase())) {
        selectionNode = selectionNode.parentElement
    }
    return selectionNode
}


export function getFirstParentNotWithTag(tag: string, child: HTMLElement | null) {
    // let selectionNode = selection.anchorNode?.parentNode as HTMLElement | null
    let selectionNode: HTMLElement | null = child
    do {
        selectionNode = selectionNode?.parentElement as HTMLElement | null
    } while (selectionNode != null && selectionNode.tagName?.toLowerCase() === tag.toLowerCase());

    return selectionNode
}

export function removeAllChildNodes(parent: HTMLElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}