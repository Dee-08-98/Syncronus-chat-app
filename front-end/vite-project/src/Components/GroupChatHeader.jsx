import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import b6 from '../assets/b6.jpeg'
import { Holder } from '../ContextProvider/ContextApp';
function GroupChatHeader(props) {

    const { selectedChat } = useContext(Holder)

    // console.log(selectedChat);


    return (
        <>
            <div className="h-full border-b-2 font-serif  border-white w-full flex justify-evenly items-center ">
                <div className="flex items-center ">
                    <div className="h-10 w-10 rounded-full border-4 border-red-600 flex justify-center items-center ">
                        {/* <img src={item.img} alt="img" className='h-full w-full rounded-full' /> */}
                        <h3 className='  text-white font-bold text-xl ' >{selectedChat.result[0].chatName.split('')[0].toUpperCase()}</h3>

                    </div>
                    <h3 className='ml-3 font-bold text-xl'>  {selectedChat ? selectedChat.result[0].chatName : "Suresh paswan "}  </h3>
                </div>
                <div className="">
                    <Link to={'/'}><div className="font-bold text-3xl text-red-600 cursor-pointer"> x </div></Link>
                </div>
            </div>
        </>
    );
}

export default GroupChatHeader;