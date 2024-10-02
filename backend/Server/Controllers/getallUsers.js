import User from "../Models/auth.js"

const getallUsers = async (req, res) => {

    try {

        const result = await User.find()

        res.status(200).json({ sucess: true, "message": "User Found", result: result })


    } catch (error) {
        res.status(500).json({ "message": "Internal server error" })
    }
}

export default getallUsers 