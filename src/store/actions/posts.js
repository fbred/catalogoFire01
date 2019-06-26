import {
     SET_POSTS,
     ADD_COMMENT,
     CREATING_POST,
     POST_CREATED
     } from './actionTypes';
import { setMessage } from './message'
import axios from 'axios';


export const addPost = post => {
   return dispatch => {
       //processo de publicação do post
        dispatch(creatingPost())
        axios({
            url: 'uploadImage',
            baseURL: 'http://us-central1-catalogofire01.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro Inesperado!'
                }))
            })
            .then(resp => { //caso o upload seja feito com sucesso cai neste then
                post.image = resp.data.imageUrl
                axios.post('/post.json', { ...post })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: 'Ocorreu um erro Inesperado!'
                        }))
                    })
                    .then(res => {
                        dispatch(fetchPosts())//dispatch para obter os posts novamente
                        dispatch(postCreated())//post criado
                      /*  dispatch(setMessage({
                            title: 'Sucesso',
                            text: 'Postagem Realizada!'
                        }))*/
                    })
            })
    }
}

export const addComment = payload => {
    /*return {
        type: ADD_COMMENT,
        payload 
    }*/
    return dispatch => {
        axios.get(`/post/${payload.postId}.json`)
            .catch(err =>{
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro Inesperado!'
                }))
            })
            .then(res => { //ao ser be sucedidada a requisicção do comentario no real time database cai no then
                const comments =  res.data.comments || []//contem o post resgatado no firebase através do ID / caso esteja nulo coloca um array vazio
                comments.push(payload.comment) //adiciona o comentário dentro do array
                axios.patch(`/post/${payload.postId}.json`, { comments }) //atualização no firebase nos dados resgatados pelo ID / atualiza somente os comentários
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: 'Ocorreu um erro Inesperado!'
                        }))
                    })
                    .then(res => { //resposta da atualização do item no real time database
                        dispatch(fetchPosts()) //faz a chamada da action para mostrar a lista atualizada
                    })
            })
    }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

//action creator que obtem os dados do firebase (postagems) (obtem os dados através do axios utilizando ajax)
export const fetchPosts = () => {
    return dispatch => {
        axios.get('/post.json')
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro Inesperado!'
                }))
            })
            .then(res => { // a resposta do get aqui é para dar a lista das postagems no banco do firebase
                const rawPosts = res.data;
                const posts = [];
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key], //pega todos os atributos de rawposts
                        id: key
                    })
                }

                dispatch(setPosts(posts.reverse()))//innverte a ordem dos dados que são obtidos colocando o ultimo em primeiro
            }) 
    }
}

export const creatingPost = () => {
    return {
        type:  CREATING_POST
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}