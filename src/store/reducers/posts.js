import { SET_POSTS, ADD_COMMENT } from '../actions/actionTypes';

const initialState = {
    posts: [/*{
        id: Math.random(),
        nickname: 'Fábio Lima',
        email: 'usuario01@gmail.com',
        image: require('../../../assets/imgs/fence.jpg'),
        comments: [{
            nickname: 'Usuario 02',
            comment: 'comentário 01'
        },{
            nickname: 'Usuario 03',
            comment: 'comentário 03'
            }]
        },{
            id: Math.random(),
            nickname: 'usuario 05',
            email: 'usuario05@gmail.com',
            image: require('../../../assets/imgs/bw.jpg'),
            comments: []
        }*/]
}

const reducer = (state = initialState, action) => {

        switch (action.type) {
           /* case ADD_POST:
                return{
                    ...state,
                    //concatenando (adicionando) um novo post aos posts existentes
                    posts: state.posts.concat({
                        ...action.payload
                    })
                }*/
                case SET_POSTS: {
                   return {
                    ...state,
                    posts: action.payload
                   } 
                } 
            case ADD_COMMENT:{
                return {
                    ...state,
                    posts: state.posts.map(post => {
                        if(post.id === action.payload.postId){
                            //se já existir um array de comentário, apenas adiciona um novo
                            if(post.comments){
                                post.comments = post.comments.concat(
                                    action.payload.comment
                                )
                            }else {
                                post.comments = [action.payload.comment] //caso não tenha adicionase em um array o comentário e adiciona no post
                            }
                        }
                        return post;
                    })//a função map transforma os dados de um array
                }
            } 
            default:
                return state
        }
}

export default reducer;