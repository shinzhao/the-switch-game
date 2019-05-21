import React, { Component } from "react";
import { withAuthenticator } from 'aws-amplify-react';
import { withRouter } from 'react-router-dom';
import './PasswordConfirmationPage.css';

/**
 * This component is the page for confirming change of user password in the profile page.
 */
class PasswordConfirmationPage extends Component {
  constructor(){
    super();
    this.handleBackClick=this.handleBackClick.bind(this);
    this.handleGameRuleClick=this.handleGameRuleClick.bind(this);
    this.handleProfileClick=this.handleProfileClick.bind(this);
  }

  /**
   * Handles the "back" button click, will redirect to profile page.
   * @param {event} e 
   */
  handleBackClick(e){
    e.preventDefault();
    this.props.history.push('/my-account');
  }

  /**
   * Handles the "game rule" button click, will redirect to game rule page.
   * @param {event} e 
   */
  handleGameRuleClick(e){
    e.preventDefault();
    this.props.history.push('game-rule');
  }

  /**
   * Handles the "my account" button click, will redirect back to profile page. 
   * @param {event} e 
   */
  handleProfileClick(e){
    e.preventDefault();
    this.props.history.push('/my-account');
  }

  render() {
    return ( 
      <div className="confirmation-page">   
        <div className="Whole-Page">
          <div className="button-section">
            <button className="Back-button" onClick={this.handleBackClick}>Back</button>
            <button className="Game-rule-button" onClick={this.handleGameRuleClick}>Game Rule</button>
            <button className="Profile-button" onClick={this.handleProfileClick}>My Account</button>
          </div> 
          <div className="MessageArea">
            <h1>Change Password</h1>
            <p>Your password has been successfully updated!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthenticator(PasswordConfirmationPage,true));