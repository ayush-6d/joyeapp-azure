import { fromJS } from 'immutable';
import { LOGIN_USER } from 'src/constants/action-types';
export function loginReducer(state = fromJS({}), action) {
    switch (action.type) {
        case LOGIN_USER:
            return state.set('login', action.userData).set('isLoggedIn', true);
        default:
            return state;
    }
}
