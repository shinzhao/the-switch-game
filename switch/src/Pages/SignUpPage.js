import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import { Auth } from 'aws-amplify';

class SignUpPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isLoading: false,
            email: '',
            password:'',
            confirmPassword: '',
			confirmationCode: '',
			newUser: null

        };
        this.handleChange = this.handleChange.bind(this);
    }
    validateForm(){
        return (this.state.email.length > 0 && this.state.password.length > 0&&
                this.state.confirmPassword>0 && this.state.confirmationCode>0&&
                this.state.password===this.state.confirmPassword
            );
    }
    handlesubmit(){

    }

    handleChange(event){
        this.setState({[event.target.id]: event.target.value});
    }
    render(){
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handlesubmit}>
                <FormGroup controlId="email" bsSize="large">
                <FormLabel>Email</FormLabel>
                <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}></FormControl>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl autoFocus type="password" value={this.state.password} onChange={this.handleChange}></FormControl>
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl autoFocus type="confirmpassword" value={this.state.confirmPassword} onChange={this.onChange}></FormControl>
                </FormGroup>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl autoFocus type="confirmationCode" value={this.state.confirmPassword} onChange={this.handleChange}></FormControl>
                </FormGroup>
              
                </form>
            </div>
            
        );
    }
}

export default SignUpPage;