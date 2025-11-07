<h1 align="center">⚽ Passa a Bola</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-login-de-teste">Login de Teste</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-arquitetura">Arquitetura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-bibliotecas-e-ferramentas-extras">Bibliotecas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-deployment">Deployment</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-próximas-implementações">Próximas Implementações</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-autores">Autores</a>
</p>

<br>

<p align="center">
  <img alt="Passa a Bola preview" src=".github/preview.png" width="100%">
</p>

---

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

<img src="https://skillicons.dev/icons?i=html,css,js,react,tailwind,git,github,supabase&theme=dark" alt="HTML, CSS, JAVASCRIPT, REACT, TAILWIND, GIT, GITHUB, SUPABASE" width="370rem"/>

---

## 💻 Projeto

O **Passa a Bola** é uma plataforma desenvolvida para a empresa liderada por **Luana Maluf** e **Alê Xavier**, com o objetivo de **automatizar e otimizar os processos organizacionais dos campeonatos de futebol feminino**.  

Antes, toda a organização era feita manualmente (tabelas no papel, anotações dispersas e muita sobrecarga da equipe). Agora, o sistema **centraliza todo o processo de inscrições, confrontos e acompanhamento de campeonatos**, proporcionando **eficiência, transparência e praticidade** para organizadores e jogadoras.  

---

## ✨ Funcionalidades

✔️ **Autenticação de usuários** com persistência de dados em `localStorage`.  
✔️ **Login funcional** com usuários pré-cadastrados para testes.  
✔️ **Painel administrativo** com **gráfico dinâmico de inscrições** integrado ao **Supabase**.  
✔️ **Controle de vagas** com barra de progresso circular (até 20 times por campeonato).  
✔️ **Cores dinâmicas no gráfico** — rosa para vagas preenchidas e cinza para restantes.  
✔️ **Interface moderna e responsiva**, desenvolvida com **TailwindCSS** e **Shadcn/UI**.  
✔️ **Design intuitivo**, pensado para uso rápido durante eventos.  
✔️ **Integração em tempo real** com o banco de dados **Supabase**.  

> 💡 O gráfico de inscrições mostra o número de times aceitos em **rosa** e as vagas restantes em **cinza**, atualizando automaticamente conforme novas equipes são aprovadas.

## 🔐 Login de Teste

Você pode acessar o painel administrativo com as seguintes credenciais (armazenadas no `localStorage`):
```bash
📧 E-mail: luanaMaluf@passabola.com
🔑 Senha: admin
📧 E-mail: aleXavier@passabola.com
🔑 Senha: admin
📧 E-mail: marcelaDantas@passabola.com
🔑 Senha: admin
```
---

🏗️ Arquitetura

Frontend:

⚛️ React + Vite

🎨 TailwindCSS + Shadcn/UI

📊 Recharts (gráficos dinâmicos)

🌐 React Router DOM

Backend / Banco de Dados:

🗄️ Supabase (PostgreSQL + autenticação e API automática)

Outras ferramentas e bibliotecas:

🧠 Git & GitHub (controle de versão e colaboração)

🚀 Vercel (deploy contínuo) 

---

## 📦 Bibliotecas e Ferramentas Extras

- [Shadcn/UI](https://ui.shadcn.com/) → componentes prontos e acessíveis.  
- [Ant Design](https://ant.design/) → elementos visuais para interface.  
- [React Icons](https://react-icons.github.io/react-icons/) → ícones personalizáveis e dinâmicos.  
- [Recharts](https://recharts.org/) → criação de gráficos responsivos e interativos.  
- [Supabase](https://supabase.com/) → banco de dados, autenticação e API em tempo real.  

 ---

## 🌍 Deployment

Você pode acessar o projeto através da Vercel neste link:  

👉 [**Passa a Bola - Acesse aqui**](https://passa-a-bola-one.vercel.app/)

---

🧩 Próximas Implementações

📅 Sistema automatizado de chaveamento de jogos.

📸 Upload e galeria de fotos das partidas.

🧾 Validação digital de documentos das equipes.

📲 Área exclusiva para jogadoras acompanharem o campeonato em tempo real.

---

## 👨‍💻 Autores

- [Augusto Valerio](https://github.com/Augusto-Valerio)  
- [Jonas Esteves](https://github.com/JonasEstevess)  
- [Josué Faria](https://github.com/Josufaria)  
- [Mariana Silva](https://github.com/Marirsil)  
- [Vitor Tigre](https://github.com/VitorTigre)  
