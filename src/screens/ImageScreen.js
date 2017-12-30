import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';
import moment from 'moment'
import { Container, Text, Content, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconHeader from 'react-native-vector-icons/MaterialCommunityIcons';
import { BackHandler } from 'react-native';

export default class ImageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <IconHeader name={'arrow-left'} size={25} color="white"
      style={{ padding: 10 }}
      onPress={() => navigation.goBack()} />,
  })
  constructor() {
    super()
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  render() {
    var item = this.props.navigation.state.params.item
    var time = item.taken
    var keywords = item.keywords
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
  textContainer: {
    flexDirection: 'column',
  },
  keywords: {
    color: '#FF5722',
    fontSize: 20,
    fontWeight: 'bold',
  },
  goBack: {

  }
});
