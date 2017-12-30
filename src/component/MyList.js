import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Form, Item, Input, Button, Text, Container } from 'native-base';
import ListCard from '../component/ListCard'

export default class MyList extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: '',
    }
  }
  onChangeSearchValue(val) {
    this.setState({ searchValue: val })
    this.props.searchforimage(val)
  }
  render() {
    const images = this.props.images
    const search = this.props.search
    const value = this.state.searchValue
    const show = value ? search : images
    return (
      <Container>
        <Form>
          <Item regular>
            <Input
              autoCapitalize='none'
              onChangeText={(val) => this.onChangeSearchValue(val)}
              value={this.state.searchValue}
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
              navigateToItem={(item) => this.props.navigateTo(item)} />}
          keyExtractor={(item, index) => index} />
        <Button style={styles.button}
          onPress={() => this.props.addNewImage()}>
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
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF5722',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

