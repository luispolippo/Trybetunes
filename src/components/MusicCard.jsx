import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../styles/MusicCard.css';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.checkFavoriteSongs();
  }

  handleOnChange = async ({ target }) => {
    const { checked } = target;
    this.setState({ checked, loading: true });
    const { music, path, callback } = this.props;
    const { trackName, previewUrl, trackId } = music;
    if (checked) {
      await addSong({ trackName, previewUrl, trackId });
    } else {
      await removeSong({ trackName, previewUrl, trackId });
    }
    this.setState({ loading: false });
    if (path === '/favorites') {
      callback();
    }
  }

  checkFavoriteSongs = () => {
    const { favoritedSongs, music } = this.props;
    const { trackId } = music;
    const isFavorited = favoritedSongs.some((song) => song.trackId === trackId);
    this.setState({ checked: isFavorited });
  }

  render() {
    const { music, index } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { checked, loading } = this.state;
    return (
      <div className="music-card">
        {loading ? <Loading />
          : (
            <>
              <p>{trackName}</p>
              <audio
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
              </audio>
              <label htmlFor={ `checkbox-input-${index}` }>
                <input
                  id={ `checkbox-input-${index}` }
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  checked={ checked }
                  onChange={ this.handleOnChange }
                />
                Favorita
              </label>
            </>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  favoritedSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};
