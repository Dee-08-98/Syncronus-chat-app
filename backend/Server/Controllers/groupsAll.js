import Chat from "../Models/ChatModel.js";

const allGroups = async(req,res)=>{

    try {

        const group = await Chat.find({isGroupChat : true})
        res.status(200).json({"message":"Fetching group sucessfull", result:group})
        
    } catch (error) {
        console.log('fetching groupchat error :-', error);
    }

}

export default allGroups