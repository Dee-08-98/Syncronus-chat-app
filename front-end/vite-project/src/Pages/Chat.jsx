

import React, { useContext, useState } from 'react';
import Wraped from '../WraperComponent/Wraped';
import MessageHeader from '../Components/MessageHeader';
import MessageContaoner from '../Components/MessageContaoner';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Holder } from '../ContextProvider/ContextApp';

function Chat(props) {

    // =============================Logout========================================

    const navigate = useNavigate()
    const { setLoginData, setUser, setSelectedToken, setGroup } = useContext(Holder)

    const logoutFunc = async () => {
        const token = localStorage.getItem('authToken');
        // console.log(token);


        try {

            const res = await fetch('http://localhost:4556/api/user/logout', {
                method: "POST",
                "Content-Type": "Application/Json",
                headers: {
                    Authorization: `bearer ${token}`
                }
            })

            const result = await res.json();

            if (result.message === "Logout successful") {
                toast.success(result.message);
                localStorage.removeItem('authToken');
                navigate('/login')
                setUser(false)
                setLoginData(null)
                setSelectedToken(null)
            }

        } catch (error) {

            console.log('logout error :- ', error);

        }
    }

    // =============================Logout========================================


    // =============================Modal========================================

    const [groupChatName, setGroupChatName] = useState("")
    const [searchResult, SetSearchResult] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    // const [search, setSearch] = useState("")


    const token = localStorage.getItem('authToken');
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    };

    const handleSearch = (query) => {
        axios.get(`http://localhost:4556/api/user/alluser?search=${query.trim()}`, config)
            .then((res) => {
                // console.log(res.data.result);
                SetSearchResult(res.data.result)
            })
            .catch((err) => {
                console.log('Group Chat Error :- ', err);
                SetSearchResult([])
            })

    }

    const id = localStorage.getItem('myid');

    const handleGroup = (user) => {

        if (selectedUsers.includes(user)) {
            toast.warning('User already added ')
        }
        if (selectedUsers.includes(id)) {
            selectedUsers.filter((item) => {
                return item._id !== id
            })
        }

        setSelectedUsers([...selectedUsers, user])
    }

    const handleDelete = (item) => {
        setSelectedUsers(selectedUsers.filter((del) => del._id !== item._id))

    }

    const configure = {
        "Content-Type": "Application/Json",
        headers: {
            Authorization: `bearer ${token}`
        }
    }

    const handleSubmit = async () => {

        if (!groupChatName || !selectedUsers) {
            toast.error("All fields are required")
        }

        try {

            const { data } = await axios.post('http://localhost:4556/api/user/group', {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id))
            }, configure)
            // console.log(data.groupChat);
            setGroup(data.groupChat)
            // onclose()
            toast.success(data.message)
            setSelectedUsers([])
            // setGroupChatName("")
            SetSearchResult([])

        } catch (error) {

            console.log('access chat error :- ', error);

        }

    }

    // console.log(selectedUsers);

    // =============================Modal========================================


    return (
        <>
            <div className="h-screen font-serif">
                <div className="hidden sm:block">
                    <div className="bg-red-500 h-[10vh] rounded-lg flex items-center justify-evenly">
                        <div className="flex items-center justify-center h-[10vh]">
                            <button className='font-bold text-lg font-serif text-gray-900 underline' data-bs-toggle="modal" data-bs-target="#exampleModal">Create Group</button>
                        </div>
                        <div className="flex items-center justify-center h-[10vh]">
                            <Link to={'/myprofile'}>
                                <button className='font-bold text-lg text-gray-900 underline'>Profile</button>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center h-[10vh]">
                            <button className='font-bold text-lg text-gray-900 underline' onClick={logoutFunc}>Logout</button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-[85vh]">
                        <h3 className='font-extrabold text-[30px] md:text-[40px] text-amber-500' style={{ textShadow: "1px 1px 1px white" }}>Syncronus chat app</h3>
                    </div>
                </div>
                <div className="block sm:hidden bg-black">
                    <Sidebar />
                </div>


            </div>


            {/* ============modal================ */}
            <div className="modal fade font-serif" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 font-extrabold text-black text-xl" id="exampleModalLabel"> Create Group Chat </h1>
                            <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>

                                <input
                                    type="text"
                                    onChange={(e) => setGroupChatName(e.target.value)}
                                    placeholder='Group Name'
                                    className='font-bold w-full bg-inherit border-2 border-gray-600 rounded-lg indent-5 py-2 outline-none text-lg' />
                                <input
                                    type="text"
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder='Select User eg: John , Piyush , Jane'
                                    className=' mt-3 font-bold w-full bg-inherit border-2 border-gray-600  rounded-lg indent-5 py-2 outline-none text-lg' />

                            </form>

                            <div className="h-auto w-auto flex items-center  flex-wrap" >
                                {
                                    selectedUsers.map((item) => (
                                        <>
                                            <div className="h-auto w-auto bg-indigo-600 p-2 ml-3 mt-3 mb-3 mr-1 rounded-lg " key={item._id}>
                                                <h4 className='text-white font-bold'>{item.name}</h4>
                                            </div>
                                            <div className="h-auto w-auto cursor-pointer bg-rose-600 p-2   rounded-lg " onClick={() => handleDelete(item)}>
                                                <h4 className='text-white font-bold'> X </h4>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>


                            {
                                searchResult.length > 0 ? searchResult.slice(0, 4).map((item) => (

                                    <div key={item._id} onClick={() => handleGroup(item)} className="h-auto w-full cursor-pointer pl-5 p-2 rounded-lg flex items-center mt-2 bg-emerald-500 hover:bg-emerald-600">

                                        <div className="h-10 w-full flex items-center ml-5">
                                            <h3 className='font-bold text-white text-xl' style={{ textShadow: "1px 1px 2px black" }}>{item.name}</h3>
                                        </div>
                                    </div>

                                )) : <h3 className='font-bold text-xl text-black text-center mt-4'> No Result Found </h3>
                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}> Create Group </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Wraped()(Chat);
