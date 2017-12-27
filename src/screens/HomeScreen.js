
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import ListCard from '../component/ListCard'
import { getImage, saveData } from '../utils'
import { connect } from 'react-redux'
import { AddImage, Search, deleteImage } from '../redux/actions'
import { Container, Header,Fab, Content, List,ListItem, Button, Text, Form, Item, Input, Label } from 'native-base';

class HomeScreen extends Component {

  onPress() {
    getImage().then((newImage) => {
      this.props.AddImage(newImage)
    })
  }
  navigateTo(item) {
    this.props.navigation.navigate("ImageScreen", { item: item });
  }
  onChange(val) {
    this.props.Search(val)
  }
  render() {
    const images = this.props.images
    const search = this.props.searchResult
    const value = this.props.currentValue
    const show = value ? search : images
    return (
      <Container>
        <Form>
        <Item regular>
            <Input
              onChangeText={(val) => this.onChange(val)}
              value={value}
              placeholder='Search'
              style={styles.textInput}
            />
          </Item>
        </Form>
            <FlatList
              data={show}
              renderItem={({ item }) =>
                <ListCard item={item}
                  deleteImage={(id) => this.props.deleteImage(id)}
                  onPress={(item) => this.navigateTo(item)} />}
              keyExtractor={(item, index) => index}
            />
        <Button style={styles.button}
          onPress={() => this.onPress()}>
          <Text>ADD</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    color: '#000000',
    alignSelf: 'stretch',
    padding: 5,
    margin: 5,
    marginBottom: 5,
    backgroundColor: '#D1C4E9',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.6,
  },
 button:{
  width: 60,  
  height: 60,   
  borderRadius: 30,            
  backgroundColor: '#FF5722',                                    
  position: 'absolute',                                          
  bottom: 10,                                                    
  right: 10, 
 }
});

function mapStateToProps(state) {
  return {
    images: state.images.images,
    currentValue: state.images.currentValue,
    searchResult: state.images.searchResult,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    AddImage: (image) => dispatch(AddImage(image)),
    Search: (val) => dispatch(Search(val)),
    deleteImage: (id) => dispatch(deleteImage(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)