import users from '../models/user.js'

// READ

export const getUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await users.findById(id);
        res.status(200).json({user})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getUserFriends=async(req,res)=>{
  try {
    const {id}=req.params;
    const user=await users.findById(id);
    const friends=await Promise.all(
        user.friends.map((id)=>{
            user.findById(id)
        })
    )
const formattedFriends=friends.map(({_id,firstname,lastname,occupation,location,picturePath})=>{
    return {_id,firstname,lastname,occupation,location,picturePath}
}

);
res.status(200).json({formattedFriends})

  } catch (error) {
    res.status(404).json({message:error.message})
  }

}


// UPDATE
export const addRemoveFriends=async(req,res)=>{
    try {
      const {id,friendId}= req.params;
      const user=await users.findById(id);
      const friend =await users.findById(friendId)  ;

      if(users.friends.includes(friendId)){
        user.friends=user.friends.filter((id)=>id!=friendId);
        friend.friends=friend.friends.filter((id)=>id!=id)
      }
      else{
        user.friends.push(friendId);
        friend.friends.push(id);
      }
      await user.save();
      await friend.save();

      const friends=await Promise.all(
        user.friends.map((id)=>{
            user.findById(id)
        })
    )
const formattedFriends=friends.map(({_id,firstname,lastname,occupation,location,picturePath})=>{
    return {_id,firstname,lastname,occupation,location,picturePath}
}
);

    } catch (error) {
        res.status(404).json({message:error.message}) 
    }
}