// import React, { useContext, useEffect, useState } from 'react';
// import { Holder } from '../ContextProvider/ContextApp';
// import axios from 'axios';
// import GroupMessage from './GroupMessage';

// function GroupChatContainer(props) {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     // const [typing, setTyping] = useState(false);
//     // const [isTyping, setIsTyping] = useState(false);
//     // const [socketConnected, setSocketConnected] = useState(false);
//     const { selectedChat, ourGroup } = useContext(Holder)
//     // console.log(selectedChat.result[0]);
//     // console.log(ourGroup);


//     const token = localStorage.getItem('authToken');
//     const userID = localStorage.getItem('myid');

//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     const conf = {
//         headers: {
//             Authorization: `bearer ${token}`
//         }
//     };

//     // console.log(messages);

//     const sendMessages = async (e) => {
//         if (e.key === 'Enter' && newMessage.trim()) {
//             e.preventDefault();
//             try {
//                 setNewMessage('');

//                 const { data } = await axios.post(
//                     'http://localhost:4556/api/user/message',
//                     {
//                         content: newMessage,
//                         chatID: ourGroup,
//                     },
//                     config
//                 );
//                 // console.log(data.result);
//                 fetchingAllChat()
//                 setMessages([...messages, data.result]);

//                 // socket.emit('newMessage', data.result);

//             } catch (error) {
//                 console.error('Message sending error:', error);
//             }
//         }
//     };

//     const fetchingAllChat = async () => {
//         try {
//             setNewMessage('');

//             const { data } = await axios.get(
//                 `http://localhost:4556/api/user/message/${selectedChat.result[0]._id}`,
//                 conf
//             );

//             console.log('not fetching');
//             // console.log(data.result);

//             setMessages(data.result);

//             // socket.emit('joinChat', _id);

//         } catch (error) {
//             console.error('Message fetching error:', error);
//         }
//     };

//     const typingHandlers = (e) => {
//         setNewMessage(e.target.value);

//         // if (!socketConnected) return;
//         // if (!typing) {
//         //     setTyping(true);
//         //     socket.emit('typing', _id);
//         // }

//         // const lastTypingTime = new Date().getTime();
//         // const timerLength = 3000;

//         // setTimeout(() => {
//         //     const timeNow = new Date().getTime();
//         //     const timeDiff = timeNow - lastTypingTime;

//         //     if (timeDiff >= timerLength && typing) {
//         //         socket.emit('stopTyping', _id);
//         //         setTyping(false);
//         //     }

//         // }, timerLength);
//     };

//     useEffect(() => {
//         fetchingAllChat();
//     }, [selectedChat]);


//     return (
//         <>
//             <div className="h-[90vh] w-full ">
//                 <div className="h-[80vh] py-1 ">
//                     <GroupMessage messages={messages} />
//                 </div>
//                 <div className="h-[10vh] w-full flex justify-center items-center px-3">
//                 <div className="h-[10vh] font-serif w-full bg-gray-900 rounded-lg flex items-center ">
//                     <form onSubmit={(e) => e.preventDefault()} className='w-full'>
//                         <input
//                             type="text"
//                             value={newMessage}
//                             onChange={typingHandlers}
//                             onKeyDown={sendMessages}
//                             placeholder="Write Message"
//                             className="placeholder-white-700 font-bold bg-inherit py-2 w-full outline-none rounded-lg indent-5"
//                         />
//                     </form>
//                 </div>
//             </div>

//             </div>
//         </>
//     );
// }

// export default GroupChatContainer;



import React, { useContext, useEffect, useState } from 'react';
import { Holder } from '../ContextProvider/ContextApp';
import axios from 'axios';
import GroupMessage from './GroupMessage';

function GroupChatContainer(props) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { selectedChat, ourGroup } = useContext(Holder);

    const token = localStorage.getItem('authToken');
    const userID = localStorage.getItem('myid');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
        },
    };

    const conf = {
        headers: {
            Authorization: `bearer ${token}`
        }
    };

    const sendMessages = async (e) => {
        if (e.key === 'Enter' && newMessage.trim()) {
            e.preventDefault();
            try {
                setNewMessage('');

                const { data } = await axios.post(
                    'http://localhost:4556/api/user/message',
                    {
                        content: newMessage,
                        chatID: ourGroup,
                    },
                    config
                );

                // Fetch all chats after sending a message
                fetchingAllChat();
                setMessages(prevMessages => [...prevMessages, data.result]);

            } catch (error) {
                console.error('Message sending error:', error);
            }
        }
    };

    const fetchingAllChat = async () => {
        if (!selectedChat.result || !selectedChat.result[0]?._id) {
            console.error('Invalid chat data');
            return;
        }
        
        try {
            const { data } = await axios.get(
                `http://localhost:4556/api/user/message/${selectedChat.result[0]._id}`,
                conf
            );

            setMessages(data.result);
        } catch (error) {
            console.error('Message fetching error:', error);
        }
    };

    const typingHandlers = (e) => {
        setNewMessage(e.target.value);
    };

    useEffect(() => {
        if (selectedChat && selectedChat.result && selectedChat.result[0]) {
            fetchingAllChat();
        }
    }, [selectedChat,sendMessages]);

    return (
        <>
            <div className="h-[90vh] w-full">
                <div className="h-[80vh] py-1">
                    <GroupMessage messages={messages} />
                </div>
                <div className="h-[10vh] w-full flex justify-center items-center px-3">
                    <div className="h-[10vh] font-serif w-full bg-gray-900 rounded-lg flex items-center">
                        <form onSubmit={(e) => e.preventDefault()} className='w-full'>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={typingHandlers}
                                onKeyDown={sendMessages}
                                placeholder="Write Message"
                                className="placeholder-white-700 font-bold bg-inherit py-2 w-full outline-none rounded-lg indent-5"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GroupChatContainer;
