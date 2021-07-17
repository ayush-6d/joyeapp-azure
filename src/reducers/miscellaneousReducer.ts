import { fromJS } from 'immutable';
import {
    IS_ALL_MAPPED, IS_CSV_IMPORTED,
    SAVE_CONTACTS_LOCALLY, SAVE_CONTACT_HEADERS, SAVE_IGNORED_HEADERS, SAVE_KEY_POINTS, SAVE_TAGS_LOCALLY, SAVE_TARGET_AMOUNT
} from 'src/constants/action-types';
export function miscellaneousReducer(state = fromJS({}), action) {
    switch (action.type) {
        case SAVE_CONTACTS_LOCALLY:
            return state.set('localContacts', action.contactsArray);
        case SAVE_CONTACT_HEADERS:
            return state.set('contactHeaders', action.headers);
        case SAVE_TAGS_LOCALLY:
            // const tagNames = state.get('tagNames') || [];
            // tagNames.push(action.tagName);
            return state.set('tagNames', action.tagName);
        case IS_ALL_MAPPED:
            return state.set('isDone', action.isDone);
        case SAVE_KEY_POINTS:
            return state.set('keyPoints', action.keyPoints);
        case IS_CSV_IMPORTED:
            return state.set('isImported', action.isImported).set('fileName', action.fileName);
        case SAVE_TARGET_AMOUNT:
            return state.set('targetAmount', action.amount);
        case SAVE_IGNORED_HEADERS:
            return state.set('ignoredHeaders', action.ignoredHeaders);
        default:
            const isDone = state.get('isDone') === false ? false : true;
            return state.set('isDone', isDone);
    }
}
