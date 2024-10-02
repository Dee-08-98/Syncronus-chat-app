import React, { useContext, useEffect, useState } from 'react';
import { Holder } from '../ContextProvider/ContextApp';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

function Profile(props) {
    const { loginData, setLoginData } = useContext(Holder)
    const [loginid, setLoginId] = useState(null)


    const [bio, setBio] = useState('')
    const [img, setImg] = useState("")

    const navigate = useNavigate()


    useEffect(() => {
        setLoginId(loginData.id)
    }, [loginData])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        console.log(file);
        if (file) {
            const imageurl = URL.createObjectURL(file);
            setImg(imageurl);

        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:4556/api/user/profile/${loginid}`, { img, bio })
            .then((res) => {
                toast.success(res.data.message);
                setLoginData(res.data.result)
                navigate('/myprofile')

            })
            .catch((err) => {
                console.log("profile page setup error", err);
            })
    }

    return (
        <>

            {
                loginData && <div className=" font-serif text-white h-screen w-full bg-gray-700 flex justify-center items-center">
                    <div className="h-auto w-[40%] bg-gray-600 shadow-2xl px-5 py-10 ">
                        <h3 className='text-center font-extrabold text-3xl mt-5 mb-5'>Make your Profile</h3>
                        <form >

                            <input
                                type="text"
                                placeholder='Enter bio '
                                onChange={(e) => setBio(e.target.value)}
                                className='mt-4 bg-inherit border-2 border-white outline-none p-2 w-full rounded-2xl font-bold text-lg' />

                            <input
                                type="file"
                                placeholder='Enter bio '
                                accept='image/*'
                                onChange={handleImageChange}
                                className='mt-4 bg-inherit border-2 border-white outline-none p-2 w-full rounded-2xl font-bold text-lg' />

                            <button
                                onClick={handleSubmit}
                                className='text-xl bg-red-600 w-full mt-4 rounded-xl p-2'> Save IT </button>

                        </form>
                    </div>


                </div>
            }



        </>
    );
}

export default Profile;




// import React, { useContext, useEffect, useState } from 'react';
// import { Holder } from '../ContextProvider/ContextApp';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// function Profile(props) {
//     const { loginData, setLoginData } = useContext(Holder);
//     const [loginid, setLoginId] = useState(null);
//     const [bio, setBio] = useState('');
//     const [img, setImg] = useState("");
//     const [loading, setLoading] = useState(false); // New state for loading
//     const [imagePreview, setImagePreview] = useState(null); // New state for image preview

//     const navigate = useNavigate();

//     useEffect(() => {
//         setLoginId(loginData.id);
//     }, [loginData]);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const imageurl = URL.createObjectURL(file);
//             setImg(file); // Save the actual file object
//             setImagePreview(imageurl); // Set image preview URL
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true); // Set loading to true when submitting
//         const formData = new FormData();
//         formData.append('img', img); // Append file object
//         formData.append('bio', bio);

//         try {
//             const res = await axios.put(`http://localhost:4556/api/user/profile/${loginid}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data', // Important for file uploads
//                 },
//             });
//             toast.success(res.data.message);
//             setLoginData(res.data.result);
//             navigate('/myprofile');
//         } catch (err) {
//             console.log("Profile update error", err);
//             toast.error("Profile update failed");
//         } finally {
//             setLoading(false); // Set loading to false after request
//         }
//     };

//     return (
//         <>
//             {
//                 loginData && (
//                     <div className="font-serif text-white h-screen w-full bg-gray-700 flex justify-center items-center">
//                         <div className="h-auto w-[40%] bg-gray-600 shadow-2xl px-5 py-10">
//                             <h3 className='text-center font-extrabold text-3xl mt-5 mb-5'>Make your Profile</h3>
//                             <form onSubmit={handleSubmit}>

//                                 <input
//                                     type="text"
//                                     placeholder='Enter bio'
//                                     onChange={(e) => setBio(e.target.value)}
//                                     value={bio}
//                                     className='mt-4 bg-inherit border-2 border-white outline-none p-2 w-full rounded-2xl font-bold text-lg'
//                                 />

//                                 <input
//                                     type="file"
//                                     accept='image/*'
//                                     onChange={handleImageChange}
//                                     className='mt-4 bg-inherit border-2 border-white outline-none p-2 w-full rounded-2xl font-bold text-lg'
//                                 />

//                                 {imagePreview && (
//                                     <div className="mt-4 text-center">
//                                         <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-full" />
//                                     </div>
//                                 )}

//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className={`text-xl bg-red-600 w-full mt-4 rounded-xl p-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 >
//                                     {loading ? 'Saving...' : 'Save IT'}
//                                 </button>

//                             </form>
//                         </div>
//                     </div>
//                 )
//             }
//         </>
//     );
// }

// export default Profile;
