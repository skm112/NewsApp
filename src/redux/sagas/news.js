import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getNewsList } from '../../api/newsAPI';
import {
  fetchSuccess,
  fetchFailure,
  fetchRequest,
  fetchRefreshRequest,
  fetchRefreshFailure,
  fetchRefreshSuccess,
  setArticals,
} from '../actions/api';
import { FETCH_NEWS_LIST, REFRESH_NEWS_LIST } from '../constants/api';
import { readDataByKey } from '../../utils';
const getStateInstance = (state) => state.api;
function* handleGetNewsList(action) {
  const storedArticles = yield readDataByKey('articles', 'object');
  const stateData = yield select(getStateInstance);
  try {
    const params = {
      page: stateData.currentPage,
      pageSize: stateData.pageSize,
      ...action.dateRange,
    };
    yield put(fetchRequest());
    const res = yield call(getNewsList, params);
    const { data } = res;
    console.log('response===>', data);
    yield put(fetchSuccess(data));
  } catch (error) {
    console.log('+++++stateData.articles++++ ', stateData.articles);
    if (stateData.articles.length === 0) {
      console.log('+++++stateData.articles++++2 ', stateData.articles);
      yield put(setArticals(storedArticles));
    }
    console.log(error.message);
    yield put(fetchFailure(error));
  }
}

function* handleRefresh(action) {
  try {
    const stateData = yield select(getStateInstance);
    const params = {
      page: 0,
      pageSize: stateData.pageSize,
      ...action.dateRange,
    };
    yield put(fetchRefreshRequest());
    const res = yield call(getNewsList, params);
    const { data } = res;
    yield put(fetchRefreshSuccess(data));
  } catch (error) {
    console.log(error.message);
    yield put(fetchRefreshFailure(error));
  }
}

export function* watchNewsList() {
  yield takeLatest(FETCH_NEWS_LIST, handleGetNewsList);
  yield takeLatest(REFRESH_NEWS_LIST, handleRefresh);
}
