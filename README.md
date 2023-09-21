# TASKS API

# Bibliotecas utilizadas

<ul>
  <li><a href="https://expressjs.com/">Express</a> - Servidor</li>
  <li><a href="https://sequelize.org/">Sequelize</a> - ORM</li>
  <li><a href="https://github.com/sidorares/node-mysql2#readme">Mysql2</a> - Cliente do banco de dados</li>
  <li><a href="https://zod.dev/">Zod</a> - Valida os dados vindo das rotas</li>
  <li><a href="https://github.com/auth0/node-jsonwebtoken#readme">JWT</a> - Usado para gerar tokens de autenticação</li>
  <li><a href="https://github.com/kelektiv/node.bcrypt.js#readme">Bcrypt</a> - Fazer/desfazer hash de senhas</li>
  <li><a href="https://nodemailer.com/">Nodemailer</a> - Envio de e-mails</li>
  <li><a href="https://date-fns.org/">date-fns</a> - Tratamento de datas</li>
  <li><a href="https://github.com/googleapis/google-api-nodejs-client#readme">googleapis</a> - Usado para integrar com Google Calendar</li>
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
  <li><b>Vá para:</b> <a>https://console.cloud.google.com/apis/credentials</a></li>
  <li>Crie um <b>ID do cliente OAuth - OBS: Em URIs de redirecionamento, coloque: https://developers.google.com/oauthplayground</b></li>
  <li>Copie o <b>ID do cliente</b> e cole no campo <b>GC_CLIENT_ID</b> do arquivo <b>.env</b></li>
  <li>Copie a <b>Chave secreta do cliente</b> e cole no campo <b>GC_CLIENT_SECRET</b> do arquivo <b>.env</b></li>
  <li><b>Vá para:</b> <a>https://developers.google.com/oauthplayground</a></li>
  <li>Clique na engrenagem, selecione <b>Use your own OAuth credentials</b> e cole o <b>ID do cliente</b> e a <b>Chave secreta do cliente</b></li>
  <li>Na lista de APIs procure <b>Google Calendar API v3</b>, selecione as 2 primeiras URLs e clique em <b>Authorize APIs</b></li>
  <li>Siga os passos até voltar para a página</li>
  <li>Clique em <b>Exchange authorization code for tokens</b></li>
  <li>Copie o <b>Refresh token</b> e cole no campo <b>GC_REFRESH_TOKEN</b> do arquivo <b>.env</b></li>
  <li><b>Execute no terminal do projeto:</b> yarn</li>
  <li><b>Execute no terminal do projeto:</b> yarn sequelize db:migrate</li>
  <li><b>Execute no terminal do projeto:</b> yarn sequelize db:seed:all</li>
  <li><b>Execute no terminal do projeto:</b> docker-compose up</li>
  <li><b>Abra um novo terminal no projeto e execute:</b> yarn dev</li>
</ul>
