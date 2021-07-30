import axios from 'axios';
import moment from 'moment';
//d3875b07240a4d3b9989b02649078622
//93cf77ce51a74d0e95a02c1ce6618c24
//b4e4d732ca7e4c77b99f3759118a37ad
//41e5b3c320d5491e94fe31ad4707d157
const formattedDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};

export const getNewsList = (params) => {

  const nextPage = typeof params.page === 'number' ? params.page + 1 : 1;
  const paramOptions = {
    q: 'india',
    pageSize: params.pageSize,
    page: nextPage,
    sortBy: 'publishedAt',
    language: 'en',
    from: formattedDate(params.dateFrom),
    to: formattedDate(params.dateTo),
  };
  return axios.request({
    method: 'GET',
    url: 'https://newsapi.org/v2/everything',
    params: paramOptions,
    headers: {
      'X-Api-Key': '41e5b3c320d5491e94fe31ad4707d157',
    },
  });
};
