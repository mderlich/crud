// ************ Require's ************
const express = require('express');
const router = express.Router();
// multer util para imagenes
const multer = require('multer');
const path = require('path');

// ************ Multer Settings ************
// acompaña a la linea de ruta mas adelante...
// router.post('/', upload.single('image'), store);      

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images/products"))
	},
	filename: (req, file, cb) => {
        // Datos propios del 'file' son...
        // fieldname / originalname / encoding / mimetype / destination / filename / path / size
		let nombreImagen = "ximg-" + Date.now() + path.extname(file.originalname);
        cb(null, nombreImagen)
	}
})

var upload = multer({ storage: storage })

// /multer fin --------------------------------


// ************ Controller Require ************
const {
    index,
    detailApiAll,
    create,
    store,
    detail,
    detailApi,
    edit,
    update,
    destroy
} = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
/* Aqui dentro tambien esta... search */
router.get('/', index); 
router.get('/api', detailApiAll); 

/*** CREATE ONE PRODUCT ***/ 
// IMPORTANTE!!! este caso tiene prioridad y debe ir antes de 'GET ONE PRODUCT'
// IMPORTANTE!!! 'image' corresponde al name del input... <input type="file" name="image" id="image" >
router.get('/create/', create); 
router.post('/', upload.single('image'), store);        /* <<============= */

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edit); 
router.put('/:id', upload.single('image'), update);     /* <<============= */

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', destroy); /* <<============= */

/*** GET ONE PRODUCT ***/ 
router.get('/api/:id', detailApi); 

/*** GET ONE PRODUCT ***/ 
router.get('/:id/', detail); 




module.exports = router;
