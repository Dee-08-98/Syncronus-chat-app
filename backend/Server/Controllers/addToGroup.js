import mongoose from "mongoose";
import Chat from "../Models/ChatModel.js";
import User from "../Models/auth.js";

const add = async (req, res) => {
    const { groupID, userID } = req.body;

    // Check if both fields are provided
    if (!groupID || !userID) {
        return res.status(400).json({ success: false, message: "Invalid fields" });
    }

    try {
        // Check if the user exists
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the group exists
        const findinaddGroup = await Chat.findById(groupID);
        if (!findinaddGroup) {
            return res.status(404).json({ success: false, message: "Group does not exist" });
        }

        // Check if the user is already in the group
        if (findinaddGroup.users.includes(userID)) {
            return res.status(400).json({ success: false, message: "User is already in the group" });
        }

        // Check if the users array contains any invalid ObjectIds
        if (findinaddGroup.users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }

        // Add the user to the group
        const addGroup = await Chat.findByIdAndUpdate(
            groupID,
            { $push: { users: userID } },
            { new: true }
        ).populate('users', "-password")
         .populate('groupAdmin', '-password');

        // Send a success response with the updated group data
        res.status(200).json({ success: true, message: "User added successfully", addGroupChat: addGroup });

    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export default add;
