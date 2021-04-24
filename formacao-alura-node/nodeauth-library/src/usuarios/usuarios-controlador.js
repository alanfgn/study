const Usuario = require("./usuarios-modelo");
const { InvalidArgumentError } = require("../erros");

const tokens = require("./tokens");
const { EmailVerificacao, EmailRedefinicaoSenha } = require("./emails");
const { ConversorUsuario } = require("../conversores");

function geraEndereco(rota, token) {
  const baseURL = process.env.BASE_URL;
  return `${baseURL}${rota}${token}`;
}

module.exports = {
  async adiciona(req, res) {
    const { nome, email, senha, cargo } = req.body;
    console.log(req.body);
    try {
      const usuario = new Usuario({
        nome,
        email,
        emailVerificado: false,
        cargo,
      });
      await usuario.adicionaSenha(senha);
      await usuario.adiciona();

      const token = tokens.verificacaoEmail.cria(usuario.id);
      const endereco = geraEndereco("/usuario/verifica_email/", token);
      const emailVerificacao = new EmailVerificacao(usuario, endereco);
      emailVerificacao.enviaEmail().catch(console.log);

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message });
      }
      res.status(500).json({ erro: erro.message });
    }
  },

  async login(req, res) {
    try {
      const accessToken = tokens.access.cria(req.user.id);
      const refreshToken = await tokens.refresh.cria(req.user.id);
      res.set("Authorization", accessToken);
      res.status(200).json({ refreshToken });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async logout(req, res) {
    try {
      const token = req.token;
      await tokens.access.invalida(token);
      res.status(204).json();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async lista(req, res) {
    try {
      const usuarios = await Usuario.lista();
      const conversor = new ConversorUsuario(
        "json",
        req.acesso.todos.permitido
          ? req.acesso.todos.atributos
          : req.acesso.apenasSeu.atributos
      );

      res.send(conversor.converter(usuarios));
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async verificaEmail(req, res) {
    try {
      const usuario = req.user;
      await usuario.verificaEmail();
      res.status(200).json();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  },

  async deleta(req, res) {
    try {
      const usuario = await Usuario.buscaPorId(req.params.id);
      await usuario.deleta();
      res.status(200).json();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  async esqueciMinhaSenha(req, res) {
    const respostaPadrao = {
      mesagen:
        "Se encontrarmos este email iremos enviar intruções para redefinir a senha",
    };
    try {
      const usuario = await Usuario.buscaPorEmail(req.body.email);
      const token = await tokens.redefinicaoSenha.cria(usuario.id);
      const email = new EmailRedefinicaoSenha(usuario, token);
      await email.enviaEmail();

      res.json(respostaPadrao);
    } catch (error) {
      res.json(respostaPadrao);
    }
  },

  async trocarSenha(req, res) {
    try {
      if (typeof req.body.token !== 'string' || req.body.token.lenght === 0) {
        throw new InvalidArgumentError('O token está inválido')
      }

      const id = await tokens.redefinicaoSenha.verifica(req.body.token)
      const usuario = await Usuario.buscaPorId(id)
      await usuario.adicionaSenha(req.body.senha)
      await usuario.atualizaSenha()
      

      res.status(204).end();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
