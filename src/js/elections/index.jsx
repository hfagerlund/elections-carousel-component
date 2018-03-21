import React from 'react';
import { render } from 'react-dom';

import App from './components/App.jsx';

render(
  <App url="http://127.0.0.1:8080/src/assets/fixtures/results.js?callback=" />,
  document.getElementById('app')
);
