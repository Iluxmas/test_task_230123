import React, { useState, useEffect, useMemo } from 'react';

import './Row.css';

export default function Row({ title, data }) {
  const minimum = useMemo(() => {
    return Math.min(...Object.values(data));
  });

  return (
    <div className='row'>
      <div className='column'>{title}</div>
      <div className={data.first === minimum ? 'column best-value' : 'column'}>{data.first}</div>
      <div className={data.second === minimum ? 'column best-value' : 'column'}>{data.second}</div>
      <div className={data.third === minimum ? 'column best-value' : 'column'}>{data.third}</div>
    </div>
  );
}
