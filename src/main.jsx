import React from 'react';
import ReactDOM from 'react-dom/client';
import Deck from './Deck.jsx';
import './styles/tokens.css';
import './styles/slides.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Deck />
  </React.StrictMode>,
);
