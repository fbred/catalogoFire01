import {USER_LOGGED_IN, USER_LOGGED_OUT } from  './actionTypes';
import axios from 'axios'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyAUNI2oFexRTj0Py54LBm1LMaajbM1QgfY'

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