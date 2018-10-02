import React from 'react';

const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/w500/"

const VideoListItem = (props) => {
    const {movie} = props; // equivaut à movie = props.movie

    const handleOnClick = () => {
        // On envoie au parent via la props 'fromChildren' movie
        props.fromChildren(movie)
    };

        return (
            <li className="list-group-item my-3" onClick={handleOnClick}>
                <div className="media">
                    <div className="media-left">
                        <img className="media-object image-rounded" height="100px" src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt=""/>
                    </div>
                    <div className="media-body">
                        <h5 className="title_list_item" >{movie.title}</h5>
                    </div>
                </div>
            </li>
        )
}

export default VideoListItem;