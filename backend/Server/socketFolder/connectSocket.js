// import { Server } from 'socket.io'

// const connectSocket = (server) => {
//     const io = new Server(server, {
//         cors: {
//             origin: "http://localhost:5173",
//             methods: ["GET", "POST"],
//             credentials: true
//         }
//     })


//     io.on('connection', (socket) => {
//         // console.log('connected backend :-', socket.id);

//         socket.on('setup', (userID) => {
//             // console.log("my user is :- ", userID);
//             socket.join('userID')
//             // console.log(userID);
//             socket.emit('connected' )

//         })

//         socket.on("joinChat", (room) => {
//             socket.join(room)
//             // console.log('user joined room :- ', room);
//         })


//         socket.on('typing', (room) => socket.in(room).emit('typing'))
//         socket.on('stopTyping', (room) => socket.in(room).emit('stopTyping'))


//         socket.on("newMessage", (newMessageReceived) => {
//             // console.log(newMessageReceived);
//             let chat = newMessageReceived.chat

//             // if (!chat.users) return console.log('chat users not defined');

//             chat.users.forEach(user => {
//                 // console.log('line 34 :- ',user._id ,newMessageReceived.sender._id);
//                 if (user._id !== newMessageReceived.sender._id) return
//                 socket.in(user._id).emit("messageReceived", newMessageReceived)
//             })
//         })
//     })
// }

// export default connectSocket;




import { Server } from 'socket.io';

const connectSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        socket.on('setup', (userID) => {
            socket.join(userID);
            socket.emit('connected');
        });

        socket.on('joinChat', (room) => {
            socket.join(room);
        });

        socket.on('typing', (room) => socket.to(room).emit('typing'));
        socket.on('stopTyping', (room) => socket.to(room).emit('stopTyping'));

        socket.on('newMessage', (newMessageReceived) => {
            const chat = newMessageReceived.chat;
            chat.users.forEach(user => {
                if (user._id !== newMessageReceived.sender._id) {
                    socket.to(user._id).emit('messageReceived', newMessageReceived);
                }
            });
        });
    });
};

export default connectSocket;
