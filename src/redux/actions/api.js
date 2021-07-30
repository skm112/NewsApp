import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_NEWS_LIST,
  FETCH_REFRESH_REQUEST,
  FETCH_REFRESH_SUCCESS,
  FETCH_REFRESH_FAILURE,
  REFRESH_NEWS_LIST,
  SET_LOCAL_ARTICLES,
  RESET_PAGE_COUNT,
} from '../constants/api';

export const fetchRequest = () => {
  return {
    type: FETCH_REQUEST,
  };
};

export const fetchSuccess = (data) => {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
};

export const fetchFailure = (error) => {
  return {
    type: FETCH_FAILURE,
    payload: error,
  };
};
export const fetchRefreshRequest = () => {
  return {
    type: FETCH_REFRESH_REQUEST,
  };
};

export const fetchRefreshSuccess = (data) => {
  return {
    type: FETCH_REFRESH_SUCCESS,
    payload: data,
  };
};

export const fetchRefreshFailure = (error) => {
  return {
    type: FETCH_REFRESH_FAILURE,
    payload: error,
  };
};

export const fetchNewsList = (dateRange) => {
  return {
    type: FETCH_NEWS_LIST,
    dateRange,
  };
};
export const refreshNewsList = (dateRange) => {
  return {
    type: REFRESH_NEWS_LIST,
    dateRange,
  };
};
export const setArticals = (articles) => {
  return {
    type: SET_LOCAL_ARTICLES,
    articles,
  };
};
export const resetPageCount = () => {
  return {
    type: RESET_PAGE_COUNT,
  };
};
