/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import moment from 'moment';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const WIDTH = width;
class Article extends Component {
  render() {
    // console.log(this.props);
    const time = moment(this.props.date).fromNow();

    return (
      <TouchableHighlight>
        <Card>
          {this.props.image ? (
            <Image
              source={{
                uri: this.props.image,
              }}
              resizeMode="contain"
              style={{
                alignSelf: 'center',
                height: 100,
                width: WIDTH - 100,
                marginRight: 10,
              }}
            />
          ) : null}

          {this.props.title ? (
            <Text
              style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>
              {this.props.title}
            </Text>
          ) : null}
          {this.props.description ? (
            <Text style={{ marginBottom: 10 }}>{this.props.description}</Text>
          ) : null}
          <Divider style={{ backgroundColor: '#dfe6e9' }} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {this.props.name ? (
              <Text
                style={{
                  margin: 5,
                  fontStyle: 'italic',
                  color: '#b2bec3',
                  fontSize: 10,
                }}>
                {this.props.name.toUpperCase()}
              </Text>
            ) : null}
            {time ? (
              <Text
                style={{
                  margin: 5,
                  fontStyle: 'italic',
                  color: '#b2bec3',
                  fontSize: 10,
                }}>
                {time}
              </Text>
            ) : null}
          </View>
        </Card>
      </TouchableHighlight>
    );
  }
}

Article.defaultProps = {
  image:
    'https://mma.prnewswire.com/media/539438/Research_and_Markets_Logo.jpg?p=facebook',
  title:
    'Worldwide Public Opinion and Election Polling Indu…w Research Centre, Nielsen and Ipsos Among Others',
  description:
    'DUBLIN, July 29, 2021 /PRNewswire/ -- The "Public …port provides strategists, marketers and senior …',
  date: '2021-07-29T14:30:00Z',
  name: 'PRNewswire',
};

export default Article;
