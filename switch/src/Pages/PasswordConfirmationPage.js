import React, { Component } from "react";
import './PasswordConfirmationPage.css'


class PasswordConfirmationPage extends Component {
  handleBackClick(e){
    e.preventDefault();
    this.props.history.push('/my-account')
  }

  handleGameRuleClick(e){
    e.preventDefault();
    this.props.history.push('/game-rule')
  }

  handleProfileClick(e){
    e.preventDefault();
    this.props.history.push('/my-account')
  }
  render() {
    return ( 
      <div className="confirmation-page">
        <button className="back-button" onClick={this.handleBackClick}>Back</button>
        <button className="game-rule-button" onClick={this.handleGameRuleClick}>Game Rule</button>
        <button className="profile-button" onClick={this.handleProfileClick}>My Account</button>    
        <div className="MessageArea">
          <h1>Change Password</h1>
          <p>Your password has been successfully updated!</p>
        </div>
      </div>
    );
  }
}

export default PasswordConfirmationPage;