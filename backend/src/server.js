//Importando express e o arquivo de rotas
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');//Socketio
const http = require('http');//Socketio


//Express é uma função
const app = express();

const server = http.Server(app);//Socketio
const io = socketio(server);//Socketio


//mongoose.connect('mongodb+srv://ANDREYTORRESAPI:senhasenhaa@omnistack-74rqi.mongodb.net/omnistack?retryWrites=true&w=majority', {
mongoose.connect('mongodb+srv://ANDREYTORRES:senhasenhaa@omnstack10-5pibq.mongodb.net/week10?retryWrites=true&w=majority', {
useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {}; //Não recomendado em uma aplicação em produção

io.on('connection', socket =>{
    const { user_id } = socket.handshake.query;

    console.log('Usuario conectado', socket.id, ' - ', user_id);

    connectedUsers[user_id] = socket.id;

    //-------- Brincando de socket ----------//
    // socket.emit('hello', 'World'); // -> enviando('nome', conteudo)
    // socket.on('omni', (data => { // -> recebendo('nome', dados)
    //     console.log(data);
    // }))

});

app.use((req, res, next) => { //O next irá levar o dado do id
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next(); //Como se fosse um continue para o laço de repetição
})




//Ativando a recepção de Jsons e chamando arquivo de rotas
app.use(cors());
app.use(express.json());

//Indicando ao front o caminho para as imagens
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(routes);

//Porta
// app.listen(3333); //Sem socketio
server.listen(3333); //Com socketio