
module.exports = {
    async checkPermission(req,res,next
    )
    {
       const key = req.headers.authorization;

       if(!key){
           return res.status(401).send();
       }

       const [, fiscalizacaoaluno] = key.split(" ");

       if(fiscalizacaoaluno == "admim"){
           return next();
       }
       return res.status(401).send();
    }
}