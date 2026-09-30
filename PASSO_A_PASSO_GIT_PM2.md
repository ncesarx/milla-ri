# Passo a Passo: Clonar e Rodar com Node.js + PM2 no Servidor Debian

Como este projeto foi desenvolvido no Google AI Studio, o repositório Git deve ser inicializado e enviado para o seu provedor (GitHub, GitLab, Gitea ou servidor Git próprio) para que você possa executar o `git clone` no Debian.

---

## ETAPA 1: Enviar o projeto para o seu Git (GitHub / GitLab / Gitea)

Caso você vá subir o código da sua máquina de desenvolvimento para o GitHub:

1. **Crie um novo repositório vazio** no seu GitHub ou GitLab (ex: `millari-web`).
2. **Inicialize e faça o push:**
```bash
git init
git add .
git commit -m "feat: site oficial Millari com suporte PM2 e Debian"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/millari-web.git
git push -u origin main
```

---

## ETAPA 2: No seu Servidor Debian (Acesso SSH)

Conecte-se ao seu Debian via SSH:
```bash
ssh seu_usuario@ip_do_servidor
```

### 1. Garantir que Node.js, npm e PM2 estejam instalados:
```bash
# Verificar versões:
node -v
npm -v
pm2 -v

# Caso não tenha o PM2 instalado globalmente:
sudo npm install -g pm2
```

---

## ETAPA 3: Fazer o `git clone` no Servidor

Navegue até a pasta onde você mantém seus outros projetos (por exemplo, `/var/www` ou `/home/seu_usuario/projetos`):

```bash
cd /var/www
sudo git clone https://github.com/SEU_USUARIO/millari-web.git
cd millari-web
```

Ajuste as permissões para o seu usuário (ou `www-data`):
```bash
sudo chown -R $USER:$USER /var/www/millari-web
```

---

## ETAPA 4: Instalar Dependências e Compilar

Dentro da pasta do projeto (`/var/www/millari-web`):

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Gerar o build de produção (cria a pasta dist/)
npm run build
```

---

## ETAPA 5: Iniciar com o PM2

O projeto já inclui o arquivo `ecosystem.config.cjs` pré-configurado:

### Iniciar usando o arquivo de configuração:
```bash
pm2 start ecosystem.config.cjs
```

*Ou iniciar diretamente via comando:*
```bash
pm2 start server.js --name "millari-web" --env PORT=3000
```

> **Dica de Porta:** Se a porta 3000 já estiver sendo usada por outro projeto no seu Debian, basta alterar a porta para outra livre (ex: 3005):
> ```bash
> PORT=3005 pm2 start server.js --name "millari-web"
> ```

### Configurar para reiniciar automaticamente caso o servidor Debian reinicie:
```bash
pm2 save
pm2 startup
```
*(O PM2 exibirá uma linha de comando com `sudo env PATH=...` para você copiar e colar no terminal).*

### Comandos úteis do PM2:
- Ver status: `pm2 status`
- Ver logs em tempo real: `pm2 logs millari-web`
- Reiniciar o app: `pm2 restart millari-web`
- Parar o app: `pm2 stop millari-web`

---

## ETAPA 6: Configurar o Nginx como Proxy Reverso (com seus outros sites)

Crie o arquivo no Nginx:
```bash
sudo nano /etc/nginx/sites-available/millari
```

Cole a configuração apontando para a porta do PM2 (ex: 3000):
```nginx
server {
    listen 80;
    server_name millari.seudominio.com.br; # ou seu domínio/subdomínio

    # Permitir upload de foto de alta resolução (até 30MB)
    client_max_body_size 30M;

    location / {
        proxy_pass http://127.0.0.1:3000; # Use a porta definida no PM2
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ative o site e recarregue o Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/millari /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## ETAPA 7: Atualizações Futuras no Debian (Fluxo contínuo)

Quando você fizer alterações no código e enviar para o Git, basta rodar no Debian:
```bash
cd /var/www/millari-web
git pull origin main
npm install
npm run build
pm2 restart millari-web
```
Pronto! O site será atualizado sem interrupção de serviço.
