
import axios from 'axios';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Holder } from '../ContextProvider/ContextApp';
import ChatMessage from './ChatMessage';
import io from 'socket.io-client';

const EndPoint = 'http://localhost:4556/';

function MessageContainer(props) {
    const socket = useMemo(() => io(EndPoint), []);
    const userID = localStorage.getItem('myid');
    const { selectedChat } = useContext(Holder);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);

    const token = localStorage.getItem('authToken');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const conf = {
        headers: {
            Authorization: `bearer ${token}`
        }
    };

    const myiddd = selectedChat.users.filter((item) => item._id !== userID);
    const [{ _id }] = myiddd;

    const sendMessage = async (e) => {
        if (e.key === 'Enter' && newMessage.trim()) {
            e.preventDefault();
            try {
                setNewMessage('');

                const { data } = await axios.post(
                    'http://localhost:4556/api/user/message',
                    {
                        content: newMessage,
                        chatID: selectedChat._id,
                    },
                    config
                );
                fetchingAllChats();

                setMessages([...messages, data.result]);

                socket.emit('newMessage', data.result);

            } catch (error) {
                console.error('Message sending error:', error);
            }
        }
    };

    const fetchingAllChats = async () => {
        // console.log(selectedChat);
        try {
            setNewMessage('');

            const { data } = await axios.get(
                `http://localhost:4556/api/user/message/${selectedChat._id}`,
                conf
            );

            setMessages(data.result);

            socket.emit('joinChat', _id);

        } catch (error) {
            console.error('Message fetching error:', error);
        }
    };

    useEffect(() => {
        fetchingAllChats();
    }, [selectedChat]);

    useEffect(() => {
        socket.on('connect', () => {
            // console.log(socket.id, 'Socket connected');   
        });

        socket.emit('setup', userID);
        socket.on('connected', () => {
            setSocketConnected(true);
        });

        socket.on('typing', () => setIsTyping(true));
        socket.on('stopTyping', () => setIsTyping(false));

        return () => {
            socket.off('connected');
            socket.off('typing');
            socket.off('stopTyping');
            socket.off('messageReceived');
        };
    }, [socket]);

    useEffect(() => {
        socket.on('messageReceived', (newMessageReceived) => {
            setMessages([...messages, newMessageReceived]);
        });

        return () => {
            socket.off('messageReceived');
        };
    }, [messages, socket]);

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;
        if (!typing) {
            setTyping(true);
            socket.emit('typing', _id);
        }

        const lastTypingTime = new Date().getTime();
        const timerLength = 3000;

        setTimeout(() => {
            const timeNow = new Date().getTime();
            const timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit('stopTyping', _id);
                setTyping(false);
            }

        }, timerLength);
    };

    return (
        <div className="h-[90vh] w-full ">
            <div className="h-[80vh] py-8">
                <ChatMessage messages={messages} />
                {isTyping ? (
                    <div className='text-green-300 font-bold text-lg mb-3' style={{textShadow:"1px 1px 2px black"}}>Typing...</div>
                ) : ""}
            </div>
            <div className="h-[10vh] w-full flex justify-center items-center px-3">
                <div className="h-[10vh] font-serif w-full bg-gray-900 rounded-lg flex items-center ">
                    <form onSubmit={(e) => e.preventDefault()} className='w-full'>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={typingHandler}
                            onKeyDown={sendMessage}
                            placeholder="Write Message"
                            className="placeholder-white-700 font-bold bg-inherit py-2 w-full outline-none rounded-lg indent-5"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MessageContainer;
