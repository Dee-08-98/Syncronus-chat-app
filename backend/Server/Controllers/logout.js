
// const logout = async (req, res) => {

// console.log('user token :- ',req.user);

//     try {

//         return res.status(200).json({ "message": "Logout sucessfull" })

//     } catch (error) {

//         console.log('logout api error :- ', error);

//     }

// }

// export default logout;


// .cookie("auth_token", "", {
//     maxAge: 0,
//     sameSite: "none",
//     httpOnly: true,
//     // secure: true   // ye true nrahne pe cookie nahi dikhegi


// })




const logout = async (req, res) => {
    console.log('user token :- ', req.userToken);
    console.log('my cookie :- ',req.cookies);


    try {
        res.clearCookie('user_token', {
            maxAge: 0,
            sameSite: "none",
            httpOnly: true,
            // secure: true, // Set to true if using HTTPS
        });

        return res.status(200).json({ "message": "Logout successful" });

    } catch (error) {
        console.log('logout api error :- ', error);
        return res.status(500).json({ "message": "Internal Server Error" });
    }
}


export default logout;