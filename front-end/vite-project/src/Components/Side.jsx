


import React, { useContext, useEffect, useState } from 'react';
import b6 from '../assets/b6.jpeg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Holder } from '../ContextProvider/ContextApp';



function Side(props) {
    const [search, setSearch] = useState("");
    const [userData, setUserData] = useState([]);
    const [searchData, setSearchData] = useState([]);

    const token = localStorage.getItem('authToken');
    // console.log(token);
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    };

    const navigate = useNavigate()

    const id = localStorage.getItem('myid');

    const { setSelectedChat, group, setGroup , setOurGroup } = useContext(Holder)
    // console.log(selectToken);

    useEffect(() => {
        axios.get("http://localhost:4556/api/user/getalluser", config)
            .then((res) => {

                const filter = res.data && res.data.result.filter((item) => item._id !== id)

                setUserData(filter);
                setSearchData(filter); // Initialize searchData with fetched data
                // console.log(res.data);


            })
            .catch((err) => {
                console.log('User fetching error :- ', err);
            });
    }, []);

    useEffect(() => {
        searchCategories();
    }, [search,]);

    const searchCategories = () => {
        if (search.trim() === "") {
            // If search is empty, reset searchData to all users
            setSearchData(userData);
        } else {
            // Filter users based on search term
            const filtered = userData.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            setSearchData(filtered);
        }
    };


    const accessChat = async (ID) => {


        const configure = {
            "Content-Type": "Application/Json",
            headers: {
                Authorization: `bearer ${token}`
            }
        }
        // console.log(userID);

        try {

            const { data } = await axios.post('http://localhost:4556/api/user/accessChat', { "userID": ID }, configure)
            // console.log(data);
            setSelectedChat(data)
            navigate('/mychat')

        } catch (error) {

            console.log('access chat error :- ', error);

        }

    }

    // Determine if search term is present
    const isSearching = search.trim() !== "";

    // =========================group=================================

    const [mygroup, setmyGroup] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4556/api/user/group/all", config)
            .then((res) => {

                // console.log('mygroup :- ',res.data);
                setmyGroup(res.data.result)
                // console.log(res.data.result);

            })
            .catch((err) => {
                console.log('group fetching error :- ', err);
            });
    }, [group]);


    const groupFunc = async (id) => {

        const configure = {
            "Content-Type": "Application/Json",
            headers: {
                Authorization: `bearer ${token}`
            }
        }

        setOurGroup(id)
        try {

            const { data } = await axios.post('http://localhost:4556/api/user/group/one', { "groupID": id }, configure)
            console.log(data);
            setSelectedChat(data)
            navigate('/groupChat')

        } catch (error) {

            console.log('access specific group error :- ', error);

        }
    }





    // console.log(group);

    // =========================group=================================


    return (
        <>
            <div className="h-screen w-full overflow-y-auto bg-black text-white font-serif pb-3">
                <div className="mt-3">
                    <div className="text-center font-bold text-3xl text-yellow-500" style={{ textShadow: "1px 1px 2px white" }}>Syncronus</div>
                </div>

                <div className="mt-5 px-2">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder='Search'
                        className='outline-none border-2 border-white font-bold text-lg bg-inherit w-full py-2 indent-2 rounded-lg'
                    />
                </div>

                <div className="mt-10 px-2">
                    {isSearching ? (
                        searchData.length > 0 ? (
                            searchData.map((item) => (
                                <NavLink onClick={() => accessChat(item._id)} key={item._id} className="h-auto cursor-pointer pl-5 p-2 rounded-lg flex items-center mt-2 hover:bg-emerald-600">
                                    <div className="h-10 w-10 rounded-full border-4 border-red-600 text-center">
                                        {/* <img src={item.img} alt="img" className='h-full w-full rounded-full' /> */}
                                        <div className='h-full w-full rounded-full text-white font-bold text-xl my-auto' >{item.name.split('')[0].toLowerCase()}</div>

                                    </div>
                                    <div className="h-10 flex items-center ml-5">
                                        <h3>{item.name}</h3>
                                    </div>
                                </NavLink>
                            ))
                        ) : (
                            <p className="text-center">No results found</p>
                        )
                    ) : (
                        <>
                            {userData.map((item) => (
                                <NavLink key={item._id} onClick={() => accessChat(item._id)} className="h-auto cursor-pointer pl-5 p-2 rounded-lg flex items-center mt-2 hover:bg-emerald-600">
                                    <div className="h-10 w-10 rounded-full border-4 border-red-600 text-center">
                                        {/* <img src={item.img} alt="img" className='h-full w-full rounded-full' /> */}
                                        <div className='h-full w-full rounded-full text-white font-bold text-xl my-auto' >{item.name.split('')[0].toLowerCase()}</div>

                                    </div>
                                    <div className="h-10 flex items-center ml-5">
                                        <h3>{item.name}</h3>
                                    </div>
                                </NavLink>
                            ))}
                        </>
                    )}

                    {/* Only show groups when not searching */}
                    {!isSearching && mygroup.map((item, index) => (
                        <Link ><div onClick={() => groupFunc(item._id)} key={index} className="h-auto pl-5 p-2 rounded-lg flex items-center mt-2 hover:bg-emerald-600">
                            <div className="h-10 w-10 rounded-full border-4 border-yellow-600 text-center">
                                {/* <img src={item.img} alt="img" className='h-full w-full rounded-full' /> */}
                                <div className='h-full w-full rounded-full text-white font-bold text-xl my-auto' >{item.chatName.split('')[0].toLowerCase()}</div>

                            </div>
                            <div className="h-10 flex items-center ml-5">
                                <h3>{item.chatName}</h3>
                            </div>
                        </div></Link>
                    ))}
                </div>

                <div className="mt-5 px-2 block sm:hidden">
                    <div className="h-auto pl-5 p-2 rounded-lg flex items-center mt-2 hover:bg-emerald-600">
                        <div className="h-10 w-10 rounded-full bg-red-400">
                            <img src={b6} alt="img" className='h-full w-full rounded-full' />
                        </div>
                        <div className="h-10 flex items-center ml-5">
                            <h3>Profile</h3>
                        </div>
                    </div>

                    <div className="h-auto pl-5 p-2 rounded-lg cursor-pointer flex items-center mt-2 hover:bg-emerald-600">
                        <div className="h-10 w-10 rounded-full bg-red-400">
                            <img src={b6} alt="img" className='h-full w-full rounded-full' />
                        </div>
                        <div className="h-10 flex items-center ml-5">
                            <h3>Logout</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Search here usssss</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default Side;
