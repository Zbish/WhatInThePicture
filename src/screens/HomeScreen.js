
import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator,Button } from 'react-native';
import { connect } from 'react-redux'
import {deleteImage, search,newIMage } from '../redux/actions'
import { Container } from 'native-base';
import SplashScreen from 'react-native-smart-splash-screen'
import ListCard from '../component/ListCard'
import MyList from '../component/MyList'
import { getImage, renderIf,addImage,checkNet } from '../utils'

class HomeScreen extends Component {
  navigateTo(item) {
    this.props.navigation.navigate("ImageScreen", { item: item });
  }
  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500,
    })
  }
  addImage() {
    checkNet().then((net)=>{
      if(net != -1)
        this.props.newImage()
    })
  }

  delete(images, id, search) {
    this.props.deleteImage(images, id, search)
  }

  searchItem(images, val) {
    this.props.search(images, val)
  }
  render() {
    const images = this.props.images
    const search = this.props.searchResult
    console.log('props' , this.props)
    return (
      <Container >
        {renderIf(this.props.loading.loading,
          <MyList
            images={images}
            search={search}
            addNewImage={() => this.addImage()}
            deleteImage={(id) => this.delete(images, id, search)}
            searhInc={(val) => this.searchItem(images, val)}
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
    loading:state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteImage: (images, id, search) => dispatch(deleteImage(images, id, search)),
    search: (images, val) => dispatch(search(images, val)),
    newImage:()=>dispatch(newIMage()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)