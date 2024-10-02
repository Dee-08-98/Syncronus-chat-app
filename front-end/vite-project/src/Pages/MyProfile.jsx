import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function MyProfile() {
    const [mydata, setMydata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const id = localStorage.getItem('myid');

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:4556/api/user/myprofile/${id}`)
                .then((res) => {
                    setMydata(res.data.result);
                    // console.log(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("Profile page setup error", err);
                    setError("Failed to fetch profile data");
                    setLoading(false);
                });
        } else {
            setError("User ID not found");
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div className="h-screen font-serif w-full flex justify-center items-center"><div className='font-bold text-2xl '>Loading...</div></div>
    }

    if (error) {
        return <div className="h-screen font-serif w-full flex justify-center items-center"><div className='font-bold text-2xl '>{error}</div></div>
    }

    if (!mydata) {
        return <div className="h-screen font-serif w-full flex justify-center items-center"><div className='font-bold text-2xl '> No profile data available</div></div>
    }

    return (

        <div className="h-screen font-serif w-full overflow-y-scroll md:flex md:justify-center md:items-center bg-gray-900">
            <div className=" bg-gray-800 h-auto  w-full md:w-[80%] lg:w-[60%]   md:flex md:justify-center md:items-center md:rounded-3xl py-10 ">
                <div className="w-full h-auto py-5    flex justify-center items-center">
                    
                    <div className="h-48 w-48 rounded-full border-4 border-red-600 flex justify-center items-center ">
                        {/* <img src={item.img} alt="img" className='h-full w-full rounded-full' /> */}
                        <h3 className='  text-white font-bold text-[95px] ' >{mydata.name.split('')[0].toUpperCase()}</h3>

                    </div>
                </div>
                <div className="w-full h-auto sm:px-16 md:px-3  px-5 flex-wrap ">
                    <h3 className='text-green-400 font-bold text-2xl mt-3'> Name :-
                        <span className='text-white font-bold text-[19px]'> {mydata.name} </span>
                    </h3>
                    <h3 className='text-green-400 font-bold text-2xl mt-3'> Email :-
                        <span className='text-white font-bold text-[19px]'> {mydata.email} </span>
                    </h3>
                    <h3 className='text-green-400 font-bold text-2xl mt-3'> Bio :-
                        <span className=' text-white font-bold text-[19px]'> {mydata.bio} </span>
                    </h3>

                    <Link to='/'><button className='mt-5 p-2 text-[19px] text-black font-bold bg-yellow-600 rounded-2xl w-full outline-none'>Go To Dashboard</button></Link>

                </div>
            </div>
        </div>
    );
}

export default MyProfile;




