import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';

class LoginPage extends React.Component {
    
    /**
     * submits the request to
     * the server
     */
    submit = data => {
        /**
         * dispatch the login data to the login function
         */
        return (
            this.props.login(data).then(() => this.props.history.push("/")) // redirect to the homepage on login
        );
       
    }

    render() {
        return(
            <div>
                <h1>Login Page</h1>
                <LoginForm submit={this.submit}/>
            </div>
        )
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,

    login: PropTypes.func.isRequired
}

export default connect(null, {login})(LoginPage);