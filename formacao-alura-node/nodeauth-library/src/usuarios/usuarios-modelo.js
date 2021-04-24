const usuariosDao = require('./usuarios-dao')
const { InvalidArgumentError } = require('../erros')
const validacoes = require('../validacoes-comuns')
const bcrypt = require('bcrypt')

/**
 * Classe de usuário ela faz o controle de modelo
 */
class Usuario {
  
  /**
   * Construtor de usuário, recebe um json de usuário
   * 
   * @param {object} usuario 
   */
  constructor (usuario) {
    this.id = usuario.id
    this.nome = usuario.nome
    this.email = usuario.email
    this.senhaHash = usuario.senhaHash
    this.emailVerificado = usuario.emailVerificado
    this.cargo = usuario.cargo
    this.valida()
  }

  /**
   * 
   * Adiciona o usuário 
   * 
   * @throws { InvalidArgumentError } - Retorna quando o usuário já existe
   */
  async adiciona () {
    if (await Usuario.buscaPorEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!')
    }

    await usuariosDao.adiciona(this)
    const { id } = await usuariosDao.buscaPorEmail(this.email)
    this.id = id
  }

  /**
   * 
   * valida e criptografa a senha em hash
   * 
   * @param {string} senha 
   */
  async adicionaSenha (senha) {
    validacoes.campoStringNaoNulo(senha, 'senha')
    validacoes.campoTamanhoMinimo(senha, 'senha', 8)
    validacoes.campoTamanhoMaximo(senha, 'senha', 64)

    this.senhaHash = await Usuario.gerarSenhaHash(senha)
  }

  async atualizaSenha() {
    await usuariosDao.atualizaSenha(this.senhaHash, this.id)
  }

  valida () {
    validacoes.campoStringNaoNulo(this.nome, 'nome')
    validacoes.campoStringNaoNulo(this.email, 'email')

    if(['admin', 'editor', 'assinante'].indexOf(this.cargo) === -1) {
      throw new InvalidArgumentError(`O cargo está inválido ${this.cargo}`)
    }
  }

  async verificaEmail () {
    this.emailVerificado = true
    await usuariosDao.modificaEmailVerificado(this, this.emailVerificado)
  }

  async deleta () {
    return usuariosDao.deleta(this)
  }

  static async buscaPorId (id) {
    const usuario = await usuariosDao.buscaPorId(id)
    if (!usuario) {
      return null
    }

    return new Usuario(usuario)
  }

  static async buscaPorEmail (email) {
    const usuario = await usuariosDao.buscaPorEmail(email)
    if (!usuario) {
      return null
    }

    return new Usuario(usuario)
  }

  static lista () {
    return usuariosDao.lista()
  }

  static gerarSenhaHash (senha) {
    const custoHash = 12
    return bcrypt.hash(senha, custoHash)
  }
}

module.exports = Usuario
