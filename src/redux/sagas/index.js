import { all } from 'redux-saga/effects';
import { watchNewsList } from './news';
const watcher = [watchNewsList()];

export default function* rootSaga() {
  console.log('rootSaga');
  yield all(watcher);
}
