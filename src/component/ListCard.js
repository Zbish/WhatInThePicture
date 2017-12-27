
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import { ListItem, Thumbnail, Text, Body, Button, Icon} from 'native-base';

export default class ListCard extends Component {

    onPress(id) {
        this.props.deleteImage(id)
    }

    render() {
        var item = this.props.item
        var time = item.taken
        var keywords = item.keywords
        return (
            <ListItem style={{marginLeft: 0}} onPress={() => this.props.onPress(item)}>
                <Thumbnail style={styles.image} source={{ uri: item.image }} />
                <Body>
                    <Text note>
                        taken :  {moment(time).format('LL')}
                    </Text>
                    <Text style={styles.keywords}>{keywords.join(",  ")}</Text>
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
    image: {
        width: 100,
        height: 100,
        marginLeft: 5
    },
    button:{
        justifyContent: 'flex-end'
    }
});
