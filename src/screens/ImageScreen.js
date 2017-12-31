import React, { Component } from 'react';
import { StyleSheet, Image, } from 'react-native';
import { Container, Text, Content, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconHeader from 'react-native-vector-icons/MaterialCommunityIcons';
import { BackHandler } from 'react-native';
import moment from 'moment'
import {renderIf} from '../utils'


export default class ImageScreen extends Component {
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <IconHeader name={'arrow-left'} size={25} color="white"
      style={{ padding: 10 }}
      onPress={() => navigation.goBack()} />,
  })
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack();
    return true;
  }
  render() {
    var item = this.props.navigation.state.params.item
    var time = item.taken
    var keywords = item.keywords
    var image = item.image
    var vertical = item.vertical
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
              {renderIf(vertical,<Image style={styles.image} source={{ uri: image }} />,
                <Image style={styles.horizontal} source={{ uri: image }} />
              )}
              
            </CardItem>
            <CardItem header style={styles.textContainer}>
              <Text style={styles.keywords}>keywords</Text>
              <Text style={{ textAlign: 'center' }}>{keywords.join(",   ")}</Text>
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
  horizontal:{
    width: 320,
    height: 240
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
