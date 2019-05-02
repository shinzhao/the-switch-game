import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import React from 'react';
import GameRulePage from '../Pages/GameRulePage';
import {render} from 'react-testing-library'

const { generateText } = require('../Pages/GameRulePage');
test('rule text',()=>{
    expect(true).toBeTruthy();
})

it('renders without crashing', () => {
    render(<GameRulePage />)
  });