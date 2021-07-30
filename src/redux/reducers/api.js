import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_REFRESH_REQUEST,
  FETCH_REFRESH_SUCCESS,
  FETCH_REFRESH_FAILURE,
  SET_LOCAL_ARTICLES,
  RESET_PAGE_COUNT,
} from '../constants/api';
const initialState = {
  loading: false,
  isRefresh: false,
  articles: [],
  totalResults: 0,
  currentPage: 0,
  pageSize: 5,
  error: '',
};
import { storeDataByKey } from '../../utils';
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      const { totalResults, articles } = action.payload;
      if (state.currentPage === 0) {
        storeDataByKey('articles', articles);
      }
      return {
        ...state,
        loading: false,
        articles:
          state.currentPage === 0 ? articles : [...state.articles, ...articles],
        totalResults: totalResults,
        currentPage: state.currentPage + 1,
        error: '',
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_REFRESH_REQUEST:
      return {
        ...state,
        isRefresh: true,
      };
    case FETCH_REFRESH_SUCCESS:
      storeDataByKey('articles', action.payload.articles);
      return {
        ...initialState,
        isRefresh: false,
        articles: action.payload.articles,
        totalResults: action.payload.totalResults,
        currentPage: 1,
        error: '',
      };
    case SET_LOCAL_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    case FETCH_REFRESH_FAILURE:
      return {
        ...state,
        isRefresh: false,
        error: action.payload,
      };
    case RESET_PAGE_COUNT:
      return {
        ...state,
        currentPage: 0,
      };
    default:
      return state;
  }
};

export default reducer;
