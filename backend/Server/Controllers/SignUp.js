import auth from '../Models/auth.js'
import sendToken from '../Middleware/sendToken.js'

const sign = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.json({ "message": "All fields are required" }).status(400)
    }
    if (password.length >= 6 && password.length <= 8) {
        try {

            const existEmail = await auth.findOne({ email })
            if (existEmail) {
                return res.json({ "message": "User already register" }).status(400)
            }
            const userCreate = await auth.create({ name, email, password })

            const payload = {
                id: userCreate._id,
                email: userCreate.email,
                name: userCreate.name
            }

            const data = {
                id: userCreate._id,
                email: userCreate.email,
                name: userCreate.name
            }

            return sendToken(res, 201, payload, "Registration sucessfull", data)
        } catch (error) {
            return res.json({ "message": "user registered error", error: error.message }).status(500)
        }
    }

    return res.json({ "message": "Password must be between 6 and 8 character" }).status(400)
}

export default sign;