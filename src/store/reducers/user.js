import {USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from  '../actions/actionTypes';

const initialState = {
    name: null,
    email: null,
    isLoading: false,
    token:  null,
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case USER_LOGGED_IN:
            return{
                ...state, //operador spreed(gera o clone do estado atual)
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token
            }
        case USER_LOGGED_OUT:
            return {
                ...initialState //retorna ao estado inicial todos os estados da aplicação (limpa todos)
            }
        case  LOADING_USER:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return{
                ...state,
                isLoading: false
            }         
        default:
            return state        
    }
}

export default reducer;