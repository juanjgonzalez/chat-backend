
const {response} = require('express');
const bcript = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response)=>{
    const {email, password} = req.body;

    try{

        const mailExist = await Usuario.findOne({email});
        if(mailExist) return res.status(400).json({ok:false, msg: 'El correo ya existe'});

        const usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcript.genSaltSync();
        usuario.password = bcript.hashSync(password,salt);

        await usuario.save();
        //generar mi jwt
        const token = await generarJWT(usuario.id);
        res.json({
            ok:true,
            usuario,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error hable con adm'
        });
    }


}

const login = async(req,res =response) =>{
    const{email,password} = req.body;
    try {
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'Email no encontrado'
            });
        }
        const validPassword = bcript.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'contraseña no valida'
            });
        }
        const token = await generarJWT(usuarioDB.id);


        return res.json({
            ok:true,
            usuario: usuarioDB,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'error hable con el administrador'
        });
    }

}

const renewToken = async(req,res = response)=>{
    const uid = req.uid;

    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        ok:true,
        usuario,
        token
    });
}



module.exports ={
    crearUsuario,
    login,
    renewToken
}