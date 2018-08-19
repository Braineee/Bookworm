import { USER_LOGGED_IN } from "../types";
/**
 * A reducer is a function that
 * takes state and action and 
 * return new state
 */ 
export default function user(state = {}, action = {}){
    switch(action.type){
        case USER_LOGGED_IN:
            return action.user; 
        default: return state;
    }
}