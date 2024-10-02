import User from "../Models/auth.js"

const profile = async (req, res) => {

    const {img , bio} = req.body
    const ID = req.params.ID

    if(!img || !bio){
        res.status(400).json({"message":"All fields are necessary "})
    }

    try {
        
        const getData = await User.findById(ID)
        if (!getData) {
            res.status(404).json({  "message": "User Not Found" })
        }

        const updateData = await User.findByIdAndUpdate(ID, req.body, { new: true })
        res.status(200).json({  "message": " Updation Sucessfull", result: updateData })

    } catch (error) {
        return res.status(500).json({ "message": "Internal server error", error: error.message });
        
    }

}

export default profile;