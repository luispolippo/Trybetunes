import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AlbumCard.css';

class AlbumCards extends Component {
  render() {
    const { album } = this.props;
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = album;
    return (
      <div className="album-card">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <div className="album-img">
            <img src={ artworkUrl100 } alt={ artistName } />
          </div>
          <div className="album-info">
            <h3>{ collectionName }</h3>
            <p>{ artistName }</p>
          </div>
        </Link>
      </div>
    );
  }
}

AlbumCards.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumCards;
