const jwt = require('jsonwebtoken');
const config= require('../config');

module.exports = (crendentials = []) => {
    return (req, res, next) => {
        console.log('Autorizado');
        // Allow for a string Or array
        if(typeof crendentials === "string"){
            crendentials = [credentials];

        }

        // Find JWT in headers
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send("Desculpe: acesso negado");
        } else {
            // Validation JWT
            // Bearer
            const tokenBody = token.slice(7);

            jwt.verify(tokenBody, config.JWT_SECRET, (err, decoded) => {
                if (err){
                    console.log('JWT Error : ${err}');
                    return res.status(401).send('Error: Acesso Negado');
                }
                // NO error, JWT deu certo !

            // Check for credentials being passed in
            if(crendentials.length>0) {
                if(
                    decoded.scopes 
                    && decoded.scopes.length 
                    && credentials.some(cred => decoded.scopes.indexOf(cred) >= 0)
                    ){
                    next();
                }   else {
                    return res.status(401).send("Erro : Acesso Negado");
                }
            } else{
                next();
            }
            });
        }
    };
};