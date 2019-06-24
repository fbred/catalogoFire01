import React, { Component } from 'react';
import {  createBottomTabNavigator, createAppContainer, createSwitchNavigator,createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/profile';
import Login from './screens/Login';
import Register from './screens/Register';

//navegação em pilhas
const authRouter = createStackNavigator({
    Login: { screen: Login, navigationOptions:{ title: 'Login'}},
    Register: { screen: Register, navigationOptions: { title: 'Registro'}}
}, {
    initialRouteName: 'Login'
})

//rota do Login
const loginOrProfileRouter = createSwitchNavigator({
    Profile: Profile,
    Auth: authRouter
},{
    initialRouteName: 'Auth'
})

const MenuRoutes = {
    Feed:{
        name: 'Feed',
        screen: Feed,
        navigationOptions:{
            title: 'Home',
            tabBarIcon: ({ tintcolor }) => 
                    <Icon name='home' size={30} color={ tintcolor }/>
        }
    },
    Add: {
        name: 'AddPhoto',
        screen: AddPhoto,
        navigationOptions:{
            title: 'Add Imagem',
            tabBarIcon: ({ tintcolor }) => 
                    <Icon name='camera' size={30} color={ tintcolor}  />
        }
    },
    Profile: {
        name: 'Profile',
        screen: loginOrProfileRouter,
        navigationOptions:{
            title: 'Perfil',
            tabBarIcon: ({ tintcolor }) => 
                    <Icon name='user' size={30} color={tintcolor}  />
        }
    }
}

const MenuConfig = {
    initialRouteName: 'Feed',
    tabBarOptions:{
        showLabel: true
    }
}

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig);

export default createAppContainer(MenuNavigator);

////////////////////////////////////////////

/*
import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
  import Feed from './screens/Feed';

const MenuRoutes = createStackNavigator({
    Feed:{
        name: 'Feed',
        screen: Feed,
        navigationOptions:{
            title: 'Feed',
            tabBarIcon: ({ tintcolor }) => 
                    <Icon name='home' size={30} color={tintColor} />
        }
    },
    Add: {
        name: 'AddPhoto',
        screen: Feed,
        navigationOptions:{
            title: 'Add Picture',
            tabBarIcon: ({ tintcolor }) => <Icon name='camera' size={30} color={tintColor} /> 
        }
    },
    Profile: {
        name: 'Profile',
        screen: Feed,
        navigationOptions:{
            title: 'Profile',
            tabBarLabel: 'icons',
            tabBarIcon: ({ tintcolor }) => 
                    <Icon name='user' size={30} color={tintColor} />
        }
    }
});



const MenuConfig =  {
    initialRouteName: 'Feed',
    tabBarOptions:{
        showLabel: true,
    }
}

const MenuNavigator = createAppContainer(MenuRoutes,MenuConfig);

export default MenuNavigator;
*/

