# TASKS API

# Bibliotecas utilizadas

<ul>
  <li><a href="https://expressjs.com/">Express</a> - Servidor</li>
  <li><a href="https://sequelize.org/">Sequelize</a> - ORM</li>
  <li><a href="https://github.com/sidorares/node-mysql2#readme">Mysql2</a> - Cliente do banco de dados</li>
  <li><a href="https://zod.dev/">Zod</a> - Valida os dados vindo das rotas</li>
  <li><a href="https://jwt.io/">JWT</a> - Usado para gerar tokens de autenticação</li>
  <li><a href="https://github.com/kelektiv/node.bcrypt.js#readme">Bcrypt</a> - Fazer/desfazer hash de senhas</li>
  <li><a href="https://nodemailer.com/">Nodemailer</a> - Envio de e-mails</li>
</ul>

# Para que tudo funcione corretamente, siga os passos abaixo

<ul>
  <li><b>Execute no terminal:</b> git clone https://github.com/gianlucas34/tasks-api.git</li>
  <li>Crie um arquivo na raiz do projeto chamado <b>.env</b></li>
  <li>Copie as variáveis do arquivo <b>.env.example</b>, cole no arquivo <b>.env</b> e preencha os dados</li>
  <li>Vá até a conta do google que você colocou no arquivo <b>.env</b></li>
  <li>Clique em <b>Gerenciar sua Conta do Google</b></li>
  <li>Clique na aba <b>Segurança</b></li>
  <li>Clique em <b>Verificação em duas etapas</b></li>
  <li>Siga os passos e ative a verificação em duas etapas</li>
  <li>Clique em <b>Senhas de app no final da página</b></li>
  <li>Digite <b>nodemailer</b> no campo de nome</li>
  <li>Copie o código que aparecer e cole no campo <b>GMAIL_PASSWORD</b> do arquivo <b>.env</b></li>
  <li><b>Execute no terminal do projeto:</b> yarn</li>
  <li><b>Execute no terminal do projeto:</b> yarn sequelize db:migrate</li>
  <li><b>Execute no terminal do projeto:</b> yarn sequelize db:seed:all</li>
  <li><b>Execute no terminal do projeto:</b> docker-compose up</li>
  <li><b>Abra um novo terminal no projeto e execute:</b> yarn dev</li>
</ul>
