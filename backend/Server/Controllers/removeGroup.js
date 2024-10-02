import Chat from "../Models/ChatModel.js"

const remove = async(req,res)=>{

    const { groupID } = req.body

    if (!groupID ) {
        return res.status(400).json({ sucess: false, message: "groupnID is required" })
    }


    try {

        const remove = await Chat.findByIdAndDelete(groupID)
        res.status(200).json({ sucess: true, message: " GroupChat Deleted sucessfull", DeleteGroupChat: remove })

    } catch (error) {
        
        res.status(500).json({ sucess: false, message: "Internal Server Error", Error: error.message })

    }
}

export default remove;