import React from 'react';
import { Form, Button } from 'semantic-ui-react';
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
            this.props.submit(this.state.data);
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
        const { data, errors } = this.state;
        return(
            <Form onSubmit={this.onSubmit}>
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

                    {/*display when there is an error in the form*/}
                    {errors.email && <InlineError text={errors.email} />}

                </Form.Field>
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

                    {/*display when there is an error in the form*/}
                    {errors.password && <InlineError text={errors.password} />}

                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        )
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export  {LoginForm}; 