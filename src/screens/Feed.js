import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, View } from 'react-native';
import Header from '../components/Header';
import Post from '../components/post';

class Feed extends Component {
    /*state = {
        posts: [{
        id: Math.random(),
        nickname: 'Fábio Lima',
        email: 'usuario01@gmail.com',
        image: require('../../assets/imgs/fence.jpg'),
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
            image: require('../../assets/imgs/bw.jpg'),
            comments: []
        }]
    }*/

    render(){
        return (
            <View style={styles.container}>
                <Header/>
                <FlatList
                    data={this.props.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => 
                        <Post key={item.id} {...item} />} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
}) 

const mapStateToProps = ({ posts }) => {
    return {
        posts: posts.posts
    }
}

export default connect(mapStateToProps,null)(Feed);
//export default Feed;