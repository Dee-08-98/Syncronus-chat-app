import React, { useContext, useEffect } from 'react';
import { Holder } from '../ContextProvider/ContextApp';

function MychatSidebar(props) {

    const { selectedChat } = useContext(Holder)
    // console.log(selectedChat);

    const id = localStorage.getItem('myid');


    const filter = selectedChat && selectedChat.users ? selectedChat.users.filter((item) => {
        return item._id !== id
    }) : selectedChat.result.users.filter((item) => {
        return item._id !== id
    })


    console.log(selectedChat);


    return (
        <>
            <div className="w-full">
                <h3 className='font-extrabold text-[36px] text-center text-teal-400 '> My Chats </h3>
                <div className="mt-10 px-2">
                    {
                        filter && filter.map((item) => (

                            <div key={item._id} className="h-auto  pl-5 p-2 rounded-lg flex items-center mt-2 hover:bg-emerald-600">
                                <div className="h-10 w-10 rounded-full border-4 border-red-600 flex justify-center items-center ">
                                    {/* <img src={item.img} alt="img" className='h-full w-full rounded-full' /> */}
                                    <h3 className='  text-white font-bold text-xl ' >{item.name.split('')[0].toUpperCase()}</h3>

                                </div>
                                <div className="h-10 flex items-center ml-5">
                                    <h3 className='font-extrabold text-xl'>{item.name}</h3>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default MychatSidebar;