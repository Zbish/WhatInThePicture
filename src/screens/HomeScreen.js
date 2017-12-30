
import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import ListCard from '../component/ListCard'
import { getImage, incrementalSearch } from '../utils'
import { connect } from 'react-redux'
import { AddImage, Search, deleteImage, loadingImage } from '../redux/actions'
import { Container, Content, Button, Text, Form, Item, Input } from 'native-base';
import SplashScreen from 'react-native-smart-splash-screen'

class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: '',
      loading: true
    }
  }
  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500,
    })
  }

  onPress() {
    this.setState({ loading: false })
    getImage().then((newImage) => {
      if (newImage) {
        this.props.AddImage(newImage)
      }
      this.setState({ loading: true })
    })
  }
  navigateTo(item) {
    this.props.navigation.navigate("ImageScreen", { item: item });
  }

  onChangeSearchValue(val) {
    val
    this.setState({ searchValue: val })
    this.props.Search(val)
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
    const value = this.state.searchValue
    const show = value ? search : images
    return (
      this.renderIf(this.state.loading,
        <Container>
          <Form>
            <Item regular>
              <Input
                autoCapitalize='none'
                onChangeText={(val) => this.onChangeSearchValue(val)}
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
                navigateToItem={(item) => this.navigateTo(item)} />}
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
    searchResult: state.images.searchResult,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    AddImage: (image) => dispatch(AddImage(image)),
    Search: (val) => dispatch(Search(val)),
    deleteImage: (id) => dispatch(deleteImage(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)