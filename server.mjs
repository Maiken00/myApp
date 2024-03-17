import express from 'express';
import USER_API from './routes/userRoute.mjs';
import dotenv from 'dotenv';
import LOGIN_API from './routes/LoginRoute.mjs';
import POST_API from './routes/postRoute.mjs';
import ejs from 'ejs';



dotenv.config();

const server = express();

const port = (process.env.PORT || 8080);
server.set('port', port);

server.set('view engine', 'ejs');
server.set('views', './views'); 

// sender en request (get), får en response (yoyoyo), og så next 
//server.get("/", (req, res, next) => {
  //  res.send("yoyoyo")
//});

server.use(express.static('public'));

// Telling the server to use the USER_API (all urls that uses this code will have to have the /user after the base address)
server.use("/users", USER_API);
server.use("/login", LOGIN_API);
server.use("/todo", POST_API);

server.listen(server.get('port'), function () {
    console.log('server up and running', server.get('port'));
});