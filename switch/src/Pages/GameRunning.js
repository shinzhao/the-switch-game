import React, { Component } from 'react';

import './GameRunning.css';
import Game from './phaser/Game';
import { withAuthenticator } from 'aws-amplify-react';
import { withRouter } from 'react-router-dom';
import * as mutations from '../graphql/mutations';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import aws_config from '../aws-exports';
import { Auth } from 'aws-amplify';
import * as queries from './phaser/../../graphql/queries';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Button, Card } from 'react-bootstrap';
import { SelectMFAType } from 'aws-amplify-react/dist/Widget';
import { type } from 'os';


class GameRunning extends React.Component {
    constructor() {
        super();
        this.state={
            showGame: true,
            
           
        }
        this.handleBackClick = this.handleBackClick.bind(this);
    }


    async componentDidMount(){

    }
    componentWillUnmount() {
      }

    handleBackClick(e) {
        e.preventDefault();
        this.props.history.push('/room-list');
        this.setState({
          showGame : false  
        })
    }
   
       
    
    

   


   
    render() {
        return(
            <div className="running">
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
                </head>
                <Button className="room-back-button" variant="secondary" onClick={this.handleBackClick}>Back</Button>
                { this.state.showGame ? <Game />: 
                    <div>
                    </div>
                }
            </div>
        );
    }

}

export default withRouter(withAuthenticator(GameRunning,true));

