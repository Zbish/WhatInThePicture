import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';
import moment from 'moment'
import { Container, Text, Content, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ImageScreen extends Component {

  render() {
    var item = this.props.navigation.state.params.item
    var time = item.taken
    var concepts = item.consepts
    var image = item.image
    return (
      <Container >
        <Content>
          <Card>
            <CardItem header>
              <Icon name="date-range" size={30} color="#900" />
              <Text> Date Taken :</Text>
              <Text note>{moment(time).format('dddd ,LL')}</Text>
            </CardItem>
            <CardItem style={styles.imageContainer} cardBody>
              <Image style={styles.image} source={{ uri: image }} />
            </CardItem>
            <CardItem header style={styles.textContainer}>
              <Text style={styles.keywords}>keywords</Text>
              <Text>{concepts.join(",   ")}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 300
  },
  textContainer: {
    flexDirection: 'column',
  },
  keywords: {
    color: '#FF5722',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
