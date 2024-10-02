import User from "../Models/auth.js"

const allUsers = async (req, res) => {
    const { search } = req.query

    if (!search) {
        return res.status(400).json({ "message": "Parameter is required" })
    }

    try {

        const result = await User.find( { name: { $regex: search, $options: "i" } })
        
        if (result.length === 0) {
            res.status(400).json({ sucess: false, "message": "User not Exist" })
        }

        else{
            res.status(200).json({ sucess: true, "message": "User Found", result: result })

        }


    } catch (error) {
        res.status(500).json({ "message": "Internal server error" }) 
    }
}

export default allUsers 