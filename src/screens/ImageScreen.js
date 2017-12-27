import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import moment from 'moment'
import { Container, Header,Text, Content, Footer, Card, CardItem, Title } from 'native-base';

export default class ImageScreen extends Component {

  render() {
    var item = this.props.navigation.state.params.item
    var time = item.taken
    var concepts = item.consepts
    var image = item.image
    console.log('image' , image)
    return (
      <Container >
        <Content>
          <Card>
            <CardItem>
              {/* <Thumbnail source={require('./img/guitar.jpeg')} /> */}
              <Text>{moment(time).format('dddd ,LL')}</Text>
            </CardItem>
            <CardItem  cardBody>
              <Image style={{ width:100,height:100}} source={{uri: image}} />
            </CardItem>
            <CardItem>
              {
                concepts.map((item, index) => {
                  return <Text key={index}>{item} </Text>
                })
              }

            </CardItem>
          </Card>
        </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 200,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 150
  },
  concepts: {
    flexWrap: 'wrap'
  }
});
