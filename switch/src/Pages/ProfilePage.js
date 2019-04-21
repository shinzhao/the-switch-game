import React, { Component } from 'react';
import RoomListPage from './RoomListPage';
import './RoomPage.css';

class ProfilePage extends React.Component {
    constructor() {
        super();
        this.state={
            enableRoomListPage: false,
            enableProfilePage: true
        }
        this.handleBackClick = this.handleBackClick.bind(this);
        this.showProfilePage = this.showProfilePage.bind(this);
    }

    handleBackClick() {
        this.setState({ 
            enableRoomListPage: true,
            enableProfilePage: false
         })
    }

    showProfilePage() {
        return(
            <div>
                <p className="test">This is the profile page</p>
                <button onClick={this.handleBackClick}>Back</button>
            </div>
        )
    }


    render() {
        return(
            <div>
                { this.state.enableProfilePage ? this.showProfilePage() : null}
                { this.state.enableRoomListPage ? <RoomListPage /> : null }
            </div>
        );
    }
}

export default ProfilePage;