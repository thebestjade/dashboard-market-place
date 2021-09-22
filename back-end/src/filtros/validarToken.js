const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const segredo = require('../segredo_jwt');

const validarToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json("Não autorizado")
  }

  try {
    
    const { id } = jwt.verify(token, segredo);
    
    const usuarioExiste = await knex('usuarios').where({ id }).first();
    
    if(!usuarioExiste){
      return res.status(404).json('Usuário não encontrado')
    }

    const { senha, ...usuario } = usuarioExiste;

    req.usuario = usuario;

    next();

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = validarToken;