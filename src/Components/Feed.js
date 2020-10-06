import React from 'react'
import MessageSender from './MessageSender'
import StoryReel from './StoryReel'
import Post from './Post'

const Feed = () => {
    return (
        <div className='Feed'>
            <StoryReel />
            <MessageSender />
            <Post 
                profilePic='https://image.freepik.com/free-photo/wall-wallpaper-concrete-colored-painted-textured-concept_53876-31799.jpg'
                message='This is a message of the feed'
                timeStamp='1601899243'
                Name='imgName'
                username='User'
                />

            {

            }
        </div>
    )
}

export default Feed
