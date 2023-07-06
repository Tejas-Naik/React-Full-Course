import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App-v2';
import './index.css';
// import TextExpander from './example-and-challenge/TextExpander';

// Currency Converter Challenge
// import App from "./example-and-challenge/CurrencyConverter";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <TextExpander
      text={"In a distant land, under a sky painted with hues of gold and crimson, a solitary figure stood on the edge of a cliff, gazing into the vast unknown. The wind whispered secrets as it swept through the tall grass, carrying the scent of adventure and untold stories. With a heart full of anticipation, the figure took a leap into the abyss, ready to embrace whatever destiny awaited."}
    />

    <TextExpander
      text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis nisi id nibh mollis, id fringilla diam semper. Aenean vulputate libero nec dolor dictum, nec semper urna laoreet. Quisque eleifend, nulla et semper pulvinar, risus metus consequat massa, eget faucibus lacus leo id metus. Proin sed lobortis erat."}
      collapsedNumWords={20}
      expandButtonText="Show text"
      collapseButtonText="Collapse Text"
      className='box'
      isOpen={true}
      buttonColor="#ff6622"
    />

    <Test /> */}
    <App />
  </React.StrictMode>
);
