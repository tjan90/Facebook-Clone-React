import React, {useEffect} from 'react'
import axios from '../axios'
import MessageSender from './MessageSender'
import StoryReel from './StoryReel'
import Post from './Post'
import db from '../firebase'
import {useState} from 'react'
import Pusher from 'pusher-js'

const Feed = () => {
    const [profilePic, setProfilePic] = useState('')
    const [postsData, setPostsData] = useState([])

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => (
            setPostsData(snapshot.docs.map(doc => ({id: doc.id, data: doc.data})))
        ))
    }, [])
    
    return (
        <div className='Feed'>
            <StoryReel />
            <MessageSender />
            <Post 
                username='User'
                Name='imgName'
                message='This is a message of the feed'
                profilePic='https://image.freepik.com/free-photo/wall-wallpaper-concrete-colored-painted-textured-concept_53876-31799.jpg'
                timeStamp='1601899243'
                />

            {
                postsData.map(entry =>(
                    <Post
                    profilePic={entry.avatar}
                    message='{entry.text}'
                    timeStamp='{entry.timestamp}'
                    Name='{entry.imgName}'
                    username='{entry.user}'
                />
    ))
            }
        </div>
    )
}

export default Feed
