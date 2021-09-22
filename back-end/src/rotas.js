const express = require('express');
const usuarios = require('./controladores/usuarios');
const produtos =  require('./controladores/produtos');
const validarToken = require('./filtros/validarToken');

const rotas = express();

//usuarios

rotas.post('/cadastro', usuarios.cadastrarUsuario);
rotas.post('/login', usuarios.login);

rotas.use(validarToken);

rotas.get('/perfil', usuarios.perfilUsuario);
rotas.put('/perfil', usuarios.editarPerfil);

//produtos

rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:idProduto', produtos.listarUmProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:idProduto', produtos.atualizarProduto);
rotas.delete('/produtos/:idProduto', produtos.deletarProduto);


module.exports = rotas;