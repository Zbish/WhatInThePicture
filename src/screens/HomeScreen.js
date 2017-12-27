
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput
} from 'react-native';
import ListCard from '../component/ListCard'
import { getImage, saveData } from '../utils'
import { connect } from 'react-redux'
import { AddImage, Search, deleteImage } from '../redux/actions'
import { Container, Header,Fab, Content, List, Button, Text, Form, Item, Input, Label } from 'native-base';

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
        <Item rounded>
            <Input
              onChangeText={(val) => this.onChange(val)}
              value={value}
              placeholder='Search'
              style={styles.textInput}
            />
          </Item>
        </Form>
        <Content>
          <List>
            <FlatList
              data={show}
              renderItem={({ item }) =>
                <ListCard item={item}
                  deleteImage={(id) => this.props.deleteImage(id)}
                  onPress={(item) => this.navigateTo(item)} />}
              keyExtractor={(item, index) => index}
            />
          </List>
        </Content>
        <Button rounded warning
          onPress={() => this.onPress()}>
          <Text>Add Photo</Text>
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
    margin: 10,
    marginBottom: 5,
    backgroundColor: 'rgba(122, 186, 122,0.7)',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.6,
  },
 
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