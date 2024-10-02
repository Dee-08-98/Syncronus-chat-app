import React, { useContext, useState } from 'react';
import { Holder } from '../ContextProvider/ContextApp';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GroupChatSidebar(props) {

    const { selectedChat , setGroup } = useContext(Holder)

    // console.log(selectedChat);

    // ========================Modal===================================

    const [groupChatName, setGroupChatName] = useState("")
    const [searchResult, SetSearchResult] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    // const [search, setSearch] = useState("")

    const token = localStorage.getItem('authToken');
    const id = localStorage.getItem('myid');

    const configure = {
        "Content-Type": "Application/Json",
        headers: {
            Authorization: `bearer ${token}`
        }
    }

    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    };

    const navigate = useNavigate()


    const handleDeleteGroup = async(e) => {

        e.preventDefault()

        try {

            const { data } = await axios.post('http://localhost:4556/api/user/group/remove', {
                "groupID": selectedChat.result[0]._id,
              
            }, configure)

            console.log(data);
            toast.success(data.message)
            // setGroupChatName(" ")
            setGroup(data.DeleteGroupChat)
            navigate('/')

        } catch (error) {

            console.log('Group delete error :- ', error);
        }
       

    }

    const handleRenameGroup = async (e) => {
        e.preventDefault()
        // console.log(groupChatName);

        if (!groupChatName) {
            toast.error("Group Name fields are required")
        }

        try {

            const { data } = await axios.post('http://localhost:4556/api/user/group/rename', {
                "groupID": selectedChat.result[0]._id,
                "groupName": groupChatName.trim()
            }, configure)

            console.log(data);
            toast.success(data.message)
            // setGroupChatName(" ")
            setGroup(data.renameGroupChat)
            setSelectedUsers(data.renameGroupChat)

        } catch (error) {

            console.log('Group rename error :- ', error);
        }
       

    }

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

    
    // const handleGroup = (user) => {

    //     if (selectedUsers.includes(user)) {
    //         // toast.warning('User already added ')
    //         alert('user already exist')
    //     }
    //     if (selectedUsers.includes(id)) {
    //         selectedUsers.filter((item) => {
    //             return item._id !== id
    //         })
    //     }

    //     setSelectedUsers([...selectedUsers, user])
    // }

    // const handleDelete = (item) => {
    //     setSelectedUsers(selectedUsers.filter((del) => del._id !== item._id))

    // }


    const handleAdd = async(item)=>{
        // console.log(item);
       
        try {

            const { data } = await axios.post('http://localhost:4556/api/user/group/add', {
                "groupID": selectedChat.result[0]._id,
                "userID":  item
            }, configure)
            // console.log(data);
            setGroup(data.addGroupChat)
            // onclose()
            toast.success(data.message)
            // setSelectedUsers([])
            // setGroupChatName("")
            SetSearchResult([])

        } catch (error) {

            console.log('add user in group error error :- ', error);

        }
    }

    // ======================


    

    // ========================Modal===================================

    return (
        <>
            <div className="w-full">
                <h3 className='font-extrabold text-[36px] text-center text-teal-400 '> My Groups </h3>
                <div className="mt-10 px-2">
                    {
                        selectedChat && selectedChat.result.map((item) => (

                            <div key={item._id} className="h-auto  pl-5 p-2 rounded-lg flex items-center mt-2 hover:bg-emerald-600">

                                <div className="h-10 w-10 rounded-full border-4 border-red-600 flex justify-center items-center ">
                                    {/* <img src={item.img} alt="img" className='h-full w-full rounded-full' /> */}
                                    <h3 className='  text-white font-bold text-xl ' >{selectedChat.result[0].chatName.split('')[0].toUpperCase()}</h3>

                                </div>
                                <div className="h-10 flex items-center ml-5">
                                    <h3 className='font-extrabold text-xl'>{item.chatName}</h3>
                                </div>
                            </div>

                        ))
                    }

                    <div className="">
                        <button data-bs-toggle="modal" data-bs-target="#exampleModalses" className='font-bold text-xl bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg ml-3 text-black mt-3 px-4'>Edit Group</button>

                    </div>

                </div>
            </div>


            {/* ================================model================= */}
            <div className="modal fade text-black" id="exampleModalses" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5  font-extrabold text-2xl text-black" id="exampleModalLabel">{selectedChat ? selectedChat.result[0].chatName : "Suresh paswan "}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div className="h-auto w-auto flex items-center  flex-wrap" >
                                {
                                    selectedChat && selectedChat.result[0].users.map((item) => (
                                        <>
                                            <div className="h-auto w-auto bg-pink-900 p-2 ml-3 mt-3 mb-3 mr-1 rounded-lg " key={item._id}>
                                                <h4 className='text-white font-bold'>{item.name}</h4>
                                            </div>
                                            <div className="h-auto w-auto cursor-pointer bg-rose-600 p-2   rounded-lg " >
                                                <h4 className='text-white font-bold'> X </h4>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>


                            <div >
                                <form className="flex">

                                    <input
                                        type="text"
                                        onChange={(e) => setGroupChatName(e.target.value)}
                                        placeholder='Rename Group'
                                        className='font-bold w-full bg-inherit border-2 border-gray-600 rounded-lg indent-5 py-2 outline-none text-lg' />

                                    <button onClick={handleRenameGroup} className='p-2 px-4 ml-1 font-bold text-lg text-black bg-green-600 hover:bg-green-700 rounded-lg'>Edit</button>
                                </form>

                            </div>

                            <div >
                                <form className="flex mt-4">
                                    <input
                                        type="text"
                                        onChange={(e) => handleSearch(e.target.value)}
                                        placeholder='Add user'
                                        className='font-bold w-full bg-inherit border-2 border-gray-600 rounded-lg indent-5 py-2 outline-none text-lg' />

                                    {/* <button className=' p-2 px-4 ml-1 font-bold text-lg text-black bg-green-600  hover:bg-green-700 rounded-lg' onClick={handleAdd}>Add</button> */}
                                </form>

                            </div>

                            {/* <div className="h-auto w-auto flex items-center  flex-wrap" >
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
                            </div> */}

                            {
                                searchResult.length > 0 ? searchResult.slice(0, 4).map((item) => (

                                    <div key={item._id} onClick={()=>handleAdd(item._id)}className="h-auto w-full cursor-pointer pl-5 p-2 rounded-lg flex items-center mt-2 bg-emerald-500 hover:bg-emerald-600">

                                        <div className="h-10 w-full flex items-center ml-5">
                                            <h3 className='font-bold text-white text-xl' style={{ textShadow: "1px 1px 2px black" }}>{item.name}</h3>
                                        </div>
                                    </div>

                                )) : <h3 className='font-bold text-xl text-black text-center mt-4'> No Result Found </h3>
                            }

                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteGroup}> Delete Group </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default GroupChatSidebar;







// import React, { useContext, useState } from 'react';
// import { Holder } from '../ContextProvider/ContextApp';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function GroupChatSidebar() {
//     const { selectedChat, setGroup } = useContext(Holder);
//     const [groupChatName, setGroupChatName] = useState("");
//     const [searchResult, setSearchResult] = useState([]);
//     const [selectedUsers, setSelectedUsers] = useState([]);
    
//     const token = localStorage.getItem('authToken');
//     const id = localStorage.getItem('myid');
    
//     const configure = {
//         headers: {
//             Authorization: `bearer ${token}`
//         }
//     };
    
//     const config = {
//         headers: {
//             Authorization: `bearer ${token}`
//         }
//     };

//     const navigate = useNavigate();

//     const handleDeleteGroup = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post('http://localhost:4556/api/user/group/remove', {
//                 groupID: selectedChat.result[0]._id,
//             }, configure);

//             toast.success(data.message);
//             setGroup(data.DeleteGroupChat);
//             navigate('/');
//         } catch (error) {
//             console.error('Group delete error:', error);
//         }
//     };

//     const handleRenameGroup = async (e) => {
//         e.preventDefault();
//         if (!groupChatName.trim()) {
//             toast.error("Group Name field is required");
//             return;
//         }

//         try {
//             const { data } = await axios.post('http://localhost:4556/api/user/group/rename', {
//                 groupID: selectedChat.result[0]._id,
//                 groupName: groupChatName.trim()
//             }, configure);

//             toast.success(data.message);
//             setGroup(data.renameGroupChat);
//             setSelectedUsers(data.renameGroupChat.users);
//         } catch (error) {
//             console.error('Group rename error:', error);
//         }
//     };

//     const handleSearch = async (query) => {
//         try {
//             const { data } = await axios.get(`http://localhost:4556/api/user/alluser?search=${query.trim()}`, config);
//             setSearchResult(data.result);
//         } catch (err) {
//             console.error('Search error:', err);
//             setSearchResult([]);
//         }
//     };

//     const handleAdd = async (item) => {
//         try {
//             const { data } = await axios.post('http://localhost:4556/api/user/group/add', {
//                 groupID: selectedChat.result[0]._id,
//                 userID: item
//             }, configure);

//             setGroup(data.addGroupChat);
//             toast.success(data.message);
//             setSearchResult([]);
//         } catch (error) {
//             console.error('Add user error:', error);
//         }
//     };

//     return (
//         <>
//             <div className="w-full">
//                 <h3 className='font-extrabold text-[36px] text-center text-teal-400'>My Groups</h3>
//                 <div className="mt-10 px-2">
//                     {selectedChat && selectedChat.result.map(item => (
//                         <div key={item._id} className="h-auto pl-5 p-2 rounded-lg flex items-center mt-2 hover:bg-emerald-600">
//                             <div className="h-10 w-10 rounded-full border-4 border-red-600 flex justify-center items-center">
//                                 <h3 className='text-white font-bold text-xl'>{item.chatName[0].toUpperCase()}</h3>
//                             </div>
//                             <div className="h-10 flex items-center ml-5">
//                                 <h3 className='font-extrabold text-xl'>{item.chatName}</h3>
//                             </div>
//                         </div>
//                     ))}

//                     <div>
//                         <button data-bs-toggle="modal" data-bs-target="#exampleModalses" className='font-bold text-xl bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg ml-3 text-black mt-3 px-4'>
//                             Edit Group
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Modal */}
//             <div className="modal fade text-black" id="exampleModalses" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5 font-extrabold text-2xl text-black" id="exampleModalLabel">
//                                 {selectedChat ? selectedChat.result[0].chatName : "Group Name"}
//                             </h1>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <div className="h-auto w-auto flex items-center flex-wrap">
//                                 {selectedChat && selectedChat.result[0].users.map(item => (
//                                     <div key={item._id} className="h-auto w-auto bg-pink-900 p-2 ml-3 mt-3 mb-3 mr-1 rounded-lg">
//                                         <h4 className='text-white font-bold'>{item.name}</h4>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div>
//                                 <form className="flex">
//                                     <input
//                                         type="text"
//                                         onChange={(e) => setGroupChatName(e.target.value)}
//                                         placeholder='Rename Group'
//                                         className='font-bold w-full bg-inherit border-2 border-gray-600 rounded-lg indent-5 py-2 outline-none text-lg'
//                                     />
//                                     <button onClick={handleRenameGroup} className='p-2 px-4 ml-1 font-bold text-lg text-black bg-green-600 hover:bg-green-700 rounded-lg'>
//                                         Edit
//                                     </button>
//                                 </form>
//                             </div>

//                             <div>
//                                 <form className="flex mt-4">
//                                     <input
//                                         type="text"
//                                         onChange={(e) => handleSearch(e.target.value)}
//                                         placeholder='Add user'
//                                         className='font-bold w-full bg-inherit border-2 border-gray-600 rounded-lg indent-5 py-2 outline-none text-lg'
//                                     />
//                                 </form>
//                             </div>

//                             {searchResult.length > 0 ? (
//                                 searchResult.slice(0, 4).map(item => (
//                                     <div key={item._id} onClick={() => handleAdd(item._id)} className="h-auto w-full cursor-pointer pl-5 p-2 rounded-lg flex items-center mt-2 bg-emerald-500 hover:bg-emerald-600">
//                                         <div className="h-10 w-full flex items-center ml-5">
//                                             <h3 className='font-bold text-white text-xl' style={{ textShadow: "1px 1px 2px black" }}>{item.name}</h3>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <h3 className='font-bold text-xl text-black text-center mt-4'>No Result Found</h3>
//                             )}
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             <button type="button" className="btn btn-danger" onClick={handleDeleteGroup}>Delete Group</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default GroupChatSidebar;
