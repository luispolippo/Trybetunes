import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import AlbumCards from '../components/AlbumCards';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      searchedArtist: '',
      isDisabled: true,
      loading: false,
      isFormVisible: true,
      foundAlbums: '',
      requestComplete: false,
    };
  }

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.artistInputValidation());
  }

  artistInputValidation = () => {
    const { artist } = this.state;
    if (artist.length >= 2) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  onHandleClickPesquisar = async () => {
    const { artist } = this.state;
    this.setState(
      {
        artist: '',
        loading: true,
        searchedArtist: artist,
        isFormVisible: false,
      },
    );
    const foundAlbums = await searchAlbumsAPI(artist);
    this.setState(
      {
        foundAlbums,
        loading: false,
        requestComplete: true,
        isFormVisible: true,
      },
    );
  }

  render() {
    const {
      artist,
      isDisabled,
      loading,
      isFormVisible,
      requestComplete,
      searchedArtist,
      foundAlbums,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading && <Loading />
        }
        {
          isFormVisible && (
            <div className="search-page">
              <form className="form-search">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  value={ artist }
                  placeholder="Nome do Artista"
                  name="artist"
                  onChange={ this.handleOnChange }
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ isDisabled }
                  onClick={ this.onHandleClickPesquisar }
                >
                  Pesquisar
                </button>
              </form>
            </div>
          )
        }
        {
          requestComplete && (
            <div>
              {
                foundAlbums.length > 0
                  ? (
                    <div className="albums-search">
                      <h2>{`Resultado de álbuns de: ${searchedArtist}`}</h2>
                      <div className="albums">
                        {
                          foundAlbums.map((album) => (
                            <AlbumCards album={ album } key={ album.collectionId } />
                          ))

                        }
                      </div>
                    </div>
                  )
                  : <h2>Nenhum álbum foi encontrado</h2>
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default Search;
