
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import { ListItem, Thumbnail, Text, Body, Button, Icon } from 'native-base';
export default class ListCard extends Component {

    onPress(id) {
        this.props.deleteImage(id)
    }

    render() {
        var item = this.props.item
        var time = item.taken
        var keywords = item.keywords
        return (
            <ListItem style={styles.container} onPress={() => this.props.onPress(item)}>
                <Thumbnail style={styles.image} source={{ uri: item.image }} />
                <Body>
                    <Text style={styles.date} note>
                        taken :  {moment(time).format('LL')}
                    </Text>
                    <Text style={styles.keywords}>
                        {keywords.slice(0, 9).join(", ")}...
                        </Text>
                </Body>
                <Button transparent danger style={styles.button}
                    onPress={() => this.onPress(item.id)}>
                    <Icon name='trash' />
                </Button>
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 0,
        marginBottom: 2
    },
    image: {
        width: 75,
        height: 75,
        marginLeft: 10
    },
    button: {
        position: 'absolute',
        bottom: 1,
        right: 1,
    },
    date: {
        alignSelf: 'flex-start'
    },
    keywords: {
        textAlign: 'left'
    }
});
