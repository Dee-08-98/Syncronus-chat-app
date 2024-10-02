import Message from "../Models/messageModel.js";

const allMessage = async (req, res) => {

    try {

        const message = await Message.find({ chat: req.params.chatID })
            .populate("sender", "name img email")
            .populate("chat")

            res.status(200).json({"message":"allmessage find sucessfull" , result :message})

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });

    }

}

export default allMessage;