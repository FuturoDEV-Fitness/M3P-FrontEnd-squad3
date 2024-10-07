
![WhatsApp Image 2024-10-07 at 1 45 31 AM](https://github.com/user-attachments/assets/c11ab800-2d05-4780-9834-13deff941a73)

# ![localP](https://github.com/hiediferreira/Exercite/assets/150954299/bdd10282-bb44-4da8-a800-f38c3a66f4e3) Bem vinda(o) ao *Busca Fit*! 

*BuscaFit* foi criado como projeto final do curso de Desenvolvimento Web do projeto *Floripa Mais Tech*!! O projeto possui FrontEnd e BackEnd.
*BuscaFit* foi criado como projeto final do curso de Desenvolvimento Web do projeto *Floripa Mais Tech*!! O projeto possui FrontEnd e BackEnd.

# ![localP](https://github.com/hiediferreira/Exercite/assets/150954299/bdd10282-bb44-4da8-a800-f38c3a66f4e3) Objetivo
*BuscaFit* é uma plataforma onde o usuário pode cadastrar dicas de lugares para a prática de atividades físicas.
*BuscaFit* é uma plataforma onde o usuário pode cadastrar dicas de lugares para a prática de atividades físicas.

# ![localP](https://github.com/hiediferreira/Exercite/assets/150954299/bdd10282-bb44-4da8-a800-f38c3a66f4e3) O sistema

A aplicação possui 8 páginas:
A aplicação possui 8 páginas:
* Tela de Login - Onde o usuário informa e-mail e senha e caso já seja cadastrado, tem acesso ao sistema;
* Tela de cadastro de novo usuário - Caso o usuário deseje se cadastrar no sistema, deverá preencher o formulário com seus dados;
* Tela de edição dos usuários - Caso o usuário deseje alterar algum de seus dados, deve preencher o formulário de edição.
* Dashboard - Tela inicial do sistema, onde o usuário poderá ver em um mapa interativo os locais já cadastrados, o número de usuários cadastrados na plataforma e inclusive ver quantos usuários estão ativos no momento. Essa é uma tela apenas de visualização;
* Minha conta - Tela onde o usuário tem uma visualização simplicada de seus dados. Há duas opçõs nessa tela: a possibilidade de editar os dados e ao clicar nessa opção o usuário é redirecionado para a tela de edição de usuário e a possibilidade de exlcuir a conta. Caso o usuário exclua sua conta, todos seus locais cadastrados são excluídos automaticamente.
* Tela de listagem de locais - Tela onde estão listados todos os locais cadastrados no sistema. Essa tela permite que o usuário edite ou apague um local cadastrado;
* Tela de Cadastro de novo local - Nessa tela, o usuário pode cadastrar um local. Para tal, ele deve preencher o formulário com informações sobre o local;
* Tela de edição dos usuários - Caso o usuário deseje alterar algum de seus dados, deve preencher o formulário de edição.
* Dashboard - Tela inicial do sistema, onde o usuário poderá ver em um mapa interativo os locais já cadastrados, o número de usuários cadastrados na plataforma e inclusive ver quantos usuários estão ativos no momento. Essa é uma tela apenas de visualização;
* Minha conta - Tela onde o usuário tem uma visualização simplicada de seus dados. Há duas opçõs nessa tela: a possibilidade de editar os dados e ao clicar nessa opção o usuário é redirecionado para a tela de edição de usuário e a possibilidade de exlcuir a conta. Caso o usuário exclua sua conta, todos seus locais cadastrados são excluídos automaticamente.
* Tela de listagem de locais - Tela onde estão listados todos os locais cadastrados no sistema. Essa tela permite que o usuário edite ou apague um local cadastrado;
* Tela de Cadastro de novo local - Nessa tela, o usuário pode cadastrar um local. Para tal, ele deve preencher o formulário com informações sobre o local;
* Tela de edição - Nessa tela, o usuário poderá editar alguma informação sobre um local cadastrado, caso deseje.
  
### Abaixo demostração do sistema sendo executado!


![Exercite](https://github.com/hiediferreira/Exercite/assets/150954299/20aa01eb-70e2-4b74-9fca-eed9901c2cfe)

# ![localP](https://github.com/hiediferreira/Exercite/assets/150954299/bdd10282-bb44-4da8-a800-f38c3a66f4e3) Recursos utilizados
* React;
* Hooks de estado;
* Hooks de efeito;
* Context API;
* Consumo da API ViaCep;
* React Hook-form;
* React Leaflet para o mapa interativo;
* Material UI;
* CSS modules;
* Rotas dinâmicas e privadas com uso do JsonWebToken;
* PostgreSQL;
* Rotas dinâmicas e privadas com uso do JsonWebToken;
* PostgreSQL;
* Git Flow;

# ![localP](https://github.com/hiediferreira/Exercite/assets/150954299/bdd10282-bb44-4da8-a800-f38c3a66f4e3) Como executar o projeto
Caso deseje executar o projeto em sua máquina:
1. Faça o clone do repositório para sua máquina `https://github.com/FuturoDEV-Fitness/M3P-FrontEnd-squad3.git`;
2. Dentro da pasta, dê o comando `npm install` no terminal para baixar as dependências do projeto;
3. Para rodar o front-end execute o comando `npm run dev`;
4. Para rodar o back-end:
   1. Clone o repositório do back-end: `https://github.com/FuturoDEV-Fitness/M3P-BackEnd-squad3.git`;
   2. Dentro da pasta, dê o comando `npm install` no terminal para baixar as dependências do projeto;
   3. Rode as migrations com o comando `sequelize:db-migrate`;
   4. Rode o projeto com o comando `npm run start:dev`.
5. Os dois projetos devem estar rodando simultaneamente em terminais diferentes;
6. Banco de dados utilizado: postgreSQL.
1. Faça o clone do repositório para sua máquina `https://github.com/FuturoDEV-Fitness/M3P-FrontEnd-squad3.git`;
2. Dentro da pasta, dê o comando `npm install` no terminal para baixar as dependências do projeto;
3. Para rodar o front-end execute o comando `npm run dev`;
4. Para rodar o back-end:
   1. Clone o repositório do back-end: `https://github.com/FuturoDEV-Fitness/M3P-BackEnd-squad3.git`;
   2. Dentro da pasta, dê o comando `npm install` no terminal para baixar as dependências do projeto;
   3. Rode as migrations com o comando `sequelize:db-migrate`;
   4. Rode o projeto com o comando `npm run start:dev`.
5. Os dois projetos devem estar rodando simultaneamente em terminais diferentes;
6. Banco de dados utilizado: postgreSQL.

# ![localP](https://github.com/hiediferreira/Exercite/assets/150954299/bdd10282-bb44-4da8-a800-f38c3a66f4e3) Melhorias para esse projeto
* Opção de cadastrar nova senha, caso o usuário tenha esquecido a sua;
* Validação do cpf;
* Uso de uma API para preencher automaticamente a latitude e longitude;

# ![localP](https://github.com/hiediferreira/Exercite/assets/150954299/bdd10282-bb44-4da8-a800-f38c3a66f4e3) Autores
https://github.com/hiediferreira 

https://github.com/juniorpinhodev, 

https://github.com/ThaisEFAG, 

williansourib
  

