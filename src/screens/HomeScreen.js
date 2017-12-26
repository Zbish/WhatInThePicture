
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TextInput
} from 'react-native';
import ListItem from '../component/ListItem'
import {getImage}from '../utils'
import { connect } from 'react-redux'
import {AddImage,Search} from '../redux/actions'

class HomeScreen extends Component {

onPress(){
  var images
  getImage().then((newImage)=>{ 
    this.props.AddImage(newImage)
    })
    
 }
navigateTo(item){
this.props.navigation.navigate("ImageScreen",{item:item});
}
onChange(val)
{
    this.props.Search(val)
}
  render() {
  
      var show
      var images = this.props.images
      var search = this.props.searchResult
        if(this.props.currentValue){
            show = search
        }
        else{
            show = images
        }
    return (
      <View style={styles.container}>
          <TextInput 
              placeholderTextColor="black"
              placeholder='Search'
              style={styles.textInput}
              onChangeText={(val) => this.onChange(val)}
              value={this.props.currentValue}
            />
            <FlatList
                          data={show}
                          renderItem={({ item }) => <ListItem item={item} 
                                                              onPress={(item)=>this.navigateTo(item)}/>}
                          keyExtractor={(item, index) => index}
                        />
        <Button title={'Add Photo 2'} onPress={()=> this.onPress()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    color: '#000000',
    alignSelf: 'stretch',
    padding: 5,
    margin:10,
    marginBottom: 10,
    backgroundColor: 'rgba(122, 186, 122,0.7)',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.6,
  },
});

function mapStateToProps (state) {
  return {
    images: state.images.images,
    currentValue: state.images.currentValue,
    searchResult: state.images.searchResult
  }
}

function mapDispatchToProps (dispatch) {
  return {
    AddImage: (image) => dispatch(AddImage(image)),
    Search:(val) => dispatch(Search(val))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)