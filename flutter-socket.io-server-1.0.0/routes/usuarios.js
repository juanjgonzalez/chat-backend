/**
 path: api/usuarios
 */


 const {Router}  = require ('express');
const { renewToken } = require('../controllers/auth');

 const { validarJWT } = require('../middlewares/validar-jwt');
 const { getUsuarios} = require('../controllers/usuarios');


 const router = Router();
 
 
 router.get('/renew',validarJWT, getUsuarios);
 
 module.exports = router;