/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readDataByKey } from '../utils';
import { setArticals } from '../redux/actions/api';
class Init extends Component {
  //   static propTypes = {
  //     prop: PropTypes,
  //   };

  componentDidMount() {
    console.log(this.props.navigation);
    this.getArticlesFromStorage();
    // setTimeout(() => {
    //   this.props.navigation.navigate('Home');
    // }, 3000);
  }

  async getArticlesFromStorage() {
    console.log('props', this.props);
    // const articles = await readDataByKey('articles', 'object');
    // this.props.setArticals(articles);
    this.props.navigation.navigate('Home');
    console.log('articles', this.props.articles);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#65A7C5',
        }}>
        <Text> Welcome to Latest News </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setArticals: (articles) => dispatch(setArticals(articles)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Init);
