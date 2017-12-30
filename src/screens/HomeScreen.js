
import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { AddImage, Search, deleteImage } from '../redux/actions'
import { Container } from 'native-base';
import SplashScreen from 'react-native-smart-splash-screen'
import ListCard from '../component/ListCard'
import MyList from '../component/MyList'
import { getImage, renderIf } from '../utils'



class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
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

  addImage() {
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

  render() {
    const images = this.props.images
    const search = this.props.searchResult
    return (
      <Container >
        {renderIf(this.state.loading,
          <MyList
            images={images}
            search={search}
            addNewImage={() => this.addImage()}
            searchforimage={(val) => this.props.Search(images,val)}
            deleteImage={(id) => this.props.deleteImage(images,id)}
            navigateTo={(item) => this.navigateTo(item)} />
          ,
          <ActivityIndicator size="large" color="#FF5722" style={styles.indicator} />
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
    Search: (images,val) => dispatch(Search(images,val)),
    deleteImage: (images,id) => dispatch(deleteImage(images,id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)