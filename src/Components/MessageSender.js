import React from 'react'
import {Avatar} from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import {useState} from 'react'
import './MessageSender.css'
import firebase from 'firebase'
import {useStateValue} from '../StateProvider'
import db from '../firebase'
import axios from '../axios'
import FormData from 'form-data'

const MessageSender = () => {
    const [input, setInput] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [{user}, dispatch] = useStateValue()

    console.log(user)
    const handleChange= (e) => {
        console.log('handle change')
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = async(e) => {
        console.log('submitting')
        e.preventDefault()
        // db.collection('posts').add({
        //     message: input,
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //     profilePic: user.photoURL,
        //     username: user.displayName,
        //     image: imageUrl
        // })
        if(image){
            const imgForm = new FormData()
            imgForm.append('file', image,image.name)
            axios.post('/upload/image', imgForm,{
                headers: {
                    'accept':'application/json',
                    'Accept-Language':'en-US,en;q=0.8',
                    'Content-Type':`multipart/form-data; boundry=${imgForm._boundry}`,
                }
            }).then((response) => {
                console.log(response.data)
                const postsData = {
                    text: input,
                    imgName: response.data.filename,
                    user: user.displayName,
                    avatar: user.photoURL,
                    timestamp: Date.now()
                }
                console.log('Saved')
                savePost(postsData)
            })
            
        }else{
            const postsData = {
                text: input,
                user: user.displayName,
                avatar: user.photoURL,
                timestamp: Date.now()
            }
            console.log('Saved')
            savePost(postsData)
        }
        setImage(null)
        setInput('')
        setImageUrl('')
    }

    const savePost = async(postsData) => {
        await axios.post('/upload/post', postsData).then((response)=>{
            console.log(response)
            console.log('Save-Function')
        })
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
