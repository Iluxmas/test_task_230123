import React, { useState, useEffect } from 'react';
import ApiService from '../utils/api';
import './App.css';

export default function App() {
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
        requestData(url, setState, isLongPoll);
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
      <h1 className='test'>Hello world</h1>
    </div>
  );
}
