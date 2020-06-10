const multer = require('multer');
const path = require('path'); //Para universalização de barras \ ou / para win ou mac

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) => {

            ext = path.extname(file.originalname);
            name = path.basename(file.originalname, ext);

            console.log('nome do arquivo true:', file.originalname)

            callback(null, `${name}-${Date.now()}${ext}`);
            //callback(null, file.originalname);
        }
    })
}