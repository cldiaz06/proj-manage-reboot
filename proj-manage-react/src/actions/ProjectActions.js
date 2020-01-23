import axios from 'axios';
import {GET_ERRORs, GET_PROJECTS, GET_PROJECT, DEL_PROJECT} from './Types';


export const createProject = (project, history) => async dispatch =>{
    try {
        const res = await axios.post
            ("/api/project", project);
            history.push("/dashboard") ;
            dispatch({
                type:GET_ERRORs,
                payload:{}
            })   
    } catch (error) {
        dispatch({
            type:GET_ERRORs,
            payload:error.response.data
        })
    }
    ;
};

export const getProjects = () => async dispatch => {
    const res = await axios.get("/api/project/all");
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    });
};

export const getProject = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/project/${id}`)
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
    } catch (error) {
        history.push("/dashboard");
    }

};

export const delProject = (id) => async dispatch =>{
    if(window.confirm("Are you sure you want to delete this project?")){
        await axios.delete(`/api/project/${id}`)
        dispatch({
            type:DEL_PROJECT,
            payload: id
        })
    }
}

