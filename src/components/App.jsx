import React, { useState, useEffect, useReducer } from 'react';
import ApiService from '../utils/api';
import ratesReducer from '../utils/ratesReducer';
import { PAIRS } from '../utils/constants';
import Row from './Row.jsx';

import './App.css';

const initialState = {};

export default function App() {
  const [state, dispatch] = useReducer(ratesReducer, initialState);
  const [preparedData, setPreparedData] = useState({});

  useEffect(() => {
    requestData('/first');
    return () => requestData('/first');
  }, []);

  useEffect(() => {
    requestData('/second');
    return () => requestData('/second');
  }, []);

  useEffect(() => {
    requestData('/third');
    return () => requestData('/third');
  }, []);

  useEffect(() => {
    prepareData();
  }, [state]);

  function prepareData() {
    const result = {};
    // get state keys - ['first', 'second', 'third']
    const keys = Object.keys(state);

    // iterate through all currency pairs to combine data like { 'PAIR_NAME': {'first': value, 'second': value, 'third': value}}
    PAIRS.forEach((pair) => {
      const pairRates = {};

      for (let i = 0; i < keys.length; i++) {
        if (pair[1] === 'CUPCAKE') {
          pairRates[keys[i]] = Number(state[keys[i]].rates[pair[0]].toFixed(2));
        } else {
          pairRates[keys[i]] = Number((state[keys[i]].rates[pair[0]] / state[keys[i]].rates[pair[1]]).toFixed(2));
        }
      }

      result[pair.join('/')] = pairRates;
    });

    setPreparedData(result);
  }

  function requestData(url, isLongPoll = true) {
    ApiService.getResource(url, isLongPoll).then((res) => {
      if (res.status == 502) {
        console.log(res.statusText);

        if (isLongPoll) requestData(url);
      } else if (res.status != 200) {
        Promise.reject(`Возникла ошибка при загрузке данных \nStatus: ${res.status}`);

        if (isLongPoll) {
          // New request in 1 second.
          new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            requestData(url);
          });
        }
      } else {
        res.json().then((data) => dispatch({ type: url, payload: data }));
        if (isLongPoll) requestData(url);
      }
    });
  }
  return (
    <div className='page'>
      <h1 className='page__title'>Exchange rates</h1>
      <div className='table-container'>
        <Row title='Pair name/market' data={{ first: 'First', second: 'Second', third: 'Third' }} />

        {PAIRS.map((pair, idx) => {
          const value = pair.join('/');
          return <Row title={value} key={idx} data={preparedData[value]} />;
        })}
      </div>
      <a href='https://github.com/Iluxmas/test_task_230123_' target='_blank' className='page__link'>
        Repository
      </a>
    </div>
  );
}
