const knex = require("../conexao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const segredo = require("../segredo_jwt");
const schemaCadastroUsuario = require('../validacoes_yup/schemaCadastroUsuario');
const schemaLogin = require('../validacoes_yup/schemaLogin');
const nodemailer = require('../nodemailer');


const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;

  try {

    await schemaCadastroUsuario.validate(req.body);

    const usuario = await knex('usuarios').where({ email }).first();

    if (usuario) {
      return res.status(400).json("Usuário já cadastrado");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioCadastrado = await knex('usuarios').insert({
      nome,
      email,
      senha: senhaCriptografada,
      nome_loja
    }).returning('*');

    if (!usuarioCadastrado) {
      return res.status(400).json("O usuário não pôde ser cadastrado");
    }

    const dadosEnvio = {
      from: "Market Cubos <nao-responder@marketcubos@email.com",
      to: email,
      subject: "Bem vindo ao Market Cubos!",
      text: `Olá, ${nome}, estamos muito felizes pelo seu ingresso na nossa plataforma, espero que goste!`
    }

    nodemailer.sendMail(dadosEnvio);

    return res.status(200).json("Usuário cadastrado!");

  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {

    await schemaLogin.validate(req.body);

    const usuario = await knex('usuarios').where({ email }).first();

    if (!usuario) {
      return res.status(404).json("Usuário não cadastrado");
    }

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

const atualizarPerfil = async (req, res) => {
  const { id } = req.usuario;
  let { nome, email, senha, nome_loja } = req.body;

  if (!nome && !email && !senha && !nome_loja) {
    return res.status(404).json('É obrigatório informar ao menos um campo para atualização');
  }

  try {

    if (senha) {
      senha = await bcrypt.hash(senha, 10);
    }

    if (email !== req.usuario.email) {
      const emailUsuarioExiste = await knex('usuarios').where({ email }).first();
      if (emailUsuarioExiste) {
        return res.status(404).json('O Email já existe.');
      }
    }

    const usuarioAtualizado = await knex('usuarios')
      .where({ id })
      .update({
        nome,
        email,
        senha,
        nome_loja
      });

    if (!usuarioAtualizado) {
      return res.status(400).json("O usuario não foi atualizado");
    }

    return res.status(200).json('Usuario foi atualizado com sucesso.');


  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  login,
  perfilUsuario,
  atualizarPerfil,
};
