const jwt = require('jsonwebtoken');
const generarJWT = (uid) =>{
    return new Promise((resolve,reject)=>{
        const payload ={
            uid
        };
        jwt.sign(payload, process.env.JWT_KEY,{
            expiresIn:'12h',
    
        },(err,token)=>{
            if(err){
                reject('Nose puedo generar token');
            }
            else{
                resolve(token);
            }
        });
    });
}

module.exports ={
    generarJWT
}