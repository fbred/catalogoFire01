import { ADD_POST, ADD_COMMENT } from './actionTypes';
import axios from 'axios';


export const addPost = post => {
   return dispatch => {
    axios({
        url: 'uploadImage',
        baseURL: 'http://us-central1-catalogofire01.cloudfunctions.net',
        method: 'post',
        data: {
            image: post.image.base64
        }
    })
        .catch(err => console.log(err))
        .then(resp => {
            post.image = resp.data.imageUrl
            axios.post('/post.json', { ...post })
                .catch(err => console.log(err))
                .then(res => console.log(res.data))
        })
    }
}

export const addComment = payload => {
    return {
        type: ADD_COMMENT,
        payload 
    }
}