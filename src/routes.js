//chamando o express
const express = require("express");
//definido a constante que cria as rotas
const router = express.Router();
//importando o Controller
const AlunoController = require("./controller/AlunoControllers");
//importando o auth
const {checkPermission} = require("./config/auth");
//verificando a autoridade dos clientes
const {hasPermission} = require("./config/verifyPermission")

 //CRIANDO ROTAS
//rota raiz do webservice
router.get("/", AlunoController.welcome)

//rota que cria um aluno na collection alunos
router.post("/webservice/fiscalizacao", hasPermission, AlunoController.create)

// rota que faz o Update dos Alunos
router.put("/webservice/fiscalizacao/:id", hasPermission, AlunoController.update)

//rota que faz a listagem dos alunos registados
router.get("/webservice/fiscalizacao", hasPermission, AlunoController.readAll)

//rota que apaga um Aluno
router.delete("/webservice/fiscalizacao/:id", hasPermission, AlunoController.delete)

//rota que faz o select do aluno pelo seu Id
router.get("/webservice/fiscalizacao/:id", AlunoController.read)

/*rota que disponibiliza o recurso para o uso público
  * faz o select do aluno pelo seu codigo escolar
  *
*/
router.get("/webservice/fiscalizacao/alunos/:codigoescolar", AlunoController.readByCodEscolar)


//exportando o modelo 
module.exports = router;