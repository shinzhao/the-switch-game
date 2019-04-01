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
                this.state.confirmPassword>0 &&
                this.state.password===this.state.confirmPassword
            );
    }

    handleChange(event){
        this.setState({[event.target.id]: event.target.value});
    }
    handleSubmit = async event => {
		event.preventDefault();

		this.setState({ isLoading: true });

		try {
			const newUser = await Auth.signUp({
				username: this.state.email,
				password: this.state.password
			});
			this.setState({
				newUser
			});
		} catch (e) {
			alert(e.message);
		}

		this.setState({ isLoading: false });
    };

    handleConfirmationSubmit = async event => {
		event.preventDefault();

		this.setState({ isLoading: true });

		try {
			await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
			await Auth.signIn(this.state.email, this.state.password);

			this.props.userHasAuthenticated(true);
			this.props.history.push('/');
		} catch (e) {
			alert(e.message);
			this.setState({ isLoading: false });
		}
    };

    renderConfirmationForm() {
        return (
			<form onSubmit={this.handleConfirmationSubmit}>
				<FormGroup controlId="confirmationCode" bsSize="large">
					<FormLabel>Confirmation Code</FormLabel>
					<FormControl autoFocus type="tel" value={this.state.confirmationCode} onChange={this.handleChange} />
					
				</FormGroup>
				<Button
					block
					bsSize="large"
					disabled={!this.validateConfirmationForm()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Verify"
					loadingText="Verifying…"
				/>
			</form>
		);
	}
    render(){
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                <FormLabel>Email</FormLabel>
                <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}></FormControl>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" value={this.state.password} onChange={this.handleChange}></FormControl>
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl type="password" value={this.state.confirmPassword} onChange={this.handleChange}></FormControl>
                </FormGroup>
                <Button block
					bsSize="large"
					disabled={!this.validateForm()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Signup"
                    loadingText="Signing up…">Sign Up</Button>
                    
              
                </form> 
            </div>
            
        );
    }
}

export default SignUpPage;