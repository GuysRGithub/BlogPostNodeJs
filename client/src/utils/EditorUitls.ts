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