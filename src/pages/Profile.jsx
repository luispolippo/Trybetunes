import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

const defaultImage = 'https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.changeLoading(true);
    this.setUserInState();
  }

  setUserInState = async () => {
    const user = await getUser();
    this.setState({ user });
    this.changeLoading(false);
  }

  changeLoading = (bool) => {
    this.setState({ loading: bool });
  }

  render() {
    const {
      loading,
      user: { name, email, image, description },
    } = this.state;
    let userImage;
    if (image) {
      userImage = image;
    } else {
      userImage = defaultImage;
    }
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading />
            : (
              <div>
                <img
                  data-testid="profile-image"
                  src={ userImage }
                  style={ { height: '200px' } }
                  alt="user"
                />
                <h3>{name}</h3>
                <p>{email}</p>
                <p>{description}</p>
                <Link to="/profile/edit"><p>Editar perfil</p></Link>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
