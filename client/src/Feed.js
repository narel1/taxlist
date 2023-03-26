import React from 'react';
import Post from './Post';

const Feed = ({ tasks }) => {
    return (
        <>
            {tasks.map(task => (
                <Post key={task.id} task={task} />
            ))}
        </>
    )
}

export default Feed