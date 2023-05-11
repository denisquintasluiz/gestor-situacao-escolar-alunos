//exportando o objeto
module.exports = {
    hasPermission: function(req, res, next){
        //lendo o valor do cabeçalho da requisição
        const isallowed = req.headers.authorization;
        //checando a permissão do cliente
        if(isallowed == process.env.ACCESS_KEY){
            return next();
           
        }
        return res.status(401).json({error: "API_KEY Inválida!" });
    }
}