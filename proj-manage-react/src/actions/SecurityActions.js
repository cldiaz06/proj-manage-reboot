import axios from 'axios';
import { GET_ERRORs, SET_CURRENT_USER } from './Types';
import setJWToken from '../SecurityUtils/securityUtils';
import jwt_decode from 'jwt-decode';

export const createNewUser = (newUser, history) => async dispatch =>{
    try {
        await axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type:GET_ERRORs,
            payload:{}
        });
    } catch (err) {
        dispatch({
            type:GET_ERRORs,
            payload: err.response.data
        });
    }
};

export const login = LoginRequest => async dispatch =>{
    try {
      //post => login
        const res = await axios.post("/api/users/login", LoginRequest);
    //extract token from res.data
        const {token} = res.data; 
    //store the token in local storage
        localStorage.setItem("jwtToken", token);
    //set token in the headers
        setJWToken(token);
    //decode within react
        const decoded = jwt_decode(token);
    //dispatch to our securityReducer
        dispatch({
            type:SET_CURRENT_USER,
            payload: decoded
        });

    } catch (err) {
        dispatch({
            type: GET_ERRORs,
            payload: err.response.data
        });
    }
};