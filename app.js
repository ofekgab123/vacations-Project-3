const PORT = process.env.Port || 3001;
globalThis.config = require(process.env.NODE_ENV === "production"
? "./configs/config-prod.json"
: "./configs/config-dev.json");
const express = require('express');
const server = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const socket = require('socket.io')
const socketIO = require('socket.io');
const registerController = require('./controller/register-controller');
const loginController = require('./controller/login-controller');
const vacationController = require('./controller/vacation-controller');
const vacationsLogic = require('./business-logic/vacation-logic');
const path = require('path');
const { response } = require('express');

server.use(fileUpload());
server.use(cors());
server.use(express.json());

server.use(express.static(path.join(__dirname,"./frontend")));


if (!fs.existsSync('./frontend/public/assets/images/vacations')) {
    fs.mkdirSync('./frontend/public/assets/images/vacations');
}

server.use('/api/register', registerController);
server.use('/api/login', loginController);
server.use('/api/vacations', vacationController);


server.use("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./frontend/index.html"))
})
const expressListener = server.listen(PORT, () => console.log('server up'));
const socketIOServer = socketIO(expressListener);
socketIOServer.sockets.on("connection", async socket => {
    socket.on('get-all-vacations', async () => {
        socketIOServer.sockets.emit("get-all-vacations", await vacationsLogic.getAllVacations());
    });
    socket.on("msg-from-client", msg => console.log(socket.id + ": " + msg));
});