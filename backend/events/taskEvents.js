


const userSockets = new Map()

export const initializeSocketEvents = (io)=>{
    io.on("connection" , (socket)=>{
        console.log(`client connected : ${socket.id}`)
        socket.on('authenticate' , (userId)=>{
            if(userId){
                userSockets.set(userId,socket.id)
                socket.userId = userId
                 console.log(`User ${userId} authenticated on socket ${socket.id}`)
            }
        })

        socket.on("deconcete" , ()=>{
            if(socket.userId){
                userSockets.delete(socket.userId)
                console.log(`User ${socket.userId} disconnected`)
            }
        })

        socket.on("error" , (error)=> {
            console.error("Socket error:", error)
        })
    })
}

export const emitTaskCreated = (io, userId, task) => {
  const socketId = userSockets.get(userId.toString())

  if (socketId) {
    io.to(socketId).emit("task:created", {
      type: "success",
      message: "New task created successfully",
      task,
      timestamp: new Date().toISOString(),
    })
    console.log(`Task created notification sent to user ${userId}`)
  }
}

