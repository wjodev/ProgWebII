var express = require('express');
var router = express.Router();

const InquilinoController =require('../controllers/InquilinoController')

router.get('/cadastro', InquilinoController.cadastro)
router.post('/salvar', InquilinoController.salvar)
router.get('/listar', InquilinoController.listar)
router.post('/deletar', InquilinoController.deletar)
router.post('/editar', InquilinoController.editar)
router.post('/editarPost', InquilinoController.editarPost)


module.exports = router;