import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './Form.css';
import FormValidator from './FormValidator';
import backgroung from './bg.png';


class Form extends Component {
  constructor() {
    super();

    this.validator = new FormValidator([  
      { 
        field: 'email', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Email is required.' 
      },
      { 
        field: 'email',
        method: 'isEmail', 
        validWhen: true, 
        message: 'That is not a valid email.'
      },
      { 
        field: 'phone', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Pleave provide a phone number.'
      },
      // {
      //   field: 'phone', 
      //   method: 'matches',
      //   args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
      //   validWhen: true, 
      //   message: 'That is not a valid phone number.'
      // },
      { 
        field: 'password', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Password is required.'
      },
      { 
        field: 'password_confirmation', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Password confirmation is required.'
      },
      { 
        field: 'password_confirmation', 
        method: this.passwordMatch,   // notice that we are passing a custom function here
        validWhen: true, 
        message: 'Your password and password confirmation do not match.'
      },{ 
        field: 'name', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Name is required.'
      }
    ]);

    this.state = {
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      name: '',
      validation: this.validator.valid(),
    }

    this.submitted = false;
  }

  passwordMatch = (confirmation, state) => (state.password === confirmation)

  handleInputChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
    
  handleFormSubmit = event => {

    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      alert("Please check chart folder for random chart....")
  }
}

  render() {
    let validation = this.submitted ?                         // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                      this.state.validation                   // otherwise just use what's in state

    return (
      <div className="main--section container">
        <div className="main--section__col date--range">
          <img src={backgroung} className="date--range__img"/>
          <div className="date--range__detail">
          <h3 className="date--range__heading">Choose a date range</h3>
          <p className="date--range__description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi neque, blanditiis inventore debitis fuga numquam voluptate architecto itaque molestiae.</p>
        </div>
        </div>

      <div className="main--section__col create--acc">
      <form className="create--acc__form">
        <h2 className="create--acc__heading">Create an account</h2>

        <div className={validation.email.isInvalid && 'has-error'}>
          <label className="create--acc__label" htmlFor="email">Your email address</label>
          <input type="email" className="form-control"
            name="email"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.email.message}</span>
        </div>

        <div className={validation.password.isInvalid && 'has-error'}>
          <label className="create--acc__label" htmlFor="password">Your password</label>
          <input type="password" className="form-control"
            name="password"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.password.message}</span>
        </div>

        <div className={validation.password_confirmation.isInvalid && 'has-error'}>
          <label className="create--acc__label" htmlFor="password_confirmation">Confirm your password</label>
          <input type="password" className="form-control"
            name="password_confirmation"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.password_confirmation.message}</span>
        </div>

        <div className={validation.name.isInvalid && 'has-error'}>
          <label className="create--acc__label" htmlFor="name">Your name</label>
          <input type="text" className="form-control"
            name="name"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.name.message}</span>
        </div>

        <div className={validation.phone.isInvalid && 'has-error'}>
          <label className="create--acc__label" htmlFor="phone">Phone</label>
          <input type="phone" className="form-control"
            name="phone"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.phone.message}</span>
        </div>

        <div>
          <input type="checkbox"
            name="phone"
            onChange={this.handleInputChange}
          />
          <label className="create--acc__terms" htmlFor="checkbox"> I read and agree Terms and Conditions</label>
        </div>

        

        <button type="submit" onClick={this.handleFormSubmit} className="create--acc__btn btn btn-primary">
          Create account
        </button>

      </form>
      </div>
      </div>
    )
  }
}
export default Form;