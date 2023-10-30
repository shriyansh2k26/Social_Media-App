import mongoose from 'mongoose';

const postSchema=  mongoose.Schema({
 
userID:{
    type:String,
    required:true
},
firstname:{
    type:String,
    required:true 
},
lastname:{
    type:String,
    required:true 
},
location:String,
descripton:String,
picturePath:String,
userPicturePath:String,
likes:{
    type:Map,
    of:Boolean,

},
comments:{
    type:Array,
    default:[]
}

},{timestamps:true}
);

const PostUser= mongoose.model('POST',postSchema);
export default PostUser;