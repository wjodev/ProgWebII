const mongo = require('mongoose')

mongo.connect('mongodb://127.0.0.1:27017/progWebatv1',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('****Conectado ao mongo*****')
    console.log('http://localhost:3000')
}).catch((error)=>{
    console.log("Erro ao conectar ao MongoDB"+error)
})

module.exports = mongo