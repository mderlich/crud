// ************ Require's ************
const express = require('express');
const router = express.Router();

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
router.get('/create/', create); 
router.post('/', store);        /* <<============= */


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edit); 
router.put('/:id', update);     /* <<============= */

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', destroy); /* <<============= */

/*** GET ONE PRODUCT ***/ 
router.get('/api/:id', detailApi); 

/*** GET ONE PRODUCT ***/ 
router.get('/:id/', detail); 




module.exports = router;
