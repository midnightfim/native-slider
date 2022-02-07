import React from 'react';
import './App.scss';

const getPosters = () => {
    const array = new Array(10).fill('');
    return array.map((item, i) => {
            return <div key={i} className='poster-item'>POSTER</div>
        })
}

function App() {
  return (
    <div className="App">
      <div className="slider-container">
        {getPosters()}
      </div>
    </div>
  );
}

export default App;
