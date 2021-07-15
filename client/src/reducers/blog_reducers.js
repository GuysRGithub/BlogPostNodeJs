import {SAVE_POST} from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case SAVE_POST:
            return {...state}
        default:
            return state
    }
}