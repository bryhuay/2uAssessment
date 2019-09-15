const express = require('express');
const router = express.Router();


const Invoice = require('../controllers/invoiceController');

//router.get('/find',Invoice.find);
//router.post('/update',Invoice.update);
//router.post('/delete',Invoice.delete);
router.get('/',Invoice.show);
router.post('/',  Invoice.create);
router.post('/changeStatus',  Invoice.changeStatu);


module.exports = router;