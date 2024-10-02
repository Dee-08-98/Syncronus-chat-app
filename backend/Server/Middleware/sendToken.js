

import jwt from 'jsonwebtoken'

import SECRET_KEY from '../Constants/const.js'

const sendToken = (res, code, payload, message, data) => {

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '15d' })

    return res.status(code).cookie("user_token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        httpOnly: true,
        // secure: true   // ye truenrahne pe cookie nahi dikhegi
    }).json({ "message": message, result: data, token: token })

}


export default sendToken;

