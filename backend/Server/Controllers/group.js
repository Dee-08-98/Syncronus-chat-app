// import Chat from "../Models/ChatModel.js"

// const group = async(req,res)=>{


//     if (!req.body.users || !req.body.name) {
//         return res.status(400).json({ sucess: false, message: "Invalid Fields" })
//     }

//     // console.log(req.body.user,req.body.name);

//     var users = JSON.parse(req.body.users)  // front-end se array ke form me user aayega string ke format me so json.parse use

//     // console.log(users);

//     if (users.length < 2) {
//         return res.status(400).json({ sucess: false, message: "More than two users are required to form a group Chat" })
//     }

//     users.push(req.user)

//     // res.send(users)


//     try {

//         const groupChat = await Chat.create({
//             chatName: req.body.name,
//             isGroupChat: true,
//             users: users,
//             groupAdmin: req.user
//         })


//         // res.send(data)


//         const fullGroupChat = await Chat.findOne({_id : groupChat._id})
//         .populate('users' , "-password")
//         .populate('groupAdmin','-password')

//         res.status(200).json({sucess : true , message : " GroupChat Created Sucessfully" , groupChat : fullGroupChat })

//     }

//     catch (error) {
//         res.status(500).json({ sucess: false, message: "Internal Server Error", Error: error })
//         // console.log(error);
//     }

// }

// export default group;




import mongoose from 'mongoose';
import Chat from "../Models/ChatModel.js"

const group = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ sucess: false, message: "Invalid Fields" });
    }

    let users;
    try {
        users = JSON.parse(req.body.users); // Convert JSON string to array of ObjectIds
    } catch (error) {
        return res.status(400).json({ sucess: false, message: "Invalid users format" });
    }

    // Validate that all users are valid ObjectId strings
    if (users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        return res.status(400).json({ sucess: false, message: "Invalid user ID format" });
    }

    // Add the current user to the list of users
    users.push(req.user.id);

    if (users.length < 2) {
        return res.status(400).json({ sucess: false, message: "More than two users are required to form a group Chat" });
    }

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user.id
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate('users', "-password")
            .populate('groupAdmin', '-password');

        res.status(200).json({ sucess: true, message: "GroupChat Created Successfully", groupChat: fullGroupChat });

    } catch (error) {
        res.status(500).json({ sucess: false, message: "Internal Server Error", error });
    }
};



export default group;
