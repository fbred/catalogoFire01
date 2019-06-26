import {USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from  './actionTypes';
import axios from 'axios'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyAUNI2oFexRTj0Py54LBm1LMaajbM1QgfY'

//função de action para logar no sistema
export const userLogged = user => {
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

//action para criar um usuário
export const createUser = user => {
    return dispatch => {
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
            email: user.email,
            password:  user.senha,
            returnSecureToken: true
        })
            .catch(err => console.log(err))
            .then(res => {
                if (res.data.localId) {
                    axios.put(`/users/${res.data.localId}.json`, {
                        name: user.nome
                 })
                    .catch(err => console.log(err))
                    .then(res => {
                        console.log('usuarios Criado Com sucesso')
                    })
            }
        })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return{
        type: USER_LOADED
    }
}

//processo de logar
export const login = user => {
    return dispatch => {
        dispatch(loadingUser())
        axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.senha,
            returnSecureToken: true
        })
            .catch(err => console.log(err))
            .then(res => {
                if(res.data.localId) {
                    axios.get(`/users/${res.data.localId}.json`)
                    .catch(err => console.log(err))
                    .then(res => {
                        user.password = null
                        user.name = res.data.name
                        dispatch(userLogged(user))
                        dispatch(userLoaded())
                    })
                }
            })
    }
}