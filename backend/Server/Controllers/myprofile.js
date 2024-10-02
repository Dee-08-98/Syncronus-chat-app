import User from "../Models/auth.js"

const myprofile = async(req,res)=>{


    const ID = req.params.ID

    // console.log(ID);
   

    try {
        
        const getData = await User.findById(ID)
        if (!getData) {
            res.status(404).json({  "message": "User Not Found" })
        }

        
        res.status(200).json({  "message": " found Sucessfull", result: getData })

    } catch (error) {
        return res.status(500).json({ "message": "Internal server error", error: error.message });
        
    }
}

export default myprofile