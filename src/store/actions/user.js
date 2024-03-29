import {USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from  './actionTypes';
import { setMessage } from './message'
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
        dispatch(loadingUser())
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
            email: user.email,
            password:  user.senha,
            returnSecureToken: true
        })
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro Inesperado!'
                }))
            })
            .then(res => {
                if (res.data.localId) {
                    axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name
                 })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: 'Ocorreu um erro Inesperado!'
                        }))
                    })
                    .then(() => {
                        /*dispatch(setMessage({
                            title: 'Sucesso',
                            text: 'Usuário Criado com Sucesso!'
                        }))*/

                        //loga o usuário automáticamente caso a criação tenha tido sucesso
                       /* delete user.password
                        user.id = res.data.localId
                        dispatch(userLogged(user))
                        dispatch(userLoaded())*/

                        dispatch(login(user))//apóes realizar o cadastro no banco realiza a chamada do método Login
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
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Usuário ou Senha errados!'
                }))
            })
            .then(res => {
                if(res.data.localId) {
                    user.token = res.data.idToken
                    axios.get(`/users/${res.data.localId}.json`)
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: 'Ocorreu um erro Inesperado!'
                        }))
                    })
                    .then(res => {
                        delete user.password
                        user.name = res.data.name
                        dispatch(userLogged(user))
                        dispatch(userLoaded())
                    })
                }
            })
    }
}