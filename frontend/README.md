# Sistema Gerenciador de Academia

O **Sistema Gerenciador de Academia** é uma aplicação web desenvolvida para gerenciar academias, com funcionalidades de cadastro de usuários, controle de eventos e gestão financeira, além de um sistema de autenticação robusto. O projeto foi desenvolvido utilizando React no front-end e Node.js com Express no back-end.


## Funcionalidades

- **Dashboard**: Painel principal de navegação e gerenciamento.
- **Cadastro de Usuários**: Criação e edição de perfis de usuários, com campos de CPF, nome, email, e telefone.
- **Lista de Usuários**: Visualização de todos os usuários cadastrados, com opções de editar ou excluir perfis.
- **Cadastro de Eventos**: Registro de eventos, como aulões, campeonatos e workshops, com opções de definir o responsável, data e horário.
- **Lista de Eventos**: Visualização de todos os eventos cadastrados, com opções de editar ou excluir eventos.


## Tecnologias Utilizadas

### Frontend:
- **React**: Biblioteca para construção da interface do usuário.
- **React Router**: Gerenciamento das rotas no frontend.
- **Axios**: Cliente HTTP para realizar requisições à API.
- **Ant Design**: Biblioteca de componentes de interface para React.
- **CSS**: Para estilização.

### Backend:
- **Node.js**: Plataforma de execução de JavaScript no backend.
- **Express**: Framework para gerenciamento de rotas e middlewares.
- **MongoDB**: Banco de dados NoSQL.
- **JWT (JSON Web Tokens)**: Autenticação segura.
- **BCrypt**: Para hash de senhas.


## Instalação e Configuração

### Pré-requisitos

- **Node.js** (v14 ou superior)
- **MongoDB** (rodando localmente ou em um servidor remoto)

### Instalação

1. Clone o repositório:

    ```bash

    git clone https://github.com/Amicuchi/SGA.git

    ```

2. Acesse a pasta do projeto:

    ```bash

    cd SGA

    ```

3. Instale as dependências:

    ```bash

    npm install

    ```

4. Configure as variáveis de ambiente, criando um arquivo `.env` na raiz do projeto e definindo as seguintes variáveis:

    ```

    REACT_APP_API_URL=http://localhost:3000/api

    ```

5. Inicie o servidor de desenvolvimento:

    ```bash

    npm start

    ```

## Estrutura de Pastas

```bash

frontend
├── node_modules
├── public
├── src
|   ├── assets                  # Imagens e outros recursos estáticos
│   │   ├── bg.png
│   │   ├── loginImage.png
│   │   ├── logo.png
│   │   ├── welcome.png
|   ├── components              # Componentes reutilizáveis
│   │   ├── Bills.jsx           # Componente de cadastro das contas
│   │   ├── Events.jsx          # Componente de cadastro dos eventos
│   │   ├── EventList.jsx       # Lista de eventos
│   │   ├── Register.jsx        # Componente para registro de novos usuários
│   │   ├── UserList.jsx        # Lista de usuários
│   │   ├── Welcome.jsx         # Componente de boas-vindas
|   ├── contexts                # Contextos para gerenciar estado global (autenticação)
│   │   ├── AuthContext.jsx     # Contexto de autenticação da aplicação
|   ├── hooks                   # Hooks customizados para lógica de autenticação e CRUD
│   │   ├── useAuth.js          # Hook customizado para autenticação
│   │   ├── useCreateEvent.jsx  # Hook para criação de novos eventos
│   │   ├── useEvent.jsx        # Hook para buscar eventos
│   │   ├── useFetchUsers.jsx   # Hook para buscar lista de usuários
│   │   ├── useLogin.jsx        # Hook para login de usuários
│   │   ├── useSignup.jsx       # Hook para registro de novos usuários
│   │   ├── useUpdateEvent.jsx  # Hook para atualizar eventos
│   │   ├── useUpdateUser.jsx   # Hook para atualizar informações de usuários
│   │   ├── useUser.jsx         # Hook para buscar informações de um usuário específico
|   ├── pages                   # Páginas da aplicação (Login, Dashboard)
│   │   ├── Dashboard.jsx       # Página principal do sistema
│   │   ├── Login.jsx           # Página de login
|   ├── styles                  # Arquivos CSS para estilização
│   │   ├── App.css             # Estilos globais
│   │   ├── index.css           # Estilos gerais
│   │   ├── Login.css           # Estilos específicos para a página de login
│   │   ├── Welcome.css         # Estilos para a página de boas-vindas
|   ├── App.jsx                 # Componente principal do frontend
|   └── main.jsx                # Ponto de entrada do frontend
├── .eslintrx.cjs               # Configuração do ESLint
├── .gitignore                  # Arquivos a serem ignorados pelo git
├── index.html                  # Arquivo HTML da página principal
├── package-lock.json           # Dependências
├── package.json                # Dependências e scripts do projeto
├── vite.config.js              # Configurações do Vite
└── README.md                   # Documentação do projeto

```

