# Guia de Implantação no Servidor Debian

Este guia contém as duas formas mais utilizadas e recomendadas para rodar o site da **MILLARI** em um servidor Debian junto com seus outros projetos:

---

## Opção 1: Direto via Nginx (Recomendada para máxima performance)

Como o projeto é uma SPA compilada (HTML/CSS/JS estáticos), você pode servir diretamente pelo Nginx do Debian sem gastar memória RAM com processos em segundo plano.

### 1. No servidor Debian, instale o Nginx (caso ainda não tenha):
```bash
sudo apt update
sudo apt install -y nginx
```

### 2. Copie os arquivos da pasta `dist/` para a pasta web do servidor:
No seu repositório ou pasta do projeto:
```bash
npm install
npm run build
```
Copie o conteúdo compilado:
```bash
sudo mkdir -p /var/www/millari
sudo cp -r dist/* /var/www/millari/
sudo chown -R www-data:www-data /var/www/millari
```

### 3. Crie o arquivo de configuração do Nginx:
Crie o arquivo `/etc/nginx/sites-available/millari`:
```bash
sudo nano /etc/nginx/sites-available/millari
```

Cole a configuração:
```nginx
server {
    listen 80;
    server_name millari.seudominio.com.br; # ou o IP/domínio desejado

    root /var/www/millari;
    index index.html;

    # Otimização de gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache de arquivos estáticos (assets)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|woff)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
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

## Opção 2: Rodando com Node.js + PM2 (Porta 3000 ou customizada)

Se você já gerencia seus outros projetos pelo **PM2** e usa proxy reverso:

### 1. Instale as dependências e faça o build:
```bash
npm install
npm run build
```

### 2. Inicie com o PM2:
```bash
# Iniciar o servidor Node com o nome "millari-web"
pm2 start server.js --name "millari-web" --env PORT=3000

# Salvar para reiniciar automaticamente no boot do Debian
pm2 save
pm2 startup
```

### 3. Configuração do Nginx como Proxy Reverso:
```nginx
server {
    listen 80;
    server_name millari.seudominio.com.br;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Opção 3: Usando Docker / Docker Compose

O projeto já inclui `Dockerfile` e `docker-compose.yml`.

### Iniciar com Docker Compose:
```bash
docker compose up -d --build
```
O container subirá na porta `3000` (`http://IP_DO_SERVIDOR:3000`).
Você pode alterar a porta no arquivo `docker-compose.yml` para evitar conflito com outros serviços (ex: `"3005:3000"`).

---

## Ativar SSL Grátis (HTTPS) com Let's Encrypt / Certbot:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d millari.seudominio.com.br
```
