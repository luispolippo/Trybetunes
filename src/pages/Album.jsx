import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as generateId } from 'uuid';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Album.css';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      album: '',
      musics: [],
      image: '',
      loading: false,
      favoritedSongs: [],
    };
  }

  componentDidMount() {
    this.updateState();
    this.loadFavoriteSongs();
  }

  loadFavoriteSongs = async () => {
    const favoritedSongs = await getFavoriteSongs();
    this.setState(() => ({ loading: false, favoritedSongs }));
  }

  updateState = async () => {
    this.setState({ loading: true });
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    console.log(musics);
    const artist = musics[0].artistName;
    const album = musics[0].collectionName;
    const image = musics[0].artworkUrl100;
    this.setState({ musics, artist, album, image });
  }

  render() {
    const { artist, album, image, musics, loading, favoritedSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading ? <Loading />
            : (
              <div className="album-page">
                <div className="album-header">
                  <div className="album-image">
                    <img src={ image } alt="album" />
                  </div>
                  <div className="album-header-info">
                    <h2 data-testid="album-name">{ album }</h2>
                    <h2 data-testid="artist-name">{ artist }</h2>
                  </div>
                </div>
                <div className="music-container">
                  {
                    musics.map((music, index) => {
                      if (index !== 0) {
                        return (<MusicCard
                          key={ generateId() }
                          music={ music }
                          favoritedSongs={ favoritedSongs }
                          index={ index }
                        />);
                      }
                      return false;
                    })
                  }
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
