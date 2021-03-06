import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() { // Req. 2, a requisição deve ser feita no momento em que o MovieList for montado no DOM (componentDidMount).
    this.getMoviesAPI();
  }

  async getMoviesAPI() {
    const request = await movieAPI.getMovies();
    this.setState({
      movies: request,
      loading: false,
    });
  }

  render() {
    const { movies, loading } = this.state;

    // Render Loading here if the request is still happening
    if (loading) return <Loading />; // Req. 2, enquanto a requisição estiver em curso, MovieList deve renderizar o componente Loading.

    return (
      <div data-testid="movie-list">
        {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        {/* req. 6, criado o link para adicionar cartão, continua no comp. New Movie */}
      </div>
    );
  }
}

export default MovieList;
