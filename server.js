const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const path = require('path');
const socketIO = require('socket.io');
const cors = require('cors');
var allowedOrigins = "https://infinite-castle-27081.herokuapp.com/:*";
// const io = socketIO(server);
const io = socketIO(server, {origins:allowedOrigins}).listen(server)

// io.configure(function () { 
    // io.set("transports", ["xhr-polling"]); 
    // io.set("polling duration", 10); 
//   }); 
  

const port = process.env.PORT || 3000;


app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => console.log(`Listening on port ${port}`))

io.on('connection', socket => {
    console.log('new connection: ' + socket.id);
    
    io.to(socket.id).emit('socket_id', socket.id);
    
    socket.on('initial_info', info =>{
        console.log(info)
        let target = info.enemy_id;
        io.to(target).emit('initial_info_from_server', info)
    })

    socket.on('moves_from_client', info =>{
        console.log(info)
        let target = info.enemy_id;
        io.to(target).emit('moves_from_server', info)
    })
})
