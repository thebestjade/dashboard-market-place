const conexao = require('../conexao');
const jwt = require('jsonwebtoken');
const segredo = require('../segredo_jwt');

const validarToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if(!token){
    return res.status(400).json('O token é obrigatório');
  }

  try {

    const { id } = jwt.verify(token, segredo);
    
    const query = 'select * from usuarios where id = $1';
    const { rows, rowCount } = await conexao.query(query, [id]);

    if(rowCount === 0){
      return res.status(404).json('Usuário não encontrado')
    }

    const { senha, ...usuario } = rows[0];

    req.usuario = usuario;

    next();

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = validarToken;