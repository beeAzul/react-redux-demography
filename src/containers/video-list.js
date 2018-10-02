import React from 'react';
import VideoListItem from '../components/video-list-item'

const VideoList = (props) => {
    const {movieList} = props;
    return (
        <div className="lolus">
            <h2>Movies list</h2>
            {
                movieList.map( movie => <VideoListItem key={movie.id} movie={movie} fromChildren={receiveFromVideoListItem}/> )
            }
        </div>
        );


    // Cette function recoi en argmuent "caché" la props movie provenant de videoListItem
    // la props fromChildren est utilisé dans le component enfant pour envoyer {movie} au parent VideoList
    function receiveFromVideoListItem (movie) {
        /*console.log('---------From Child---------')
        console.log(movie)
        console.log('---------From Child---------')*/
        // on envoie au parent movie via la props 'fromChildren'
        props.fromChildren(movie)
    }
}

export default VideoList;