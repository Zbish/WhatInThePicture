import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import moment from 'moment'

export default class ImageScreen extends Component {

  render() {
      var item = this.props.navigation.state.params.item
      var time = item.taken
      var concepts = item.consepts
    return (
        <View style={styles.container}>
            <View>
          <Text>{moment(time).format('dddd ,LL')}</Text>
          <Image style={styles.image} source={{uri:item.image}}></Image>
          </View>
       <View style={styles.concepts}>
       {
          concepts.map((item, index) => {
                            return <Text key={index}>{item} </Text>
          })
        }
       </View>
            </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height:200,
        backgroundColor: '#F5FCFF',
      },
      container:{
        flexDirection:'row',
      },
      image:{
        width:150,
        height:150
      },
      concepts:{
        flexWrap: 'wrap'
      }
});
