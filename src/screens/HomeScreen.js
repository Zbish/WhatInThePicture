
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  TextInput
} from 'react-native';
import ListItem from '../component/ListItem'
import { getImage,saveData } from '../utils'
import { connect } from 'react-redux'
import { AddImage, Search,deleteImage } from '../redux/actions'


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
      <View style={styles.container}>
        <TextInput
          placeholder='Search'
          style={styles.textInput}
          onChangeText={(val) => this.onChange(val)}
          value={value}
        />
        <FlatList
          data={show}
          renderItem={({ item }) =>
            <ListItem item={item}
              deleteImage={(id)=>this.props.deleteImage(id)}
              onPress={(item) => this.navigateTo(item)} />}
          keyExtractor={(item, index) => index}
        />
        <Button title={'Add Photo 2'} onPress={() => this.onPress()}></Button>
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
    margin: 10,
    marginBottom: 10,
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