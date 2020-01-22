import axios from 'axios';
import {GET_ERRORs, GET_PROJECTS, GET_PROJECT} from './Types';


export const createProject = (project, history) => async dispatch =>{
    try {
        const res = await axios.post
            ("http://localhost:8081/api/project", project);
            history.push("/dashboard")    
    } catch (error) {
        dispatch({
            type:GET_ERRORs,
            payload:error.response.data
        })
    }
    ;
};

export const getProjects = () => async dispatch => {
    const res = await axios.get("http://localhost:8081/api/project/all");
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    });
};

export const getProject = (id, history) => async dispatch => {
    const res = await axios.get(`http://localhost:8081/api/project/${id}`)
    dispatch({
        type: GET_PROJECT,
        payload: res.data
    });
};
