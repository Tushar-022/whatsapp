import { Server } from "socket.io";

const io = new Server(9000, {
    cors: {
        origin: '*'
    }
})

let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}


    io.on('connection',(socket)=>{
    console.log('user connected');


//     // connect
        socket.on("addUsers", userData => {
            addUser(userData, socket.id);
            io.emit("getUsers", users);
        })

          socket.on('sendMessage', (data) => {
        const user = getUser(data.receiverId);

       // console.log(user.socketId)
    
       if (user && user.socketId) {
            io.to(user.socketId).emit('getMessage', data);
       } else {
           console.log('User not found or user.socketId is undefined');
       }
    })


    });
