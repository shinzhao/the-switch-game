import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import React from 'react';
import RoomListPage from '../Pages/RoomListPage';
import {render} from 'react-testing-library'

const { generateText } = require('../Pages/RoomListPage');
test('rule text',()=>{
    expect(true).toBeTruthy();
})

it('renders without crashing', () => {
    render(<RoomListPage />)
  });
  