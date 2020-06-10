const express = require('express');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const multer = require('multer');
const uploadConfig = require('./config/upload');

const upload = multer(uploadConfig);


routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;

//Rota do usuário (A partir do 3333)  
//GET, POST, PUT, DELETE
routes.get('/', (req, res) => {
    //Obtendo um Json(body)
    //return res.json(req.body);

    //req.query = acessar query params (get)
    //req.params = acessar route params (para edição, delete)
    //req.body = json - Create
    //Caso queira mostrar algo no front:
    return res.send('Hello World') // -> Pra saber se esta respondendo
    //-----------------------------------
    //Caso queira enviar algo para o front
    //return res.json({message: 'Hey World'});
    //-----------------------------------
    //Obtendo do Get
    //return res.send({idade: req.query.idade})
    //-----------------------------------
    // -> JSON - JavaScript Object Notation (Estamos enviando um objeto)
});