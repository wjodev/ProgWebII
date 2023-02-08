var express = require('express');
var router = express.Router();

const ImovelController =require('../controllers/ImovelController')

router.get('/cadastro', ImovelController.cadastroImovel)
router.post('/salvarImovel', ImovelController.salvarImovel)
router.get('/listaimoveis', ImovelController.listarImoveis)
router.post('/deletarImovel', ImovelController.deletarImovel)
router.post('/editarImovel', ImovelController.editarImovel)
router.post('/editarImovelPost', ImovelController.editarImovelPost)



module.exports = router;
