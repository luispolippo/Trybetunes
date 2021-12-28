import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Login.css';
import logoTrybetunes from '../styles/images/LOGO_POSITIVA 1.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isDisabled: true,
      isLoading: false,
      logged: false,
    };
  }

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.usernameValidation());
  }

  usernameValidation = () => {
    const { username } = this.state;
    const minCharLength = 3;
    if (username.length >= minCharLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleButtonClick = async () => {
    this.setState({ isLoading: true });
    const { username } = this.state;
    await createUser({ name: username });
    this.setState({ logged: true });
  }

  render() {
    const { username, isDisabled, isLoading, logged } = this.state;
    return (
      <div className="login" data-testid="page-login">
        { logged && <Redirect to="/search" /> }
        { isLoading
          ? <Loading />
          : (
            <>
              <img
                src={ logoTrybetunes }
                className="logo"
                alt="trybetunes-logo"
              />
              <form className="form-login">
                <input
                  type="text"
                  placeholder="Insira seu nome"
                  data-testid="login-name-input"
                  name="username"
                  value={ username }
                  onChange={ this.handleOnChange }
                  className="login-input"
                />
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ isDisabled }
                  onClick={ this.handleButtonClick }
                  className="login-button"
                >
                  Entrar
                </button>
              </form>
            </>
          )}
      </div>
    );
  }
}

export default Login;
