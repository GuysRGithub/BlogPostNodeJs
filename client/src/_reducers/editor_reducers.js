import {TOGGLE_BOLD_EDITOR, TOGGLE_ITALIC_EDITOR, TOGGLE_UNDERLINE_EDITOR, STYLE_CHANGE_EDITOR, STYLE_NOT_CHANGE_EDITOR} from "../_actions/types";

const defaultState = {
    boldEnable: false,
    italicEnable: false,
    underlineEnable: false,
    isStyleChanged: false
}

export default function (state = {}, action) {
    console.log("FUck Update STate", !state.underlineEnable)
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
        default:
            return state
    }
}