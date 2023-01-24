import React from 'react';

import './Row.css';

export default function Row({ title, data }) {
  const minimum = data ? Math.min(...Object.values(data)) : null;

  return (
    <div className='row'>
      <div className='column'>{title}</div>
      <div className={data?.first === minimum ? 'column best-value' : 'column'}>{data?.first || 'n/a'}</div>
      <div className={data?.second === minimum ? 'column best-value' : 'column'}>{data?.second || 'n/a'}</div>
      <div className={data?.third === minimum ? 'column best-value' : 'column'}>{data?.third || 'n/a'}</div>
    </div>
  );
}
