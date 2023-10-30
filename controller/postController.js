import PostUser from '../models/postModel.js'
import users from '../models/user.js'
// CREAtE
export const createPost=async(req,res)=>{
    try {
      const {userId,description,picturePath} = req.body;
      const user=users.findById(userId);
      const newPost=new PostUser({
        userId,
        firstname:user.firstname,
        lastname:user.lastname,
        location:user.location,
        description,
        userPicturePath:user.picturePath,
        picturePath,
        likes:{},
        comments:[]
      });

      await PostUser.save();

      const post=await PostUser.find();
      res.status(201).json(post);

    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

// READ POST

export const getFeedPosts=async(req,res)=>{
try {
    
    const post=await PostUser.find();
      res.status(200).json(post);

} catch (error) {
    res.status(404).json({message:error.message})
}
}

export const getUserPosts=async(req,res)=>{

  const {userId}=req.params;
  const posts=await PostUser.find({userId});
  res.status(200).json(posts);

}


// UPDATE

export const likePosts=async(req,res)=>{
    try {
    
      const { id}=req.params;
      const {userId}=req.body;
      const post=await PostUser.findById(id) ;
      const isLiked=post.likes.get(userId)
       if(isLiked){
        post.likes.delete(userId);
       }    
       else{
        post.likes.set(userId,true);
       }

       const updatedPost= await PostUser.findByIdAndUpdate(
        id,
        {likes:post.likes},
        {new: true}
       );

       res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({message:error.message})
    }


}