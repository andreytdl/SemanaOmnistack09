const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        console.log(spot_id);

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user]; //Procurando se o dono do spot está logado atualmente
        if(ownerSocket) {
            console.log('Opa');
            req.io.to(ownerSocket).emit('booking_request', booking)
            console.log('Meu rei');
        }

        return res.json(booking);
    }
}