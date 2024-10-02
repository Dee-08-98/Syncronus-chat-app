import Chat from "../Models/ChatModel.js";

const findGroup = async (req, res) => {

    const { groupID } = req.body

    try {

        const result = await Chat.find({_id:groupID}).populate("users").populate("groupAdmin")
        // console.log(result);
        res.status(200).json({ "message": "Group Found sucessfull", result: result })

    } catch (error) {

        res.status(500).json({ success: "false", message: "Internal server error", error })
    }

}

export default findGroup;