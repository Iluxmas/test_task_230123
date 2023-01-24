import React, { useState, useEffect } from 'react';

import './Row.css';

export default function Row({ title, data }) {
  return (
    <div className='row'>
      <div className='column'>{title}</div>
      <div className='column'>{data.first}</div>
      <div className='column'>{data.second}</div>
      <div className='column'>{data.third}</div>
    </div>
  );
}
