import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';

import Autor from './Autor';
import Comments from './Coments';
import AddComment from './Addcomment';

class Post extends Component{
    render(){
        const addComment = this.props.name ? 
            <AddComment postId={this.props.id} /> : null //o comentário só pode ser adicionado se houver um usuário Logado

        return(
            <View style={styles.container}>
                <Image source={this.props.image} style={styles.image}/>
                <Autor email={this.props.email} 
                    nickname={this.props.nickname}/>
                <Comments comments={this.props.comments}/>
               {addComment}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    image:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'contain'
    }
})

const mapStateToProps = ({ user }) => {
    return {
        name: user.name
    }
}

export default connect(mapStateToProps)(Post);

//export default Post