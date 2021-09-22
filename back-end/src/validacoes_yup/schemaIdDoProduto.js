const yup = require('./configuracoes');

const schemaIdDoProduto = yup.object().shape({
  idProduto: yup.number().required()
});

module.exports = schemaIdDoProduto;