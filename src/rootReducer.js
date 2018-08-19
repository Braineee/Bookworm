import { combineReducers } from 'redux';
import user from './reducers/user';

/**
 * notice- reducer is just a function that
 * takes a state and return it
 */
export default combineReducers({
    user
})