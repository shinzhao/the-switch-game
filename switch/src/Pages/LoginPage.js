import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import RoomList from './RoomListPage';

Amplify.configure(awsmobile);

class Login extends Component {
  render() {
    return (
      <div>
        <RoomList />
      </div>
    );
  }
}

export default withAuthenticator(Login,true);