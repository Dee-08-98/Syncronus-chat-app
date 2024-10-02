import Chat from "../Models/ChatModel.js";
import User from "../Models/auth.js";

const fetch = async (req, res) => {
    try {
        const chatOfUser = Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async(results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name img email"
                })

        res.status(200).json({"message":"fetching sucessfull", result:results})

            })
           
    } catch (error) {
        res.send(error)
    }
}

export default fetch;