class Conversor {
  converter(data) {
    if (this.camposPublicos.indexOf("*") === -1) {
      data = this.filtrar(data);
    }

    if (this.tipoDeConteudo === "json") {
      return this.json(data);
    }
  }

  json(data) {
    return JSON.stringify(data);
  }

  filtrar(data) {
    if (Array.isArray(data)) {
      data = data.map((post) => this.filtrarObjeto(post));
    } else {
      data = this.filtrarObjeto(data);
    }

    return data;
  }

  filtrarObjeto(objeto) {
    const objetoFiltrado = {};

    this.camposPublicos.forEach((campo) => {
      if (Reflect.has(objeto, campo)) {
        objetoFiltrado[campo] = objeto[campo];
      }
    });

    return objetoFiltrado;
  }
}

class ConversorPost extends Conversor {
  constructor(tipoDeConteudo, camposExtras = []) {
    super();
    this.tipoDeConteudo = tipoDeConteudo;
    this.camposPublicos = ["titulo", "conteudo"].concat(camposExtras);
  }
}

class ConversorUsuario extends Conversor {
  constructor(tipoDeConteudo, camposExtras = []) {
    super();
    this.tipoDeConteudo = tipoDeConteudo;
    this.camposPublicos = ["nome"].concat(camposExtras);
  }
}

module.exports = { ConversorPost, ConversorUsuario };
