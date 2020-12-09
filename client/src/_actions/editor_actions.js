import {TOGGLE_BOLD_EDITOR, TOGGLE_ITALIC_EDITOR, TOGGLE_UNDERLINE_EDITOR, STYLE_CHANGE_EDITOR, STYLE_NOT_CHANGE_EDITOR} from "./types";

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

export default function setStyleNotChangeEditor() {
    return {
        type: STYLE_NOT_CHANGE_EDITOR
    }
}