import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

// this is not how you want to do it, rather logout from the rest-framework too
export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000/rest-auth/login/', {
            username: username,
            password: password
        })
        .then( res => {
            const token = res.data.key;
            const expiration_date = new Date(new Date().getTime() + 3600 * 1000);
            // store the token and expiration date in the browsers storage instead
            // of state because once the application reloads then the state doesn't 
            //persist
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expiration_date);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch (error => {
            dispatch(authFail(error.message));
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then( res => {
            const token = res.data.key;
            const expiration_date = new Date(new Date().getTime() + 3600 * 1000);
            // store the token and expiration date in the browsers storage instead
            // of state because once the application reloads then the state doesn't 
            //persist
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expiration_date);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch (err => {
            dispatch(authFail(err));
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}