import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Gravatar } from 'react-native-gravatar';
import { StyleSheet, Text, View, Plataform, Image } from 'react-native';
import icon from   '../../assets/imgs/icon.png';

class Header extends Component{
    render(){
        const name = this.props.name || 'Anonimo'//caso não esteja setado o usuário serpa colocado como anonimo na barra
        const gravatar = this.props.email ?
            <Gravatar options={{ email: this.props.email, secure: true}} style={styles.avatar}/>
        : null; //caso tenha um avatar cadastrado ele chama, caso não coloca as configurações padrões    
        return(
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon} style={styles.image}/>
                    <Text style={styles.title}>Catalogo</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.user}>{name}</Text>
                    {gravatar}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 0,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    image:{
        height:30,
        width:30,
        resizeMode: 'contain'
    },
    title:{
        color: '#000',
        fontFamily: 'shelter',
        height: 30,
        fontSize: 25
    },
    userContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    user:{
        fontSize: 10,
        color: '#888'
    },
    avatar: {
        width: 30,
        height: 30,
        marginLeft: 10
    }
})

//mapeamento dos estados das propriedades
const mapStateToProps = ({ user }) => {
    return{
        email: user.email,
        name: user.name,
    }
}

export default connect(mapStateToProps,null)(Header);

//export default Header;