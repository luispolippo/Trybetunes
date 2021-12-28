import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as generateId } from 'uuid';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.loadFavoriteSongs();
  }

  loadFavoriteSongs = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, favoriteSongs });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    const { match: { path } } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading />
          : (
            <div>
              {
                favoriteSongs.map((song, index) => (
                  <MusicCard
                    key={ generateId() }
                    favoritedSongs={ favoriteSongs }
                    music={ song }
                    path={ path }
                    index={ index }
                    callback={ this.loadFavoriteSongs }
                  />
                ))
              }
            </div>
          )}
      </div>
    );
  }
}

Favorites.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Favorites;