```bash

backend
├── controllers
|   └── authController.js   # Controlador de autenticação
├── models
|   └── userModel.js        # Modelo de usuário para o MongoDB
├── node_modules
├── routes
|   └── authRoute.js        # Rota de autenticação
├── utils
|   └── appError.js         # Tratamento de erros customizados
├── .gitignore             # Arquivos a serem ignorados pelo git
├── index.js               # Ponto de entrada do backend
├── package-lock.json      # Dependências
├── package.json           # Dependências e scripts do projeto

```

## Fluxo de Funcionamento

### Autenticação

A aplicação utiliza o hook useAuth para verificar se o usuário está autenticado. Caso o usuário não esteja autenticado, ele é redirecionado para a página de login.

### Dashboard

O componente Dashboard.jsx é a tela principal da aplicação. Ele inclui um menu lateral com links para diferentes páginas, como Usuários, Eventos, e Contas. Além disso, oferece a opção de logout.

### Cadastro de Usuários

A página de cadastro de usuários, Register.jsx, permite que novos usuários sejam cadastrados no sistema. Se um usuário já existir, os dados podem ser editados.

### Lista de Usuários

A página UserList.jsx exibe uma tabela com todos os usuários cadastrados. O administrador pode editar ou excluir qualquer usuário por meio de botões de ação.

### Cadastro de Eventos

O componente Events.jsx permite o registro de novos eventos no sistema, como campeonatos ou workshops. Nele, é possível definir o tipo do evento, o responsável, a data e outras informações relevantes.

### Lista de Eventos

A página EventList.jsx exibe uma lista de todos os eventos cadastrados. Semelhante à lista de usuários, é possível editar ou excluir qualquer evento.


## Executando Testes

Para rodar os testes automatizados:

```bash

npm test

```

## Diretrizes de Contribuição

Faça um Fork do projeto para sua conta pessoal.

Clone o repositório para sua máquina local:

```bash

git clone https://github.com/seu-usuario/cestaviva.git

```

Crie uma nova branch para a sua feature ou correção:

```bash

    git checkout -b minha-feature
```

Implemente suas mudanças com boas práticas de desenvolvimento, e faça commits pequenos e significativos.

Abra um Pull Request descrevendo suas mudanças detalhadamente e espere pela revisão.

### Boas Práticas:

- Use commits pequenos e autoexplicativos.
- Mantenha o código limpo e bem comentado.
- Utilize ESLint para manter a padronização do código.
- Escreva testes para as novas funcionalidades sempre que possível.

## Licença

Este projeto está licenciado sob a MIT License.

## Desenvolvido por: 

<a href="https://github.com/alejuliao">
    <img 
        src="https://avatars3.githubusercontent.com/u/31394808?s=460&u=9a9356fc1ad36a0b5ef79cbe4903350faffdc422&v=4" 
        width="150px" 
        alt="Imagem de Anderson Amicuchi Machado" 
    />
    <br />
    <sub><b>Anderson Amicuchi Machado</b></sub>
</a>