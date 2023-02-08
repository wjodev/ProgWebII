const mongoose = require('mongoose')
require('../model/Inquilino')
const Inquilino = mongoose.model('inquilino')
const bcrypt = require('bcryptjs')

module.exports = class InquilinoController{
    static cadastro(req, res){
        res.render('inquilino/cadastroinquilino')
    }
    static salvar(req, res){
        var erros = []
        if(req.body.senha != req.body.senha2){
            erros.push({texto: "Senhas diferentes. Tente novamente"})
        }
        if(erros.length > 0){
            res.render("inquilino/cadastroinquilino", {erros: erros})
        }else{
            const inquilino ={
                
                nome: req.body.nome,
                cpf: req.body.cpf,
                email: req.body.email,
                senha: req.body.senha,

            }
            bcrypt.genSalt(10, (erro, salt)=>{
                bcrypt.hash(inquilino.senha, salt, (erro, hash)=>{
                    inquilino.senha = hash
                    new Inquilino(inquilino).save().then(()=>{
                        req.flash("success_msg", "INQUILINO CADASTRADO")
                        res.redirect('/')
                    }).catch((erro)=>{
                        req.flash("error_msg", `ERRO AO ATUALIZAR: ${erro}`)
                        res.redirect('/')
                    })
                })
            })
        
        }
    }

    static listar(req, res){
            Inquilino.find().then((inquilino)=>{ 
            res.render('inquilino/listainquilino', {inquilino})
        })
    }
    static deletar (req, res, next) {
        Inquilino.findByIdAndDelete(req.body.id, (err, doc) => {
          if (!err) {
            req.flash("success_msg", "INQUILINO EXCLUIDO")
            res.redirect('listar')
          } else {
            req.flash("error_msg", "ERRO AO EXCLUIR O INQUILINO")
            res.redirect('listar')
          }
        })
    }
    static editar(req, res){
      Inquilino.findOne({ _id:req.body.id }).then((inquilino)=>{
          res.render('inquilino/editarinquilino',{inquilino: inquilino} )
      }).catch((erro)=>{
          req.flash("error_msg", "INQUILINO INEXISTENTE.")
          res.redirect('/inquilinos/listar')
      })
     
  }
    static editarPost(req, res){
        var erros = []
        if(req.body.senha != req.body.senha2){
            erros.push({texto: "Senhas diferentes. Tente novamente"})
        }
        if(erros.length > 0){
            res.render("../views/index", {erros: erros})
        }else{
        const inquilino = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            senha: req.body.senha,
        }
        bcrypt.genSalt(10, (erro, salt)=>{
            bcrypt.hash(inquilino.senha, salt, (erro, hash)=>{
                inquilino.senha = hash
                new Inquilino(inquilino).save().then(()=>{
                    req.flash("success_msg", "INQUILINO ATUALIZADO")
                    res.redirect('/inquilinos/listar')
                }).catch((erro)=>{
                    req.flash("error_msg", `ERRO AO ATUALIZAR: ${erro}`)
                    res.redirect('/inquilinos/listar')
                })
            })
        })
        } 
    }
}