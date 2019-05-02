import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import React from 'react';
import App from './App';
import {render} from 'react-testing-library'

it('renders without crashing', () => {
  render(<App />)
});
