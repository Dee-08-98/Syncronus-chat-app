// import { v2 as cloudinary } from "cloudinary"
// import fs from 'fs'

// cloudinary.config({
//     cloud_name: "xxxxxxxxxxxx",
//     api_key: "xxxxxxxxxxxxxx",
//     api_secret: "xxxxxxxxxxxxxxxxxxxxx"
// })


// const uploadOnCloudinary = async (localFilePath) => {
//     try {

//         if (!localFilePath) return null

//         // upload the file on cloudinary

//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })

//         // file has been uploaded sucessfully

//         console.log('file is uploaded on sucessfully :-', response.url);
//         fs.unlinkSync(localFilePath)
//         return response

//     } catch (error) {

//         fs.unlinkSync(localFilePath)  // remove the locally saved temporary file as upload operation got failed

//         return null

//     }
// }


// export default uploadOnCloudinary