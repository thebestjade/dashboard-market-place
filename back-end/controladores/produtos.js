const conexao = require("../conexao");
const jwt = require("jsonwebtoken");
const segredo = require("../segredo_jwt");

const listarProdutos = async (req, res) => {
  const { usuario } = req;
  const { categoria } = req.query;

  try {
    let condicao = '';
    const params = [];

    if (categoria) {
      condicao += `and categoria ilike $2`;
      params.push(`%${categoria}%`);
    }

    const produtos = await conexao.query(
      `select * from produtos where usuario_id = $1 ${condicao}`,
      [usuario.id, ...params]
    );
    
    if (produtos.rowCount === 0) {
      return res.status(404).json("Não há nenhum produto cadastrado");
    }

    return res.status(200).json(produtos.rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarUmProduto = async (req, res) => {
  const { usuario } = req;
  const { idProduto } = req.params;

  if (!idProduto) {
    return res.status(400).json("O id do produto é obrigatório");
  }

  try {
    const produto = await conexao.query(
      "select * from produtos where id = $1 and usuario_id = $2",
      [idProduto, usuario.id]
    );

    if (produto.rowCount === 0) {
      return res.status(404).json("Este produto não está cadastrado");
    }

    return res.status(200).json(produto.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarProduto = async (req, res) => {
  const { usuario } = req;
  const { nome, estoque, categoria, preco, descricao, imagem } = req.body;

  if (!nome) {
    return res.status(400).json("O campo nome é obrigatório");
  }
  if (!estoque) {
    return res.status(400).json("O campo estoque é obrigatório");
  }
  if (!preco) {
    return res.status(400).json("O campo preco é obrigatório");
  }
  if (!descricao) {
    return res.status(400).json("O campo descricao é obrigatório");
  }

  try {

    const query =
      `insert into produtos
      (usuario_id, nome, estoque, categoria, preco, descricao, imagem)
      values ($1, $2, $3, $4, $5, $6, $7)`;
    const produtoCadastrado = await conexao.query(query, [
      usuario.id,
      nome,
      estoque,
      categoria,
      preco,
      descricao,
      imagem,
    ]);

    if (produtoCadastrado.rowCount === 0) {
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
    const produto = await conexao.query(
      "select * from produtos where id = $1 and usuario_id = $2",
      [idProduto, usuario.id]
    );

    if (produto.rowCount === 0) {
      return res.status(404).json("Este produto não existe");
    }

    const body = {};
    const params = [];
    let n = 1;

    if (nome) {
      body.nome = nome;
      params.push(`nome = $${n}`);
      n += 1;
    }
    if (estoque) {

      body.estoque = estoque;
      params.push(`estoque = $${n}`);
      n += 1;
    }

    if (categoria) {
      body.categoria = categoria;
      params.push(`categoria = $${n}`);
      n += 1;
    }

    if (preco) {
      body.preco = preco;
      
      params.push(`preco = $${n}`);
      n += 1;
    }

    if (descricao) {
      body.descricao = descricao;
      params.push(`descricao = $${n}`);
      n += 1;
    }

    if (imagem) {
      body.imagem = imagem;
      params.push(`imagem = $${n}`);
      n += 1;
    }

    const valores = Object.values(body);
    valores.push(idProduto);
    valores.push(usuario.id)

    const query = `update produtos set ${params.join(', ')} where id = $${n} and usuario_id = $${n + 1}`;
    const produtoAtualizado = await conexao.query(query, valores);

    if (produtoAtualizado.rowCount === 0) {
      return res.status(200).json("O produto não pôde ser atualizado");
    }

    return res.status(200).json("Produto atualizado");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deletarProduto = async (req, res) => {
  const { usuario } = req;
  const { idProduto } = req.params;

  if (!idProduto) {
    return res.status(400).json("O id do produto é obrigatório");
  }

  try {
    const produto = await conexao.query(
      "select * from produtos where id = $1 and usuario_id = $2",
      [idProduto, usuario.id]
    );

    if (produto.rowCount === 0) {
      return res.status(404).json("Este produto não existe");
    }

    const produtoDeletado = await conexao.query(
      "delete from produtos where id = $1",
      [idProduto]
    );

    if (produtoDeletado.rowCount === 0) {
      return res.status(400).json("Não foi possível deletar este produto");
    }

    return res.status(200).json("Produto deletado com sucesso!");
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
