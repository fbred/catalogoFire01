import { SET_POSTS, ADD_COMMENT } from './actionTypes';
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

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

//action creator que obtem os dados do firebase (obtem os dados através do axios utilizando ajax)
export const fetchPosts = () => {
    return dispatch => {
        axios.get('/post.json')
            .catch(err => console.log(err))
            .then(res => { // a resposta do get aqui é para dar a lista das postagems no banco do firebase
                const rawPosts = res.data;
                const posts = [];
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key], //pega todos os atributos de rawposts
                        id: key
                    })
                }

                dispatch(setPosts(posts))
            }) 
    }
}