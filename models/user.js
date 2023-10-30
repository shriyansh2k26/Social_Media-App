import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    lastname:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5,
    },
    picturePath:{
        type:String,
        default:"",
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    viewedProfile:String,
    occupation:String,
    impression:Number,
   
}, {timestamps:true},)

const users=mongoose.model('USERS',userSchema);
export default users;