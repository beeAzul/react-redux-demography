import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
import VideoList from './containers/video-list';
import axios from 'axios';
import Video from './components/video'

const API_END_POINT = 'https://api.themoviedb.org/3/';
const POPULAR_MOVIES_URL = 'language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images';
const API_KEY = "api_key=32fd90564dda8d9f0da54b30513eed2a";
const DEFAULT_TYPE_SEARCH ="discover";
const DEFAULT_PARAM = "language=fr&include_adult=false";



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            currentMovie: {},
        };
    }

    componentDidMount() {
        this.initMovies()
    }

    initMovies = () => {
        axios
            .get(`${API_END_POINT}${DEFAULT_TYPE_SEARCH}/movie?${API_KEY}&${POPULAR_MOVIES_URL}`)
            .then(
                res => {
                    this.setState({movieList: res.data.results, currentMovie: res.data.results[0]}, function() {
                        // Cette function en 2eme param de setState permet d'etre sur que le state s'est bien mis a jour avant d'executer aplly..()
                        this.addVideoToCurrentMovie();
                    });
                    // console.log(this.state.movieList);
                    // console.log(this.state.currentMovie);
                }
            )
    };

    addVideoToCurrentMovie = () => {
        axios
            .get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`)
            .then(
                res => {
                    if(res.data.videos && res.data.videos.results){
                        const youtube_key =res.data.videos.results[0].key;
                        let currentMovieWithVideo = this.state.currentMovie;
                        currentMovieWithVideo.videoId = youtube_key;
                        this.setState({currentMovie:currentMovieWithVideo});
                    }
                }
            )
    };

    receiveFromVideoList = (movie) => {
        this.setState({currentMovie: movie}, function() {
            this.addVideoToCurrentMovie();
            this.setRecommendation();
        })
    };

    receiveFromSearchBar = (searchText) => {
        if(searchText) {
                axios.get(`${API_END_POINT}search/movie?${API_KEY}&${DEFAULT_PARAM}&query=${searchText}`).then(
                    res => {
                        if (res.data && res.data.results[0]) {
                            this.setState({currentMovie: res.data.results[0]}, () => {
                                this.addVideoToCurrentMovie();
                                this.setRecommendation();
                            })
                        }
                    }
                )
        }
    };

    setRecommendation = () => {
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(
            res => {
                if(res.data && res.data.results) {
                    this.setState({movieList: res.data.results})
                }
            }
        )
    };


    render() {

        /*const renderVideoList = () => {
            if(this.state.movieList.lenght>=5) {
                return <VideoList movieList={this.state.movieList}/>
            }
        }*/

        return (
            <div className="App container">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div className="row pb-3">
                    <div className="col-md-12 mt-5 mb-5">
                        <SearchBar fromChildren={this.receiveFromSearchBar}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <Video videoId={this.state.currentMovie.videoId}/>
                        <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview}/>

                    </div>
                    <div className="col-md-4">
                        <VideoList movieList={this.state.movieList} fromChildren={this.receiveFromVideoList}/>
                    </div>
                </div>
            </div>
        );

    }
}

export default App;
