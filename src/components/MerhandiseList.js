import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Modal } from 'react-native';
import MockList from './__data__/merchandise_list.json';
import CustomModal from './hoc/connectModal.js';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: 'white',
    fontSize: 22
  },
  list: {
    padding: 10
  },
  listItem: {
    padding: 10,
    borderColor: 'black'
  },
  modalView: {
    flex: 1,
    backgroundColor: '#333a'
  },
  closeModalView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

class MerchandiseData {
  onMerchandisePress = (item) => {
    this.props.openModal({ modalView: this.modal, context: item });
  };
  modal = ({ context }) => (
    <View style={styles.modal}>
      <View style={styles.buttonContainer}>
        <Button
          color="red"
          title="刪除"
          onPress={() => {
            this.removeItem(context);
            this.props.closeModal();
          }}
        />
      </View>
    </View>
  );
}

export default class MerchandiseList extends Component {
  state = {
    data: MockList
  };

  keyExtractor = item => item.id;
  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  render() {
    return (
      <View>
        <FlatList
          style={styles.list}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
