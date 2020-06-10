const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId, //Aquele Id retornado no get - será utilizado como referência para obter outras informações
        ref: 'User' //Sobre qual Model estamos fazendo a referência
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId, //Aquele Id retornado no get - será utilizado como referência para obter outras informações
        ref: 'Spot' //Sobre qual Model estamos fazendo a referência
    }
});

module.exports = mongoose.model('Booking', BookingSchema);