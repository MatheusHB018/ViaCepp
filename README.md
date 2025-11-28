# 🇧🇷 Busca CEP Brasil - Fullstack App

Este projeto é uma aplicação web completa para consulta de endereços brasileiros via CEP. Ele utiliza uma arquitetura **Fullstack**, separando o Backend (API Proxy) do Frontend (Interface do Usuário).

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

### Frontend (Interface)
- **Vue.js 3** (via Vite): Framework JavaScript progressivo.
- **CSS3**: Estilização responsiva e customizada.
- **Axios**: Para consumo da API.

### Backend (Servidor)
- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criação de rotas e servidor.
- **Cors**: Para gerenciamento de permissões de acesso.

---

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter o **Node.js** instalado em sua máquina.

---

## 📦 Como rodar o projeto

Como o projeto é dividido em duas partes, precisamos iniciar o servidor e o site separadamente.

### 1. Configurando e Rodando o Backend (Servidor)

Abra o terminal na pasta raiz do projeto e execute:

```bash
# Entrar na pasta do backend
cd backend

# Instalar as dependências
npm install

# Iniciar o servidor
node server.js

# Entrar na pasta do frontend
cd frontend

# Instalar as dependências
npm install

# Iniciar o projeto Vue
npm run dev
