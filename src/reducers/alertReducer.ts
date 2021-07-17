import {
    fromJS
}

    from 'immutable';
import {
    REMOVE_ERROR,
    SET_ERROR
}

    from '../constants/action-types';
export function alertReducer(state = fromJS({}

), action) {
    switch (action.type) {
        case SET_ERROR: return state.set(action.id, {
            alertMsg: action.errorMsg
        }
        );
        case REMOVE_ERROR: return state.delete(action.id).delete('alertMsg');
        default: return state;
    }
}
