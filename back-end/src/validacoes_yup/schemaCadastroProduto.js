const yup = require('./configuracoes');

const schemaCadastroProduto = yup.object().shape({
  nome: yup.string().required(),
  estoque: yup.string().required(),
  categoria: yup.string().optional(),
  preco: yup.string().required(),
  descricao: yup.string().required().min(20).max(300),
  imagem: yup.string().optional()
});

module.exports = schemaCadastroProduto;