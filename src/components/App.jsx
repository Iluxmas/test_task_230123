import React, { useState, useEffect, useReducer } from 'react';
import ApiService from '../utils/api';
import './App.css';
import Row from './Row';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [first, setFirst] = useState(0.0);
  const [second, setSecond] = useState(0.0);
  const [third, setThird] = useState(0.0);

  useEffect(() => {
    requestData('/first', setFirst);
    return () => requestData('/first', setFirst);
  }, []);

  useEffect(() => {
    console.log(first);
  }, [first]);

  function requestData(url, setState, isLongPoll = true) {
    ApiService.getResource(url, isLongPoll).then((res) => {
      if (res.status == 502) {
        console.log(res.statusText);

        if (isLongPoll) requestData(url, setState, isLongPoll);
      } else if (res.status != 200) {
        Promise.reject(`Возникла ошибка при загрузке данных \nStatus: ${res.status}`);

        if (isLongPoll) {
          // New request in 1 second.
          new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            requestData(url, setState, isLongPoll);
          });
        }
      } else {
        res.json().then((data) => setState(data));
        if (isLongPoll) requestData(url, setState, isLongPoll);
      }
    });
  }
  return (
    <div className='page'>
      <h1 className='page__title'>Exchange rates</h1>
      <div className='table-container'>
        <Row title='Pair name/market' data={{ first: 'First', second: 'Second', third: 'Third' }} />
        <Row title='RUB/CUPCAKE' data={{ first: 2, second: 2, third: 3 }} />
        <Row title='USD/CUPCAKE' data={{ first: 2, second: 2, third: 3 }} />
        <Row title='EUR/CUPCAKE' data={{ first: 2, second: 2, third: 3 }} />
        <Row title='RUB/USD' data={{ first: 2, second: 2, third: 3 }} />
        <Row title='RUB/EUR' data={{ first: 2, second: 2, third: 3 }} />
        <Row title='RUB/USD' data={{ first: 2, second: 2, third: 3 }} />
      </div>
      <a href='https://github.com/Iluxmas/test_task_230123' target='_blank' className='page__link'>
        Repository
      </a>
    </div>
  );
}
