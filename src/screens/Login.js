import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect }  from 'react-redux';
import { login } from '../store/actions/user'; //importando a ação de logar do Redux (action creator)
import Profile from './profile';


class Login extends Component {
    state ={
        name: 'Temporário',
        email: '',
        senha: ''
    }

    login = () =>{
        this.props.onLogin({...this.state});
        this.props.navigation.navigate('Profile');
    }

    render() {
        return(
            <View style={styles.container}>

                <TextInput 
                placeholder='E-mail' style={styles.input}
                autoFocus={true} keyboardType='email-address'
                value={this.state.email}
                onChangeText={email => this.setState({ email })}/>

                <TextInput 
                placeholder='Senha' style={styles.input}
                secureTextEntry={true} value={this.state.senha}
                onChangeText={senha => this.setState({ senha })}/>

                <TouchableOpacity onPress={this.login} style={styles.buttom}>
                    <Text style={styles.buttomText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Register');
                }} style={styles.buttom}>
                    <Text style={styles.buttomText}>Criar Nova Conta...</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttom:{
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF',

    },
    input:{
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333'
    }
})

//metodo responsável por mapear e repassar as actions
const mapDispatchToProps = dispatch => {
    //objeto com todos os métodos e propriedades do login
    return {
        onLogin: user => dispatch (login(user)) //responsável por disparar as actions para os reducers
    }
}

//exportando e fazendo a conexão do componente do modulo atráves do redux
export default connect(null, mapDispatchToProps)(Login);