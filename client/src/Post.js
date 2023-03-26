import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ task }) => {
    return (
        <article className="post">
            <h2>{task.name}</h2>
            <p className="postDate">{task.periodtype}</p>
            <p className="postBody">{
                task.description}
            </p>
        </article>
    )
}

export default Post