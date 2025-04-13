# API PDV (Point of Sale)

API PDV é uma aplicação para gerenciar produtos, empresas e operações relacionadas a um sistema de ponto de venda (POS). Este projeto foi desenvolvido com foco em modularidade, escalabilidade e boas práticas de desenvolvimento.

## 🚀 Funcionalidades

- **Gerenciamento de Produtos**:
  - Adicionar novos produtos.
  - Consultar produtos pelo código de barras.
  - Atualizar informações de produtos.
  - Remover produtos.

- **Gerenciamento de Empresas**:
  - Cadastro de empresas.
  - Autenticação de usuários vinculados a empresas.

- **Segurança**:
  - Criptografia de dados sensíveis (ex.: senhas, CNPJ).
  - Autenticação baseada em tokens JWT.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Plataforma de execução JavaScript.
- **TypeScript**: Superset de JavaScript para tipagem estática.
- **Express**: Framework para criação de APIs.
- **MongoDB**: Banco de dados NoSQL.
- **Jest**: Framework de testes.
- **Multer**: Middleware para upload de arquivos.
- **Bcrypt**: Para hashing de senhas.
- **JWT**: Para autenticação baseada em tokens.

---

## 📦 Instalação

### Pré-requisitos

- Node.js (v16 ou superior)
- MongoDB (local ou em nuvem)

### Passos para instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/lucasmelosilva/api-PDV
   cd ./api-PDV
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   MONGO_URL=mongodb://localhost:27017/api-pdv
   JWT_SECRET=seu_segredo_jwt
   PORT=3000
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

5. Acesse a API em:
   ```
   http://localhost:3000/api
   ```

---

## 📚 Documentação da API

### **Produtos**

#### **Adicionar Produto**
- **Endpoint**: `POST /api/products`
- **Descrição**: Adiciona um novo produto ao sistema.
- **Body**:
  ```json
  {
    "name": "Produto Exemplo",
    "barCode": "1234567890123",
    "price": 19.99,
    "imageUrl": "http://example.com/image.jpg"
  }
  ```
- **Resposta**:
  - **201 Created**: Produto criado com sucesso.
  - **400 Bad Request**: Dados inválidos.

#### **Consultar Produto**
- **Endpoint**: `GET /api/products/:barcode`
- **Descrição**: Retorna informações de um produto pelo código de barras.
- **Resposta**:
  - **200 OK**: Produto encontrado.
  - **404 Not Found**: Produto não encontrado.

#### **Atualizar Produto**
- **Endpoint**: `PUT /api/products/:barcode`
- **Descrição**: Atualiza as informações de um produto.
- **Body**:
  ```json
  {
    "name": "Produto Atualizado",
    "price": 29.99
  }
  ```
- **Resposta**:
  - **200 OK**: Produto atualizado com sucesso.
  - **404 Not Found**: Produto não encontrado.

#### **Deletar Produto**
- **Endpoint**: `DELETE /api/products/:barcode`
- **Descrição**: Remove um produto do sistema.
- **Resposta**:
  - **200 OK**: Produto removido com sucesso.
  - **404 Not Found**: Produto não encontrado.

---

## 🧪 Testes

Este projeto utiliza o **Jest** para testes unitários e de integração.

### Rodar os testes
```bash
npm run test
```

### Cobertura de testes
```bash
npm run test:coverage
```

---

## 🗂️ Estrutura do Projeto

```plaintext
src/
├── domain/                # Regras de negócio e contratos
├── data/                  # Implementações dos casos de uso
├── infra/                 # Implementações de infraestrutura (ex.: MongoDB)
├── main/                  # Configuração principal (rotas, middlewares, adapters)
├── presentation/          # Controladores e protocolos HTTP
└── tests/                 # Testes unitários e de integração
```

---

## 🛡️ Segurança

- **Criptografia**: Dados sensíveis como senhas e CNPJ são criptografados antes de serem armazenados.
- **Autenticação**: Baseada em tokens JWT.
- **Validação**: Todas as entradas são validadas para evitar ataques como SQL Injection e XSS.

---

## 📌 TODO

- [x] Adicionar um novo produto.
- [x] Consultar produto pelo código de barras.
- [x] Atualizar informações de um produto.
- [x] Remover produto.
- [ ] Implementar autenticação completa para usuários.
- [ ] Melhorar a documentação com exemplos de resposta.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m 'Minha nova feature'
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais informações.

---

## 📧 Contato

- **Autor**: Lucas Melo
- **Email**: lucas.melo044@gmail.com
- **GitHub**: [lucasmelosilva](https://github.com/lucasmelosilva)