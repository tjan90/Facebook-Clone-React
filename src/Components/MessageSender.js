import React from 'react'
import {Avatar, Button, Input} from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import {useState} from 'react'
import './MessageSender.css'

const MessageSender = () => {
    const [input, setInput] = useState('')
    const [image, setImage] = useState(null)
    const handleChange= (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = () => {
        console.log('submitting')
    }
    return (
        <div className='messageSender'>
            <div className='messageSender__top'>
                <Avatar src='https://i.pinimg.com/564x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg'/>
                <form>
                    <input 
                        type='text' 
                        className='messageSender__input' 
                        placeholder='whats on your mind'
                        value = {input}
                        onChange={(e)=> setInput(e.target.value)} />
                    <input type='file' className='messageSender__fileSelector' onChange={handleChange} />
                    <button onClick={handleSubmit} type='submit'> Hidden Submit</button>
                </form>
            </div>

            <div className='messageSender__bottom'>
            <div className='messageSender__option'>
                    <VideocamIcon  style={{color : 'red'}}/>
                    <h4>Live Video</h4>
                </div>

                <div className='messageSender__option'>
                    <PhotoLibraryIcon  style={{color : 'green'}}/>
                    <h4>Photo/Video</h4>
                </div>
                <div className='messageSender__option'>
                    <InsertEmoticonIcon  style={{color : 'orange'}}/>
                    <h4>Feeling/Activity</h4>
                </div>
                
            </div>
        </div>
    )
}

export default MessageSender
