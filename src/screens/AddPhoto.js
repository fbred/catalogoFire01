import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../store/actions/posts';//action do redux
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Dimensions, Platform, ScrollView, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const noUser = 'Você precisa estar Logado para adicionar Imagens';

class AddPhoto extends Component {
    state = {
        image: null,
        comment:''
    }

    //componente do ciclo de vida (é cahamado depois que as propriedades forão atualizadas)
    componentDidUpdate = prevProps => {
        if(prevProps.loading && !this.props.loading){
            this.setState({
                image: null, //limpa os campos assim que a postagem é feita
                comment: ''
            })
            this.props.navigation.navigate('Feed')//assim que termina a postagem ele navega para o feed
        }
    }

    pickImage = () => {
        if(!this.props.name){
            Alert.alert('Falha!', noUser)
            return;
        }

        ImagePicker.showImagePicker({
            title: 'Escolha a Imagem',
            maxHeight: 600,
            maxWidth: 800
        }, res => {
            if(!res.didCance){
                this.setState({image: { uri: res.uri, base64: res.data} })
            }
        })
    }

    save = async () => {
        if(!this.props.name){
            Alert.alert('Falha',noUser);
            return;
        }
       // Alert.alert('Imagem Adicionada', this.state.comment)
        //dispara a função do redux no memento de adicionar um post
       this.props.onAddPost({ //cria um post dinamicamente
            id: Math.random(), 
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [{
                nickname: this.props.name,
                comment: this.state.comment
            }]
       })
       /*this.setState({ image: null, comment: ''})//limpa o estado apos salvar a postagem
       this.props.navigation.navigate('Feed')//navega para a tela de postagem após salvar*/
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilho Seu Produto</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image}/>
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
                        <Text style={styles.buttonText}>Escolha a Foto</Text>
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Algum Comentário para a Imagem?' 
                        style={styles.input}
                        editable={this.props.name != null}
                        value={this.state.comment}
                        onChangeText={comment => this.setState( { comment })}/>
                      <TouchableOpacity onPress={this.save}
                        disabled={this.props.loading}
                        style={[styles.buttom, this.props.loading ? styles.buttonDisabled: null]}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 2,
        backgroundColor: '#EEE',
        marginTop: 10
    },
    image: {
        //width: Dimensions.get('window').width,
        width: '100%',
        height: Dimensions.get('window').width / 2,
        resizeMode: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%'
    },
    buttonDisabled: {
        backgroundColor: '#AAA'
    }
})

//mapeando o stado da aplicação e retornando
const mapStateToProps = ({ user, posts }) => {
    return{
        email: user.email,
        name: user.name,
        loading: posts.isUploading
    }
}

//mapeando as actions para o componente
const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))//passando os parametros para a action de adicionar post
    }
}

//export default AddPhoto;
export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto);