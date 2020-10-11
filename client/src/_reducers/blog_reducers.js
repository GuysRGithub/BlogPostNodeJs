import {SAVE_POST} from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case SAVE_POST:
            return {...state}
        default:
            return state
    }
}