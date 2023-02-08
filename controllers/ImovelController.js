const mongoose = require('mongoose')
require('../model/Imovel')
const Imovel = mongoose.model('imovel')

module.exports = class ImovelController{
    static cadastroImovel(req, res){
        res.render('imovel/cadastroImov')
    }
    static salvarImovel(req, res){
        const imovel ={
            matricula: req.body.matricula,
            cep: req.body.cep,
            endereco: req.body.endereco,
            cidade: req.body.endereco,
            estado: req.body.estado,

        }
        new Imovel(imovel).save().then(()=>{
            req.flash("success_msg", "IMÓVEL CADASTRADO COM SUCESSO")
            res.redirect('/')
        }).catch((erro)=>{
            req.flash("error_msg", `ERRO AO SALVAR O IMÓVEL: ${erro}`)
            res.redirect('/')
        })
    }

    static listarImoveis(req, res){
        Imovel.find().then((imovel)=>{ 
            res.render('imovel/listaImovel', {imovel})
        })
    }
    static deletarImovel (req, res, next) {
        Imovel.findByIdAndDelete(req.body.id, (err, doc) => {
          if (!err) {
            req.flash("success_msg", "IMÓVEL EXCLUIDO")
            res.redirect('listaImoveis')
          } else {
            req.flash("error_msg", "Erro ao excluir imovel")
            res.redirect('listaImovei')
          }
        })
    }
    static editarImovel(req, res){
      Imovel.findOne({ _id:req.body.id }).then((imovel)=>{
          res.render('imovel/editarImov',{imovel: imovel} )
      }).catch((erro)=>{
          req.flash("error_msg", "IMÓVEL INEXISTENTE.")
          res.redirect('/imoveis/listaimoveis')
      })
     
  }
    static editarImovelPost(req, res){
      const imovelAtualiza = {
          matricula : req.body.matricula,
          cep : req.body.cep,
          endereco : req.body.endereco,
          cidade : req.body.cidade,
          estado : req.body.estado,
      }
      Imovel.updateOne({_id: req.body.id}, imovelAtualiza).then(()=>{
          req.flash("success_msg", "IMOVEL ATUALIZADO!")
          res.redirect('/')
      }).catch((erro)=>{
          req.flash("error_msg", `ERRO AO EDITAR: ${erro}`)
          res.redirect('/')
      })        
  }
}
