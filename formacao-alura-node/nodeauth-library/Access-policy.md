# Politica de acesso

### Proposito 

Esse documento contém todas as informações de controle de acesso desse site.

Esse documento deve ser lido por todas as pessoas que trabalham para esse site.

### Autenticação

Para autenticação na api é nescessário: 

1. Criar um novo usuário na rota em:
   `POST /usuarios/`

2. Faser login com usuário e senha em:

   `POST /usuarios/login`

Com o cabeçalho `Authorization` nas demais requisições.

### Controle de conteudo

O site possui três cargos: `admin`, `editor` e `assinante`

- `admin` administra todas funções do sistema.
- `editor` lida com gerenciamento de posts.
- `assinante` consegue ler os posts.

