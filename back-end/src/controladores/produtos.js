const knex = require("../conexao");
const schemaCadastroProduto = require('../validacoes_yup/schemaCadastroProduto');
const schemaIdDoProduto = require('../validacoes_yup/schemaIdDoProduto');

const listarProdutos = async (req, res) => {
  const { usuario } = req;
  const { categoria } = req.query;

  try {

    const produtos = await knex('produtos')
      .where({ usuario_id: usuario.id })
      .where(query => {
        if (categoria) {
          return query.where('categoria', 'ilike', `%${categoria}%`);
        }
      });

    return res.status(200).json(produtos);

  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarUmProduto = async (req, res) => {
  const { usuario } = req;
  const { idProduto } = req.params;

  try {

    await schemaIdDoProduto.validate(req.params);

    const produto = await knex('produtos').where({
      id: idProduto,
      usuario_id: usuario.id
    }).first();

    if (!produto) {
      return res.status(404).json("Este produto não está cadastrado");
    }

    return res.status(200).json(produto);

  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarProduto = async (req, res) => {
  const { usuario } = req;
  const { nome, estoque, categoria, preco, descricao, imagem } = req.body;

  try {

    await schemaCadastroProduto.validate(req.body);

    const produtoCadastrado = await knex('produtos').insert({
      usuario_id: usuario.id,
      nome,
      estoque,
      categoria,
      preco,
      descricao,
      imagem
    }).returning('*');

    if (!produtoCadastrado) {
      return res.status(404).json("Não foi possível cadastrar produto");
    }

    return res.status(200).json("Produto cadastrado com sucesso!");

  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarProduto = async (req, res) => {
  const { usuario } = req;
  const { idProduto } = req.params;
  const { nome, estoque, categoria, preco, descricao, imagem } = req.body;

  if (!nome && !estoque && !categoria && !preco && !descricao && !imagem) {
    return res.status(404).json('É obrigatório informar ao menos um campo para atualização');
  }

  try {

    await schemaIdDoProduto.validate(req.params);

    const produtoEncontrado = await knex('produtos').where({
      id: idProduto,
      usuario_id: usuario.id
    }).first();

    if (!produtoEncontrado) {
      return res.status(404).json('Produto não encontrado');
    }

    const produto = await knex('produtos')
      .where({ id: idProduto })
      .update({
        nome,
        estoque,
        preco,
        categoria,
        descricao
      });

    if (!produto) {
      return res.status(400).json("O produto não foi atualizado");
    }

    return res.status(200).json('produto foi atualizado com sucesso.');

  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deletarProduto = async (req, res) => {
  const { usuario } = req;
  const { idProduto } = req.params;

  try {

    await schemaIdDoProduto.validate(req.params);

    const produtoEncontrado = await knex('produtos').where({
      id: idProduto,
      usuario_id: usuario.id
    }).first();

    if (!produtoEncontrado) {
      return res.status(404).json('Produto não encontrado');
    }

    const produtoExcluido = await knex('produtos').where({
      id: idProduto,
      usuario_id: usuario.id
    }).del();

    if (!produtoExcluido) {
      return res.status(400).json("O produto não foi excluido");
    }

    return res.status(200).json('Produto excluido com sucesso');
    
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarProdutos,
  listarUmProduto,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
};
