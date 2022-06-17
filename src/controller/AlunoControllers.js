//chamando mongoose
const mongoose = require("mongoose")
//fazendo com que o ficheiro tenha a referencia do model Aluno
require("../model/Aluno");
//definindo o ducumento da collecton alunos
const collAluno = mongoose.model("alunos");

//exportando o modelo do objeto
module.exports = {
//metodo que mosta a mesagem de boas vindas
async welcome(req, res){
    res.status(200).json({
        "mensagem": "Olá, Seja Bem vindo ao meu Webservice!",
        "usabilidade": "Para usufruir deste serviço acrecente no endereço da pagina web o caminho abaixo:",
        "urlServico": "/:api_key/webservice/fiscalizacao/alunos/:codigoescolar(4869, este seria um exemplo)",
        "Documentação-Webservice": "/webservice-docs"
    })
}, 
//metodo que CRIA um aluno na Collection alunos
  async create(req, res){
      //pegando os valores da requisição
    const {nome,  apelido,  zona,  anoescolar,  turma, idade,  curso,  departamento, polouniversitario,  periodoestudo, foto, numerocadeiraematraso,  codigoescolar,  email, distrito,  maiornotapauta,  menornotapauta} = req.body;
    const api_key = req.params.api_key;

    if(api_key == process.env.API_KEY){

      collAluno.findOne({codigoescolar: codigoescolar}).then(aluno=>{
          if(aluno){
            res.status(400).json({error: `Já existe um aluno com este código escolar:${codigoescolar} no sistema!`})
          }
     //registando o aluno
     new collAluno({
        nome: nome,
        apelido: apelido,
        zona: zona,
        anoescolar: anoescolar,
        turma: turma,
        idade: idade,
        curso: curso,
        departamento: departamento,
        polouniversitario: polouniversitario,
        periodoestudo: periodoestudo,
        foto: foto,
        numerocadeiraematraso: numerocadeiraematraso,
        codigoescolar: codigoescolar,
        email: email,
        distrito: distrito,
        maiornotapauta: maiornotapauta,
        menornotapauta: menornotapauta
    })
    .save()
    .then(()=>{
        res.status(200).json({resposta: "Aluno criado com sucesso!"})
    })
     .catch(err=>{
        console.log("Error: "+err)
        res.status(400).json({error: "Falha ao Criar o Aluno!"})
     })
          
      })  
   
    }else{
        res.status(402).json({error: "Acesso Negado! API_KEY Incorreto."})
    }
  },
 //metodo que faz a LISTAGEM dos alunos registados
  async readAll(req, res){
    //pegando os valores
    const api_key = req.params.api_key;

    if(api_key == process.env.API_KEY){
        collAluno.find().then(alunos =>{
            res.status(200).json({result:alunos});
        }).catch(err=>{
            res.status(400).json({error: "Falha listar os alunos!"})
        })
    }else{
        res.status(402).json({error: "Acesso Negado! API_KEY Incorreto."})
    }
  }, 
//metodo que faz a atualização dos dados de um Aluno
 async update(req, res){
   //pegando os valores da requisição
   const {nome,  apelido,  zona,  anoescolar,  turma, idade,  curso,  departamento, polouniversitario,  periodoestudo, foto, numerocadeiraematraso,  codigoescolar,  email, distrito,  maiornotapauta,  menornotapauta} = req.body;

   const {api_key, id} = req.params;

   if(api_key == process.env.API_KEY){
       collAluno.findOne({_id: id}).then(aluno=>{
           //alterando os dados do aluno
          aluno.nome = nome;
          aluno.apelido = apelido;
          aluno.zona = zona;
          aluno.anoescolar = anoescolar;
          aluno.turma = turma;
          aluno.idade = idade;
          aluno.curso = curso;
          aluno.departamento = departamento;
          aluno.polouniversitario = polouniversitario;
          aluno.periodoestudo = periodoestudo;
          aluno.foto = foto;
          aluno.numerocadeiraematraso = numerocadeiraematraso;
          aluno.codigoescolar = codigoescolar;
          aluno.email = email;
          aluno.distrito = distrito;
          aluno.maiornotapauta = maiornotapauta;
          aluno.menornotapauta = menornotapauta

          //salvando as alterações
          aluno.save()
           .then(()=>{
               res.status(200).json({resposta: "Aluno atualizado com sucesso!"}) 
           })
           .catch(err=>{
               console.log("Error: "+err)
               res.status(400).json({error: "Falha ao atualizar o Aluno!"})
           })
       })
   }else{
       res.status(402).json({error: "Acesso Negado! API_KEY Incorreto."})
   }
 },
//metodo que apaga um aluno com base no seu Id
 async delete(req, res){
   //pegando os dados
   const {api_key, id} = req.params;

   if(api_key == process.env.API_KEY){
      collAluno.deleteOne({_id: id}).then(()=>{
       res.status(200).json({resposta: "Aluno apagado com sucesso!"}) 
      })
      .catch(err=>{
       res.status(400).json({error: "Falha ao apagar o aluno!"})
      })
   }else{
       res.status(402).json({error: "Acesso Negado! API_KEY Incorreto."})
   }
 }, 
//metodo que faz seleciona um aluno com base no seu Id
 async read(req, res){
    //pegando os dados
    const {api_key, id} = req.params;

    if(api_key == process.env.API_KEY){
        collAluno.findOne({_id: id}).then(aluno=>{
            if(!aluno){
                res.status(200).json({resposta: `Este Id:${id} não existe no sistema!`})
            }
            res.status(200).json({result: aluno});
        })
        .catch(err=>{
            res.status(400).json({error: "Falha ao encontrar o aluno!"})
        })
    }else{
        res.status(402).json({error: "Acesso Negado! API_KEY Incorreto."})
    }
 },
 // metodo que faz o select do aluno pelo seu codigo escolar
 async readByCodEscolar(req, res){
     //pegando os dados
     const {api_key, codigoescolar} = req.params;

     if(api_key == process.env.API_KEY){
        collAluno.findOne({codigoescolar: codigoescolar}).then(aluno=>{
            if(!aluno){
                res.status(200).json({resposta: `Este codigo escolar:${codigoescolar} não existe no sistema!`})
            } 
          res.status(200).json({result: aluno});
        })
        .catch(err=>{
         res.status(400).json({error: "Falha ao encontrar o aluno!"})
        })
     }else{
         res.status(402).json({error: "Acesso Negado! API_KEY Incorreto."})
     }
 },

}