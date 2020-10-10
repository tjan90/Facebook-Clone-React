const express = require('express')
const multer = require("multer")
const GridFsStorage = require("multer-gridfs-storage")
const Grid = require("gridfs-stream")
const bodyParser = require("body-parser")
const path = require("path")
const Pusher = require("pusher")
const mongoose = require('mongoose')
const cors = require('cors')
 
/*

expressjs run server command
nodemon server.js

*/

const mongoPosts = require('./postModel')

Grid.mongo = mongoose.mongo

//app_config

const app = express()
const port = process.env.PORT || 9000

//middlwares
app.use(bodyParser.json());
app.use(cors())

//db_config
const mongoUri = 'mongodb+srv://admin:<password-here>@cluster0.sz4tt.mongodb.net/facebook-db?retryWrites=true&w=majority'
const conn = mongoose.createConnection(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let gfs
conn.once('open', () => {
    console.log('DB connected')
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('images')
    })

const storage = new GridFsStorage({
    url :mongoUri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`

            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            };
            resolve(fileInfo)
        });
    }
});

const upload = multer({storage})

mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true

})

//api_routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.post('/upload/image', upload.single('file'), (req, res) => {
    res.status(201).send(req.file)
})

app.post('/upload/post', (req,res)=> {
    const dbPost = req.body
    mongoPosts.create(dbPost, (err, data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
    
})

app.get('/retrieve/posts', (req,res) =>{
    mongoPosts.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            data.sort((b, a)=> {
                return a.timestamp = b.timestamp;
            })
            res.status(200).send(data)
        }
    })
})

app.get('/retrieve/image/single', (req,res)=>{
    gfs.files.findOne({filename: req.query.name},(err,file)=>{
        if(err){
            res.status(500).send(err)
        }else {
            if(!file ||file.length ===0){
                res.status(404).json({err: 'file not found'})
            }else {
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            }
        }
    })
})

//listen
app.listen(port, ()=>console.log(`listening on localhost:${port}`))

