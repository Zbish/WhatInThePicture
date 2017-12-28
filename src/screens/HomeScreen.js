
import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import ListCard from '../component/ListCard'
import { getImage, saveData } from '../utils'
import { connect } from 'react-redux'
import { AddImage, Search, deleteImage, loadingImage } from '../redux/actions'
import { Container, Content, Button, Text, Form, Item, Input } from 'native-base';

class HomeScreen extends Component {

  onPress() {
    this.props.loadingImage(false)
    getImage().then((newImage) => {
      if (newImage) {
        this.props.AddImage(newImage)
      }
      this.props.loadingImage(true)
    })
  }
  navigateTo(item) {
    this.props.navigation.navigate("ImageScreen", { item: item });
  }
  onChange(val) {
    var lowerVal = val.toLowerCase()
    this.props.Search(lowerVal)
  }
  renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return <View style={styles.indicator}>
                    <ActivityIndicator size="large" color="#FF5722" />
            </View>;
    }
  }
  render() {
    const images = this.props.images
    const search = this.props.searchResult
    const value = this.props.currentValue
    const show = value ? search : images
    return (
      this.renderIf(this.props.loading, <Container>
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
          keyExtractor={(item, index) => index} />
        <Button style={styles.button}
          onPress={() => this.onPress()}>
          <Text>ADD</Text>
        </Button>
      </Container>)
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
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF5722',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center'
  }
});

function mapStateToProps(state) {
  return {
    images: state.images.images,
    currentValue: state.images.currentValue,
    searchResult: state.images.searchResult,
    loading: state.images.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    AddImage: (image) => dispatch(AddImage(image)),
    Search: (val) => dispatch(Search(val)),
    deleteImage: (id) => dispatch(deleteImage(id)),
    loadingImage: (val) => dispatch(loadingImage(val))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)