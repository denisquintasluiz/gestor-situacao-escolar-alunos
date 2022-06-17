//chamando o Express
const express = require("express");
//chamando o cors
const cors = require("cors");
//chamando mongoose
const mongoose = require("mongoose");
//chamando bodyparser
const bodyParser = require("body-parser");
//chamando o morgan
const morgan = require("morgan");
//chamando o swagger
const swaggerUI = require("swagger-ui-express");

//inntanciando o objecto express()
const app = express();

//configurando a politica de CORS
app.use(cors());

//configurando variaveis de ambiente
require("dotenv").config();

//importando o modulo das rotas
const router = require("./routes");
//iportando o ficheiro de configuracao do swagger
const swaggerDocs = require("./swagger.json");

//configurando o morgan
app.use(morgan("dev"));
//configurando o swagger
app.use("/webservice-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

//definindo o tipo de comunicação do webservice
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
//configurando o bodyparser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

//conectando a base de dados
mongoose.Promise = global.Promise;
 if(process.env.NODE_ENV == "production"){
     mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
     console.log(`MongoDB conetado com sucesso na URL:${process.env.MONGODB_URI}`)
     }).catch(err => {
     console.log(`erro ao se conetar ao MongoDB: ${err}`);
   });
 }
  else{
    mongoose.connect(process.env.DB_URI)
    .then(() => {
    console.log(`MongoDB conetado com sucesso na URL:${process.env.DB_URI}`)
    }).catch(err => {
    console.log(`erro ao se conetar ao MongoDB: ${err}`);
    });
  }
  //ROTAS
     //definindo o caminho das rotas 
     app.use(router);

//definindo a porta de disponibilidade do serviço
app.listen(process.env.PORTA, () => {
    console.log(`Servidor está rodando na url:localhost:${process.env.PORTA}`);
});
