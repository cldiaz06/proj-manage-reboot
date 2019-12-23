import axios from 'axios';
import {GET_ERRORs} from './Types';

export const createProject = (project, history) => async dispatch =>{
    try {
        const res = await axios.post
            ("http://localhost:8081/api/project", project)
            history.push("/dashboard")    
    } catch (error) {
        dispatch({
            type:GET_ERRORs,
            payload:error.response.data
        })
    }
    
}
