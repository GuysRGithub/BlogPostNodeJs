import {
    TOGGLE_BOLD_EDITOR,
    TOGGLE_ITALIC_EDITOR,
    TOGGLE_UNDERLINE_EDITOR,
    STYLE_CHANGE_EDITOR,
    STYLE_NOT_CHANGE_EDITOR,
    TOGGLE_ALIGN_LEFT_EDITOR,
    TOGGLE_ALIGN_CENTER_EDITOR,
    TOGGLE_ALIGN_RIGHT_EDITOR,
    CHANGE_TAG_NEW_ELEMENT_EDITOR,
    CHANGE_FONT_SIZE_ELEMENT_EDITOR, CHANGE_FONT_FAMILY_ELEMENT_EDITOR
} from "../_actions/types";

const defaultState = {
    boldEnable: false,
    italicEnable: false,
    underlineEnable: false,
    isStyleChanged: false,
    isAlignLeft: false,
    isAlignCenter: false,
    isAlignRight: false,
    tagNewElement: "p",
    fontSize: 16,
    fontFamily: "",
}

export default function (state = defaultState, action) {
    switch (action.type) {
        case TOGGLE_BOLD_EDITOR:
            return {...state, boldEnable: !state.boldEnable}
        case TOGGLE_UNDERLINE_EDITOR:
            return {...state, underlineEnable: !state.underlineEnable}
        case TOGGLE_ITALIC_EDITOR:
            return {...state, italicEnable: !state.italicEnable}
        case STYLE_CHANGE_EDITOR:
            return {...state, isStyleChanged: true}
        case STYLE_NOT_CHANGE_EDITOR:
            return {...state, isStyleChanged: false}
        case TOGGLE_ALIGN_LEFT_EDITOR:
            return {...state, isAlignLeft: !state.isAlignLeft}
        case TOGGLE_ALIGN_CENTER_EDITOR:
            return {...state, isAlignCenter: !state.isAlignCenter}
        case TOGGLE_ALIGN_RIGHT_EDITOR:
            return {...state, isAlignRight: !state.isAlignRight}
        case CHANGE_TAG_NEW_ELEMENT_EDITOR:
            return {...state, tagNewElement: action.value}
        case CHANGE_FONT_SIZE_ELEMENT_EDITOR:
            return {...state, fontSize: action.value}
        case CHANGE_FONT_FAMILY_ELEMENT_EDITOR:
            return {...state, fontFamily: action.value}
        default:
            return state
    }
}