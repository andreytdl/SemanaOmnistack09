const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail : String,
    company : String,
    price : Number,
    techs : [String], //Array de Strings
    user: {
        type: mongoose.Schema.Types.ObjectId, //Aquele Id retornado no get - será utilizado como referência para obter outras informações
        ref: 'User' //Sobre qual Model estamos fazendo a referência
    }
}, {
    toJSON: {
        virtuals: true,
    },
});

//Para retornar a imagem no frontend
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://192.168.0.87:3333/files/${this.thumbnail}`
}) //Um campo "virtual" do javascript no banco do mongo

module.exports = mongoose.model('Spot', SpotSchema);