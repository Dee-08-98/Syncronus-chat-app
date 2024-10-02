import Chat from "../Models/ChatModel.js"
import User from "../Models/auth.js"
import Message from "../Models/messageModel.js"

const Sendmsg = async (req, res) => {
    const { content, chatID } = req.body

    if (!content || !chatID) {
        res.status(400).json({ "message": "All details are required" })
    }

    const newMessage = {
        sender: req.user.id,
        content: content,
        chat: chatID
    }

    // console.log(req.body);

    try {

        let msg = await Message.create(newMessage)

        msg = await msg.populate("sender", "name img")
        msg = await msg.populate("chat")
        
        msg = await User.populate(msg, {
            path: "chat.users",
            select: "name img email"
        })

        await Chat.findByIdAndUpdate(chatID, { latestMessage: msg })
        res.status(200).json({"message":"Sucessfull ", result : msg})

    } catch (error) {

        res.status(500).json({ "message": "Internal server error", error })
    }

}

export default Sendmsg;