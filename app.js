import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import helmet from 'helmet'
import { register } from './controller/auth.js'
import router from './routes/authRoutes.js'
import userRoutes from './routes/usersRoutes.js'
import postRoutes from './routes/postRoutes.js'
import { verifyToken } from './middleware/auth.js'
import {createPost} from './controller/postController.js'
// configuration

const __filename =fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);

// console.log(dotenv.config());
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb" , extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')))

//file  storage
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets")
    },
    filename:function(req,file,cd){
        cb(null,file.originalname )
    }
});
const upload=multer({storage}) 

// Authentication Routes with file

app.post('/auth/register',upload.single("picture"),register);
app.post('/post',verifyToken,upload.single("picture"),createPost);
// Routes with folder
app.use('/auth',router);
app.use('/users',userRoutes)
app.use('/post',postRoutes);
// mongoose connect
const PORT=process.env.PORT||7789;
mongoose.connect("mongodb+srv://shriyanshsingh28:ZHr8k5g160GRRe2G@socialmedia.qdk40du.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true ,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to Database")
    app.listen(PORT,()=>{
        console.log(`server listening to port ${PORT}`)
    })
}).catch((err)=>{
    console.log(`Cant Connect :${err}`)
})

