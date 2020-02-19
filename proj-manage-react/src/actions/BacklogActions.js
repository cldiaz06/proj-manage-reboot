import axios from 'axios';
import {GET_ERRORs, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK} from './Types';

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

export const getBacklog = backlog_id => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlog_id}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORs,
            payload: err.response.data
        })
    }
}

export const getProjectTask= (backlog_id, ptId, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlog_id}/${ptId}`)
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    } catch (err) {
        history.push("/dashboard");
    }
}

export const updateProjectTask = (backlog_id, ptId, project_task, history) => async  dispatch =>{
    try {
        await axios.patch(`/api/backlog/${backlog_id}/${ptId}`, project_task);
        history.push(`/projectboard/${backlog_id}`);
        dispatch({
            type: GET_ERRORs,
            payload:{}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORs,
            payload:  err.response.data
        });
    }
}

export const delProjectTask = (backlog_id, ptId) => async dispatch => {
    if (window.confirm(`You are deleting task ${ptId}, are you sure you want to proceed?`)) {
        await axios.delete(`/api/backlog/${backlog_id}/${ptId}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: ptId
        });
    }
}