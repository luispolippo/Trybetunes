import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../styles/Header.css';
import logo from '../styles/images/logo_white.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.changeLoadingState(true);
    const user = await getUser();
    this.changeUserState(user.name);
    this.changeLoadingState(false);
  }

  changeLoadingState(bool) {
    this.setState({ loading: bool });
  }

  changeUserState(username) {
    this.setState({ user: username });
  }

  render() {
    const { user, loading } = this.state;
    return (
      loading ? <Loading />
        : (
          <header className="header" data-testid="header-component">
            <div className="header-info">
              <img className="logo" src={ logo } alt="trybetunes logo" />
              <div className="user">
                <p data-testid="header-user-name">{user}</p>
              </div>
            </div>
            <nav className="navigation">
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </nav>
          </header>
        )
    );
  }
}

export default Header;
