import axios from 'axios';
import {GET_ERRORs} from './Types';

export const addProjectTask = (backlog_id, project_task, history) => async dispatch =>{

    try {
        await axios.post(`/api/backlog/${backlog_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`);
        dispatch({
            type: GET_ERRORs,
            payload: {}
        })   
    } catch (err) {
        dispatch({
            type: GET_ERRORs,
            payload: err.response.data
        })
    }
    
}