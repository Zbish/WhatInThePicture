
import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ListCard from '../component/ListCard'
import { Container} from 'native-base';

export default class MyList extends Component {

  render() {
    return (
        <Container>
          <FlatList
            data={this.props.show}
            renderItem={({ item }) =>
              <ListCard item={item}
                deleteImage={(id) => this.props.deleteImage(id)}
                onPress={(item) => this.navigateTo(item)} />}
            keyExtractor={(item, index) => index} />
        </Container>
    );
  }
}
