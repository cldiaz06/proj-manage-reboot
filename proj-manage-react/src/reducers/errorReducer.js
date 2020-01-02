import {GET_ERRORs} from '../actions/Types';

const initState = {};

export default function(state=initState, action){
    switch(action.type){
        
        case GET_ERRORs:
            return action.payload;
        
        default:
            return state;
    }
}