import { Server } from "socket.io"

let connection = {}
let messages = {}
let timeOnline = {}

export const connectToSocket = (server) =>{
    const io = new Server(server,{
        cors:{
            origin:"https://zoom-clone-1asu.onrender.com",
            methods:["GET","POST"],
            credentials:true
        }
    });

    io.on("connection", (socket) => {

        socket.on("join-call",(path)=>{
            if(connection[path] === undefined){
                connection[path] = []
            }

            connection[path].push(socket.id)

            timeOnline[socket.id] = new Date();

            for(let a=0; a<connection[path].length; a++){
                io.to(connection[path][a]).emit("user-joined",socket.id,connection[path])
            }

            if(messages[path] !== undefined){
                for(let a = 0; a < messages[path].length; ++a){
                    io.to(socket.id).emit("chat-message",messages[path][a]["data"],
                        messages[path][a]["sender"],messages[path][a]["socket-id-sender"]

                    )
                }
            }
        });

        socket.on("signal",(toId,messages)=>{
            io.to(toId).emit("signal",socket.id,messages);
        })

        socket.on("chat-message",(data,sender)=>{

            const [matchingRoom, found] = Object.entries(connection)
            .reduce(([room, isFound],[roomKey,roomValue])=>{
                if(!isFound && roomValue.includes(socket.id)){
                    return [roomKey,true]
                }
                return [room ,isFound];
            },['',false])

            if(found === true){
                if(messages[matchingRoom] === undefined){
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({"sender" : sender,"data":data,"socket-id-sender": socket.id})

                connection[matchingRoom].forEach((elem)=>{
                    io.to(elem).emit("chat-message",data,sender,socket.id)
                })
            }

        })

        socket.on("disconnect",()=>{

            const diffTime = Math.abs(timeOnline[socket.id] - new Date())

            let key

            for(const [room, person] of JSON.parse(JSON.stringify(Object.entries(connection)))){
                
                for(let a = 0; a<person.length; ++a){

                    if(person[a] === socket.id){

                        key = room;

                        for(let a=0; a<connection[key].length; ++a){
                            if(connection[key][a] !== socket.id){
                                io.to(connection[key][a]).emit("user-left",socket.id)
                            }
                        }

                        let index  = connection[key].indexOf(socket.id)
                        connection[key].splice(index,1)

                        if(connection[key].length === 0){
                            delete connection[key];
                        }
                    }
                
                }
            }

        })

    })

    return io;
}


