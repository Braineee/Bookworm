import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types'

class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    }

    /**
     * this would log the changes made to the input
     * can work for any imput
    */
    onChange = (evt) => {
        this.setState({
            data: {...this.state.data, [evt.target.name]: evt.target.value}
        })
    }

    /**
     * when the form is submitted
     * 1. validate the input
     * 2. send to server
     */
    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        /**
         * if there is no error
         * load call the submit
         */
         
        if(Object.keys(errors).length === 0){
            this.setState({ loading: true });// set the loading state to true
            this.props
            .submit(this.state.data)
            .catch(err => this.setState({errors: err.response.data.errors, loading: false}))// catch any error throen on login
        }
    }

    /**
     * validator fuction
     */
    validate = (data) => {
        const errors = {}
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if(!data.password) errors.password = "Can't be blank";
        return errors;
    }

    render() {
        const { data, errors, loading } = this.state;
        return(
            <Form onSubmit={this.onSubmit} loading={loading}>

                {   /* display the error message if there is */
                    errors.global && <Message negative>
                        <Message.Header>Oops!... Something Went Wrong</Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                }

                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={this.onChange}
                    />

                    {/*display when there is an error in the email input*/}
                    {errors.email && <InlineError text={errors.email} />}

                </Form.Field>

                {/*input field for password*/}
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Your password goes here"
                        value={data.password}
                        onChange={this.onChange}
                    />

                    {/*display when there is an error in password input*/}
                    {errors.password && <InlineError text={errors.password} />}

                </Form.Field>

                {/*submit button*/}
                <Button primary>Login</Button>
            </Form>
        )
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export  default LoginForm; 