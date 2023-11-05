## API MetaVagas
<div style="display: flex;"> <br>
<img align="center", src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img align="center", src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
<img align="center", src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">  
<img align="center", src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
<img align="center", src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink">
<br>
<br>
</div>

### Descrição:
MetaVagas é um site de busca de empregos com a maioria das funcionalidade voltadas para o candidato, mas também é possível criar vaga e seguir alguns números interessantes sobre o mercado como por exemplo qual tecnologia é a mais pesquisada e quais as cidades são mais pesquisadas para estas tecnologias.
Publicado no Render: https://project-metavagas-backend.onrender.com

### Funcionalidades:
•	Cadastro de usuário;
•	Login com validação de senha (bcrypt) e token (JWT);
•	Atualização de dados do usuário;
•	Opção de favoritar e desfavoritar vagas;
•	Histórico de busca do usuário;
•	Pesquisa por filtro e busca;
•	Dados consolidados sobre as tecnologias mais buscadas e as cidades mais buscadas para essa tecnologia;
•	Paginação;
•	Rotas com retorno diferente para usuários logados e não logados.
•	Cadastrar Vagas;
•	Teste unitário no Service.

### Bibliotecas necessárias:
Bcrypt
Mongoose
Jsonwebtoken
Yup
Vitest
typescript

### Variáveis de Ambiente:
Na raiz deste projeto, no arquivo .env configure: DATABASE_URL= PORT= SECRET_KEY=
Se não informar "PORT", automaticamente será assumida a porta 3333

### Iniciar o Servidor:
npm start

### Rotas:
{{ URL }}: http://localhost:3333/users/
🔐: Rotas que requerem autenticação
##### Rotas de usuário
| Método | Rota                        | Descrição                            | Exemplo Requisição Body                    |
|--------|-----------------------------|-------------------------------------|------------------------------------------|
| POST   | `{{URL}}/users/`            | Criar usuário                        | `json\n{ "name": string, "email" : string, "password": string }` |
| POST   | 🔐 `{{URL}}/users/:id/profile`  | Atualização de dados do usuário     | `json\n{ "email": string }`                |
| POST   | 🔐 `{{URL}}/users/jobfavorite/` | Favorita e Desfavorita vaga         | `json\n{ "idUser": string, "idJob" : string }` |
| GET    | 🔐 `{{URL}}/users/history/:idUser` | Retorna o histórico de buscas do usuário |  |

##### Rota de autenticação de usuário
| Método | Rota             | Descrição                     | Exemplo Requisição Body               |
|--------|------------------|------------------------------|--------------------------------------|
| POST   | `{{URL}}/login/` | Valida e autentica usuário    | `json\n{ "email" : string, "password": string }` |

##### Rotas de vagas
| Método | Rota                               | Descrição                                                  | Exemplo Requisição Body                                                             |
|--------|------------------------------------|-----------------------------------------------------------|-------------------------------------------------------------------------------------|
| POST   | 🔐 `{{URL}}/jobs/`                    | Criar vaga                                                 | `json\n{ "company": "A", "salary": 1, "careerLevel": "B", "jobWebsite": "www.m.com", "technology": ["D"] }` |
| GET    | 🔐 `{{URL}}/jobs/?`                   | Filtro de vagas de acordo com a especificação da query    | `json\n{ "idUser": "idUser" }`                                                     |
| GET    | 🔐 `{{URL}}/jobs/all/?page=1&itensPage=2` | Retorna a lista de vagas de forma paginada. Usar `page` para informar a página necessária e `itensPage` para informar o limite de quantas vagas deseja por página | |
| GET    | 🔐 `{{URL}}/jobs/all/`                | Retorna a lista de vagas com suas respectivas informações |                                                                                     |

##### Rotas para usuário não logado
| Método | Rota                        | Descrição                                                  |
|--------|-----------------------------|-----------------------------------------------------------|
| GET    | `{{URL}}/allJobs/`          | Retorna a lista de vagas, porém com apenas algumas informações |
| GET    | `{{URL}}/?`                 | Filtro de vagas de acordo com a especificação da query    |

##### Rotas para obter informações sobre tecnologias mais pesquisadas e as cidades que mais procuraram por estas cidades
| Método | Rota                            | Descrição                                                      |
|--------|---------------------------------|---------------------------------------------------------------|
| GET    | 🔐 `{{URL}}/tendencies/`           | Retorna as tecnologias mais pesquisadas                        |
| GET    | 🔐 `{{URL}}/tendencies/NomeTecnologia` | Retorna as cidades que mais pesquisaram a tecnologia informada no endpoint por parâmetro |

### Contribuições:
Ficarei muito feliz caso queira contribuir com o projeto e desde já agradeço =) Clone este repositório, crie seu branch de trabalho e bora lá!
Ao final, abra um Pull Request explicando o problema resolvido ou recurso realizado.
Contato: https://www.linkedin.com/in/glasielle-cirilo-dev-fullstack/
