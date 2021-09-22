const conexao = require("../conexao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const segredo = require("../segredo_jwt");
const schemaCadastroUsuario = require('../validacoes_yup/schemaCadastroUsuario');
const schemaLogin = require('../validacoes_yup/schemaLogin');


const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;

  try {

    await schemaCadastroUsuario.validate(req.body);
    
    const usuario = await conexao.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuario.rowCount > 0) {
      return res.status(400).json("Usuário já cadastrado");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioCadastrado = await conexao.query(
      "insert into usuarios (nome, email, senha, nome_loja) values ($1, $2, $3, $4)",
      [nome, email, senhaCriptografada, nome_loja]
    );

    if (usuarioCadastrado.rowCount === 0) {
      return res.status(400).json("O usuário não pôde ser cadastrado");
    }

    return res.status(200).json("Usuário cadastrado!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {

    await schemaLogin.validate(req.body);
    
    const usuarios = await conexao.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuarios.rowCount === 0) {
      return res.status(404).json("Usuário não cadastrado");
    }

    const usuario = usuarios.rows[0];

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaVerificada) {
      return res.status(400).json("Email ou senha incorreto");
    }

    const token = jwt.sign({ id: usuario.id }, segredo, { expiresIn: "1d" });

    const { senha: senhaUsuario, ...dadosUsuario } = usuario;

    return res.status(200).json({
      usuario: dadosUsuario,
      token,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const perfilUsuario = async (req, res) => {

  return res.status(200).json(req.usuario);

};

const editarPerfil = async (req, res) => {
  const { usuario } = req;

  const { nome, email, senha, nome_loja } = req.body;

  if (!nome && !email && !senha && !nome_loja) {
    return res.status(404).json('É obrigatório informar ao menos um campo para atualização');
  }

  try {

    const body = {};
    const params = [];
    let n = 1;

    if(nome){
      body.nome = nome;
      params.push(`nome = $${n}`);
      n += 1;
    }
    if(email){

      if(email !== usuario.email){
        const { rowCount } = await conexao.query('select * from usuarios where email = $1', [email]);
        if(rowCount > 0){
          return res.status(400).json('Email já cadastrado')
        }
      }
      body.email = email;
      params.push(`email = $${n}`);
      n += 1;
    }

    if(senha){
      body.senha = await bcrypt.hash(senha, 10);
      params.push(`senha = $${n}`);
      n += 1;
    }

    if(nome_loja){
      body.nome_loja = nome_loja;
      params.push(`nome_loja = $${n}`);
      n += 1;
    }

    const valores = Object.values(body);
    valores.push(usuario.id)

    const query = `update usuarios set ${params.join(', ')} where id = $${n}`;
    const usuarioAtualizado = await conexao.query(query, valores);

    if(usuarioAtualizado.rowCount === 0){
      return res.status(200).json("O usuario não pôde ser atualizado");
    }

    return res.status(200).json("Usuario atualizado");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  login,
  perfilUsuario,
  editarPerfil,
};
