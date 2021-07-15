import {
    TOGGLE_BOLD_EDITOR,
    TOGGLE_ITALIC_EDITOR,
    TOGGLE_UNDERLINE_EDITOR,
    STYLE_CHANGE_EDITOR,
    STYLE_NOT_CHANGE_EDITOR,
    TOGGLE_ALIGN_EDITOR,
    TOGGLE_ALIGN_LEFT_EDITOR,
    TOGGLE_ALIGN_CENTER_EDITOR,
    TOGGLE_ALIGN_RIGHT_EDITOR,
    TOGGLE_ALIGN_JUSTIFY_EDITOR,
    CHANGE_TAG_NEW_ELEMENT_EDITOR,
    CHANGE_FONT_SIZE_ELEMENT_EDITOR,
    CHANGE_FONT_FAMILY_ELEMENT_EDITOR
} from "./types";

export function toggleBold() {
    return {
        type: TOGGLE_BOLD_EDITOR
    }
}

export function toggleItalic() {
    return {
        type: TOGGLE_ITALIC_EDITOR
    }
}

export function toggleUnderline() {
    return {
        type: TOGGLE_UNDERLINE_EDITOR
    }
}

export function setStyleChangeEditor() {
    return {
        type: STYLE_CHANGE_EDITOR
    }
}


export function toggleAlignLeft() {
    return {
        type: TOGGLE_ALIGN_LEFT_EDITOR
    }
}


export function toggleAlignCenter() {
    return {
        type: TOGGLE_ALIGN_CENTER_EDITOR
    }
}

export function toggleAlignRight() {
    return {
        type: TOGGLE_ALIGN_RIGHT_EDITOR
    }
}


export function toggleAlignJustify() {
    return {
        type: TOGGLE_ALIGN_JUSTIFY_EDITOR
    }
}

export function changeTagNewElement(tag) {
    return {
        type: CHANGE_TAG_NEW_ELEMENT_EDITOR,
        value: tag
    }
}

export function changeFontSizeElement(fontSize) {
    return {
        type: CHANGE_FONT_SIZE_ELEMENT_EDITOR,
        value: fontSize
    }
}

export function changeFontFamilyElement(fontFamily) {
    return {
        type: CHANGE_FONT_FAMILY_ELEMENT_EDITOR,
        value: fontFamily
    }
}

export default function setStyleNotChangeEditor() {
    return {
        type: STYLE_NOT_CHANGE_EDITOR
    }
}