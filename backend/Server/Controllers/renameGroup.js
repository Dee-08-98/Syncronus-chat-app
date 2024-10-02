import Chat from "../Models/ChatModel.js"

const rename = async (req, res) => {
    const { groupID, groupName } = req.body

    if (!groupID || !groupName) {
        return res.status(400).json({ sucess: false, message: "groupnName is required" })

    }


    try {

        const rename = await Chat.findByIdAndUpdate(groupID, { chatName: groupName }, { new: true })
        res.status(200).json({ sucess: true, "message": " GroupChat rename sucessfull", renameGroupChat: rename })

    } catch (error) {

        res.status(500).json({ sucess: false, "message": "Internal Server Error", Error: error.message })

    }
}

export default rename;