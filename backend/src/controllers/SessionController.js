//index, show(only one), store(create), update, destroy
//Por padrões de MVC apenas esses métodos seerão necessários

const User = require('../models/User');
module.exports = {
    //Listar sessões
    //async é necessário pois dentro da função existe awayt
    async store(req, res){
        const email = req.body.email;
        
        let user = await User.findOne( { email }) //O nome do campo é igual ao da variavel acima, portanto "{}"

        if(!user){
            //Colocar o Await aqui significa pedir para o programa só prosseguir para a proxima linha depois que tiver concluído esse
            const user = await User.create({ email });
            return res.json(user);
        }

        return res.json(user);

    }
}