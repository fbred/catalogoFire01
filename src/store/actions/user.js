import {USER_LOGGED_IN, USER_LOGGED_OUT } from  './actionTypes';

//função de action para logar no sistema
export const login = user => {
    return{
        type: USER_LOGGED_IN,
        payload: user
    }
}

//função de action para deslogar do sistema
export const lougout = ()=>  {
    return{
        type: USER_LOGGED_OUT
    }
}