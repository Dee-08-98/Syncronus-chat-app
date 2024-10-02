import React from 'react';
import ReactScrollToBottom from 'react-scroll-to-bottom'
import { sameSenderMargin, sameUser } from '../Pages/Constant';
function GroupMessage({ messages }) {
    const userID = localStorage.getItem('myid');
    // console.log(messages);
    return (
        <>
            <ReactScrollToBottom className='h-full w-full'>

                {
                    messages && messages.map((m, i) => (
                        <div className="flex" key={m._id}>

                            <span style={{ backgroundColor: `${m.sender._id === userID ? "#BEE3F2" : "#B9F5D0"}`, borderRadius: "20px", padding: "8px 15px", maxWidth: "75%", marginLeft: sameSenderMargin(messages, m, i, userID), marginTop: sameUser(messages, m, i) ? 3 : 10 }} className='text-black'>{m.content}</span>
                        </div>
                    ))
                }

            </ReactScrollToBottom>

        </>
    );
}

export default GroupMessage;