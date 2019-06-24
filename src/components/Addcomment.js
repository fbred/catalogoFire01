import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../store/actions/posts';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback as TWF, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class AddComent extends Component {
    state = {
        comment: '',
        editeMode: false
    }

    handleAddComment = () => {
       // Alert.alert('Adicionado', this.state.comment)
       //objeto que vai ser passado pelo payload
        this.props.onAddComment({
            postId: this.props.postId,
            comment: {
                nickname: this.props.name, //pega o nome do usuario logado e adiciona a postagem
                comment: this.state.comment
            }
        })

        this.setState({ comment: '', editeMode:false})//após adicionar o comentário, deixa o memso vazio / e volta o editMode para false
    }

    render(){
        let commentArea = null
        
        //caso o modo de edição esteja como verdadeiro
        if (this.state.editeMode){
            commentArea = (
                <View style={style.container}>
                    <TextInput 
                    placeholder='Pode Comentar...'
                    style={style.input} autoFocus={true}
                    value={this.state.comment}
                    onChangeText={comment => this.setState({ comment })}
                    onSubmitEditing={this.handleAddComment} />
                    <TWF onPress={ () => this.setState({ editeMode: false})}>
                        <Icon name='times' size={25} color='#555'/>
                    </TWF>
                </View>
            )
        }else {

            //tocando a área e tornado-a editável
            commentArea =(
                <TWF onPress={ () => this.setState({ editeMode: true })}>
                    <View style={style.container}>
                        <Icon name='comment-o' size={25} color='#555'/>
                        <Text style={style.caption}>Adicione um comentário...</Text>
                    </View>
                </TWF>
            )
         }
         return (
            <View style={{flex: 1}}>
                {commentArea}
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    caption:{
        marginLeft: 10,
        fontSize: 12,
        color: '#CCC'
    },
    input:{
        width: '90%'
    }
})

//mapeando as propriedades com redux
const mapStateToProps = ({ user }) =>{
    return {
        name: user.name
    }
}

//
const mapDispatchToProps = dispatch => {
    return {
        onAddComment: payload => dispatch(addComment(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComent);
//export default AddComent