
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';

export default class ListItem extends Component {

onPress(id){
  this.props.deleteImage(id)
 }

  render() {
      var item = this.props.item
      var time = item.taken
      var concepts = item.consepts
    return (
        <TouchableHighlight style={styles.wrapper} underlayColor='grey' onPress={() => this.props.onPress(item)}>
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
       <Button title={'delete'} onPress={()=>this.onPress(item.id)} ></Button>
            </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
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
