import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      isDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.changeLoadingState(true);
    this.fetchUser();
    this.changeLoadingState(false);
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setUserState(user);
  }

  setUserState = (user) => {
    const { name, description, image, email } = user;
    this.setState({
      name,
      email,
      image,
      description,
    }, () => {
      if (name && email && image && description) {
        this.setState({ isDisabled: false });
      }
    });
  }

  changeLoadingState = (bool) => {
    this.setState({ loading: bool });
  }

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => {
        this.checkValidations();
      });
  }

  checkValidations = () => {
    const { name, email, description, image } = this.state;
    const emptyValidations = (name.length > 0)
      && (email.length > 0)
      && (description.length > 0)
      && (image.length > 0);
    const regex = /^[\w]+@[\w]+.com/;
    const emailValidation = regex.test(email);
    if (emailValidation && emptyValidations) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleClick = async () => {
    const { name, email, description, image } = this.state;
    const obj = { name, email, image, description };
    this.changeLoadingState(true);
    await updateUser(obj);
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const {
      loading,
      name,
      email,
      image,
      description,
      isDisabled,
      redirect,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        { redirect && <Redirect to="/profile" /> }
        <Header />
        {
          loading ? <Loading />
            : (
              <div>
                <form>
                  <div>
                    <input
                      type="text"
                      value={ name }
                      placeholder="Nome"
                      data-testid="edit-input-name"
                      name="name"
                      onChange={ this.handleOnChange }
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={ email }
                      placeholder="Email"
                      data-testid="edit-input-email"
                      name="email"
                      onChange={ this.handleOnChange }
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={ description }
                      placeholder="Descrição"
                      data-testid="edit-input-description"
                      name="description"
                      onChange={ this.handleOnChange }
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={ image }
                      placeholder="Link da imagem"
                      data-testid="edit-input-image"
                      name="image"
                      onChange={ this.handleOnChange }
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      data-testid="edit-button-save"
                      disabled={ isDisabled }
                      onClick={ this.handleClick }
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            )
        }
      </div>
    );
  }
}

export default ProfileEdit;
