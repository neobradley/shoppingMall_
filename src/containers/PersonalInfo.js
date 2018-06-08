import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native';
import cover from '../components/__data__/colorado_landscape_4k-750x1334.jpg';
import personIcon from '../components/__data__/icons8-user-filled-50.png';
import RNFetchBlob from 'react-native-fetch-blob';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  master_view: {
    flex: 1,
    alignItems: 'center'
  },
  form_input_style: {
    textAlign: 'left',
    fontSize: 20
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderColor: 'white',
    borderWidth: 1
  }
});

export default class PersonalInfo extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static defaultProps = {};

  state = {
    address: '',
    phone: '',
    avatarUri: ''
  };

  fillAddress = (text) => {
    this.setState({
      address: text
    });
  };

  fillPhone = (text) => {
    this.setState({
      phone: text
    });
  };

  goCamera = () => {
    const onTakePicture = (key, uri) => {
      this.setState({
        avatarUri: uri
      });
      RNFetchBlob.fetch(
        'POST',
        `https://www.googleapis.com/upload/storage/v1/b/staging.auctionmall-53ad1.appspot.com/o?uploadType=media&name=yuyu${new Date().getTime()}`,
        {
          Authorization:
            'Bearer ya29.GlzTBUbr5lyXpZV4NSRwV3X9YQsjsmC7rsgOeZrlPJ4Kan4KoR7u5X3PxPBnouJKY99gUuSpwcFX0vTo8pCtVjwMpRxtdvZM7NF2lV52ifjdAKiDpDLwakOzy_YJvw'
        },
        RNFetchBlob.wrap(uri)
      );
    };
    this.props.navigation.navigate('Camera', { key: 'avatar', onTakePicture });
  };

  render() {
    const { avatarUri } = this.state;
    // console.warn(avatarUri);

    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Image resizeMode="stretch" source={cover} />
        </View>
        <View style={styles.master_view}>
          <TouchableOpacity onPress={this.goCamera}>
            <Image style={styles.avatar} source={avatarUri ? { uri: avatarUri } : personIcon} />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            value={this.state.address}
            onChangeText={this.fillAddress}
            placeholder="ADDRESS"
            style={styles.form_input_style}
            returnKeyType="next"
            ref={(ref) => {
              this.addressRef = ref;
            }}
            onSubmitEditing={() => {
              this.phoneRef.focus();
            }}
            blurOnSubmit={true}
          />
          <TextInput
            placeholder="TELEPHONE"
            keyboardType="numeric"
            onChangeText={this.fillPhone}
            style={styles.form_input_style}
            value={this.state.phone}
            ref={(ref) => {
              this.phoneRef = ref;
            }}
          />
        </View>
      </View>
    );
  }
}
