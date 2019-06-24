import React, { Component } from 'react';
import { connect } from 'react-redux';
import { lougout } from '../store/actions/user';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Gravatar } from 'react-native-gravatar';

class Profile extends Component {
    //função de Lougout
    logout = () => {
        this.props.onLogout();//chama a action do redux
       this.props.navigation.navigate('Auth'); 
    }

    render() {
        const options = { email: this.props.email, secure: true } //pega os dados no props atráves do estado global no redux
        return (
            <View style={styles.container}>
                <Gravatar options={options} style={styles.avatar}/>
                <Text style={styles.nickname}>{this.props.name}</Text>
                <Text style={styles.email}>{this.props.email}</Text>
                <TouchableOpacity onPress={this.logout} style={styles.buttom}>
                    <Text style={styles.buttomText}>Sair</Text>
                </TouchableOpacity>
                  
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 75,
        marginTop: 100
    },
    nickname : {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold'
    },
    email: {
        marginTop: 20,
        fontSize: 25
    },
    buttom:{
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    }
})

//mapeamento do estado global da aplicação
const mapStateToProps = ({ user }) => {
    return{
        email: user.email,
        name: user.name,
    }
}

//mapeamento das actions globais da aplicação (action creator responsável por deslogar o usuário)
const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch(lougout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);