/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
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
  const disableFetch = useRef(false);
  const modalRefOne = useRef();
  const modalRefTwo = useRef();

  useEffect(() => {
    if (!disableFetch.current) {
      disableFetch.current = false;
      dispatch(resetPageCount());
      const dateRange = {
        dateFrom,
        dateTo,
      };
      dispatch(fetchNewsList(dateRange));
    }
  }, [dispatch, dateFrom, dateTo]);

  const onRefresh = () => {
    disableFetch.current = true;
    setDateFrom(initialDate);
    setDateTo(initialDate);
    const dateRange = {
      dateFrom: initialDate,
      dateTo: initialDate,
    };
    dispatch(refreshNewsList(dateRange));
  };

  const renderFooter = () => {
    if (!apiStates.loading) {
      return null;
    }
    return <ActivityIndicator size="large" color="#00bfbf" />;
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
          style={[styles.button, styles.buttonFilter, { flex: 1 }]}
          onPress={() => modalRefOne.current.openModal()}>
          <Text style={[styles.textStyle, { fontSize: 14 }]}>From</Text>
          <Text style={[styles.textStyle, { fontSize: 18 }]}>
            {moment(dateFrom).format('YYYY/MM/DD')}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonFilter, { flex: 1 }]}
          onPress={() => modalRefTwo.current.openModal()}>
          <Text style={[styles.textStyle, { fontSize: 14 }]}>TO</Text>
          <Text style={[styles.textStyle, { fontSize: 18 }]}>
            {moment(dateTo).format('YYYY/MM/DD')}
          </Text>
        </Pressable>
      </View>

      <FlatList
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
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
  buttonFilter: {
    backgroundColor: '#757575',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
