import React from 'react';

const VideoDetail = ({title,description}) => {
        return (
            <div>
                <h2>Current movie</h2>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        )
}

export default VideoDetail;