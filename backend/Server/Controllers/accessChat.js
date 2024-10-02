import Chat from "../Models/ChatModel.js";
import User from "../Models/auth.js";

const accessChat = async (req, res) => {

    const { userID } = req.body

    console.log('user id are :- ',req.userID);

    if (!userID) {
        res.status(400).json({ success: "false", message: "Invalid Details" })
    }

    const isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user.id } } },
            { users: { $elemMatch: { $eq: userID } } }
        ]
    })
        .populate('users', '-password')
        .populate('latestMessage')

    // console.log(isChat);

    const isChattrue = await User.populate(isChat, {
        path: "latestMessage.Sender",
        select: "name img email"
    })


    // console.log(isChattrue); 

    if (isChattrue.length > 0) {
        res.send(isChat[0])
    }
    else {
        const chatData = {
            chatName: "Sender",
            isGroupChat: false,
            users: [req.user.id, userID]
        }
        try {
            const createChat = await Chat.create(chatData)
            const finalChat = await Chat.findOne({ _id: createChat._id }).populate('users', '-password')

            res.status(201).json({ "message": "chat created", result: finalChat })
        } catch (error) {
            res.status(500).json({ success: "false", message: "Internal server error", error })

        }
    }

}

export default accessChat;