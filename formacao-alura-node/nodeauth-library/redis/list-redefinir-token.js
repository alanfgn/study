const redis = require('redis');
const manipulaLista = require('./manipula-lista');
const redefinicaoSenhalist = redis.createClient({ prefix: 'redefinicao-senha:' });
module.exports = manipulaLista(redefinicaoSenhalist);