const controle = require("../controleAcesso");

const metodos = {
  ler: {
    todos: "readAny",
    apenasSeu: "readOwn",
  },
  criar: {
    todos: "createAny",
    apenasSeu: "createOwn",
  },
  remover: {
    todos: "deleteAny",
    apenasSeu: "deleteOwn",
  },
};

module.exports = (entidade, acao) => (req, res, next) => {
  const permissoesDoCargo = controle.can(req.user.cargo);
  const acoes = metodos[acao];

  const permissaoTodos = permissoesDoCargo[acoes.todos](entidade);
  const permissaoApenasSeu = permissoesDoCargo[acoes.apenasSeu](entidade);

  if (!permissaoTodos.granted && !permissaoApenasSeu.granted) {
    return res.status(403).end();
  }

  req.acesso = {
    todos: {
      permitido: permissaoTodos.granted,
      atributos: permissaoTodos.attributes,
    },
    apenasSeu: {
      permitido: permissaoApenasSeu.granted,
      atributos: permissaoApenasSeu.attributes,
    },
  };

  next();
};
