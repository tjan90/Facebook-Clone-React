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

    const syncFeed = () => {
        axios.get('/retrieve/posts')
        .then((response)=>{
            console.log(response.data)
            setPostsData(response.data)
            
        })
    }

    useEffect(() => {
        syncFeed()
        
    }, [])
    
    return (
        <div className='Feed'>
            <StoryReel />
            <MessageSender />
            
            {
                postsData.map(entry =>(
                    <Post
                    profilePic={entry.avatar}
                    message={entry.text}
                    timeStamp={entry.timestamp}
                    imgName={entry.imgName}
                    username={entry.user}
                />
    ))
            }
        </div>
    )
}

export default Feed
