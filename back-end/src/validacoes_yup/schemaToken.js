const yup = require('./configuracoes');

const schemaToken = yup.object().shape({
  token: yup.string().required()
});

module.exports = schemaToken;