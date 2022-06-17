//chamando o mongoose
const mongoose = require("mongoose");
//instanciando o esquema mongoose
const schema = mongoose.Schema;

//definindo o Model aluno e os seus atributos
const Aluno = new schema({
    nome: {type: String, required: true},
    apelido: {type: String, required: true},
    zona: {type: String,  required: true},
    anoescolar: {type: Number, required: true},
    turma: {type: String, required: true},
    idade: {type: Number, required: true},
    curso: {type: String, required: true},
    departamento: {type: String, required: true},
    polouniversitario: {type: String, required: true},
    periodoestudo: {type: String, required: true},
    foto: {type: String, required: true},
    numerocadeiraematraso: {type: Number, required: true},
    codigoescolar: {type: Number, unique: true,required: true},
    email: {type: String, required: true},
    distrito: {type: String, required: true},
    maiornotapauta: {type: Number, required: true},
    menornotapauta: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now}
})

//criando a Collection fiscalizacao na Base de dados
mongoose.model("alunos", Aluno);