/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  RefreshControl,
  Pressable,
} from 'react-native';
import Article from '../components/ArticleCard';
import {
  fetchNewsList,
  refreshNewsList,
  resetPageCount,
} from '../redux/actions/api';
import ModalDatePicker from '../components/timeRangeModal';
import moment from 'moment';
const HomeScreen = () => {
  const initialDate = new Date();
  const [dateFrom, setDateFrom] = useState(initialDate);
  const [dateTo, setDateTo] = useState(initialDate);
  const dispatch = useDispatch();
  const apiStates = useSelector((state) => state.api);
  const flatlistRef = useRef();
  const modalRefOne = useRef();
  const modalRefTwo = useRef();

  useEffect(() => {
    console.log('useEffect dispatch(fetchNewsList());');
    flatlistRef.current.s
    dispatch(resetPageCount());
    const dateRange = {
      dateFrom,
      dateTo,
    };
    dispatch(fetchNewsList(dateRange));
  }, [dispatch, dateFrom, dateTo]);

  const onRefresh = () => {
    setDateFrom(initialDate);
    setDateTo(initialDate);
    const dateRange = {
      dateFrom,
      dateTo,
    };
    dispatch(refreshNewsList(dateRange));
    // alert('refreshed');
  };

  const renderFooter = () => {
    if (!apiStates.loading) {
      return null;
    }
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  const handleLoadMore = (data) => {
    const totalArticles =
      apiStates.totalResults <= 100 ? apiStates.totalResults : 100;
    if (apiStates.articles.length < totalArticles && !apiStates.loading) {
      const dateRange = {
        dateFrom,
        dateTo,
      };
      dispatch(fetchNewsList(dateRange));
    }
  };

  return (
    <View style={[styles.container]}>
      <ModalDatePicker
        ref={modalRefOne}
        getDate={(date) => setDateFrom(date)}
      />
      <ModalDatePicker ref={modalRefTwo} getDate={(date) => setDateTo(date)} />
      <View
        style={{
          backgroundColor: 'gray',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable
          style={[styles.button, styles.buttonClose, { flex: 1 }]}
          onPress={() => modalRefOne.current.openModal()}>
          <Text style={[styles.textStyle, { fontSize: 14 }]}>From</Text>
          <Text style={[styles.textStyle, { fontSize: 18 }]}>
            {moment(dateFrom).format('YYYY/MM/DD')}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose, { flex: 1 }]}
          onPress={() => modalRefTwo.current.openModal()}>
          <Text style={[styles.textStyle, { fontSize: 14 }]}>TO</Text>
          <Text style={[styles.textStyle, { fontSize: 18 }]}>
            {moment(dateTo).format('YYYY/MM/DD')}
          </Text>
        </Pressable>
      </View>

      <FlatList
        ref={flatlistRef}
        data={apiStates.articles}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        extraData={apiStates.articles.length}
        renderItem={({ item, index }) => {
          const imgUrl = item.urlToImage && `${item.urlToImage}`;
          const title = item.title && `${item.title}`;
          const description = item.content && `${item.content}`;
          const sourceName = item.source.name && `${item.source.name}`;
          return (
            <Article
              index={index}
              image={imgUrl}
              title={title}
              description={description}
              date={item.publishedAt}
              name={sourceName}
            />
          );
        }}
        enableEmptySections={true}
        onEndReachedThreshold={0}
        onEndReached={handleLoadMore}
        refreshControl={
          <RefreshControl
            refreshing={apiStates.isRefresh}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    // borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
