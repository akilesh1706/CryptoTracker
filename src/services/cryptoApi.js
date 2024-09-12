/* const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/stats',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl'
  },
  headers: {
    'x-rapidapi-key': 'cf33fd59bfmsh7e07abf3f065dbep183d37jsn0fe4914fd1b1',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
} */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

    // Note: Change v1 to v2 on rapid api
    
    const cryptoApiHeaders = {
    'x-rapidapi-key': 'cf33fd59bfmsh7e07abf3f065dbep183d37jsn0fe4914fd1b1',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
    };

const baseUrl='https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
      getCryptos: builder.query({
        query: () => createRequest('/coins'),
      }),
      getCryptoDetails: builder.query({
        query: (coinId) => createRequest(`/coin/${coinId}`),
      }),
      getCryptoHistory: builder.query({
        query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
      }),
      getExchanges: builder.query({
        query: () => createRequest('/exchanges'),
      }),
      })
    });

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetExchangesQuery,
    useGetCryptoHistoryQuery
}=cryptoApi;