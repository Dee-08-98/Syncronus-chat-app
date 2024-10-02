import jwt from 'jsonwebtoken'
import SECRET_KEY from '../Constants/const.js'

const authmiddleware = (req, res, next) => {
    const head = req.headers.authorization
    // console.log('headers token :- ',head);
    if(!head){
        return res.status(401).json({ sucess: false, message: "Token not found" })
    }
    const token = head.split(' ')[1]
    // console.log('my token :- ',token);
    if (!token) {
        return res.status(401).json({ sucess: false, message: "Unauthorised" })
    }

    try {
        if (token) {
            const getToken = jwt.verify(token,SECRET_KEY)
            req.user = getToken
            next()
        }
    } catch (error) {
         return res.status(400).json({ error: "Invalid token",error })
    }

}

export default authmiddleware;