// import multer from 'multer'

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/temp")
//     },
//     // filename: function(req, file, cb){
//     //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     //     cb(null, file.fieldname + "-" + uniqueSuffix)
//     // }

//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }

// })

// const upload = multer({ storage: storage })

// export default upload



// its a middleware   here avtar and coverImage are name and must remember this name must be same on clientSide also


// upload.fields([
//     {
//         name: "avtar",
//         maxCount: 1
//     },
//     {
//         name: "coverImage",
//         maxCount: 1
//     }
// ])





// in api how we use


// const avtarLocalPath = req.files?.avtar[0].path
// // const coverImageLocalPath = req.files?.avtar[0].path


// let coverImageLocalPath;

// if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
//     coverImageLocalPath = req.files.avtar[0].path
// }

// if (!avtarLocalPath) {
//     res.send("error")
// }



// const avtar = await uploadOnCloudinary(avtarLocalPath)
// const coverImage = await uploadOnCloudinary(coverImageLocalPath)

// if (!avtar) {
//     res.send("error")
// }

// user.create({
//     name,
//     email,
//     avtar: avtar.url,
//     coverImage: coverImage?.url || "",
//     password
// })

