import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  state ={
  }

  componentDidMount(){

    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie title={movie.title_english}
      poster={movie.medium_cover_image}
      key={movie.id}
      genres={movie.genres}
      synopsis={movie.synopsis}
      />
    })
    return movies
  } //리액트와 차이를 두기위해 언더스코어로 시작한다

//asynchronous function
//async를 써야 await 작동
  _getMovies = async () => {
    //await는 callApi 함수가 끝나는 것을 기다린다.
    const movies  = await this._callApi()
    //작업이 완료된 후에 setState
    this.setState({
      movies
    })
  }

  _callApi = () => {
    //promise : 비동기 , 자바스크립트 컨셉 , 시나리오 스케줄관리
    //fetch : url ajax 비동기
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json()) //성공하면 then fetch의 결과물
    .then(json => json.data.movies) //=>에 return 내재되있음
    .catch(err => console.log(err)) //에러 catch
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App-loading"}>
        {movies ? this._renderMovies() : 'Loading' }
      </div>
    );
  }
}

export default App;
