import { dispatch } from 'src/utilities/generalUtils';
import { SET_ERROR, REMOVE_ERROR } from 'src/constants/action-types';

export function setAlert(id, errorMsg?) {
    return dispatch({
        type: SET_ERROR,
        id,
        errorMsg
    });
}

export function removeAlert(id) {
    return dispatch({
        type: REMOVE_ERROR,
        id
    });
}
