import jwt from 'jsonwebtoken'
import SECRET_KEY from '../Constants/const.js'

const cookieAuth = (req , res , next)=>{

const token = req.cookies['user_token']
// console.log("cookie token :- ",token);

if(!token){
    return res.status(401).json({sucess:false , message :"please login to acess this route"})
}

try {
    if (token) {
        const decodedData = jwt.verify(token , SECRET_KEY )
        req.userToken = decodedData
        next()
    }
} catch (error) {
     return res.status(400).json({ error: "Invalid token" })
}

}

export default cookieAuth
