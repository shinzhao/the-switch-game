import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import RoomList from './RoomListPage';
//import Game from './Pages/phaser/Game'

Amplify.configure(awsmobile);

/**
 * This component renders the room list component after login
 */
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