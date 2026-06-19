# ToDo List com SQLite

## Descrição

Este projeto consiste em uma aplicação ToDo List desenvolvida com Node.js, TypeScript, Express e SQLite. O objetivo da atividade foi substituir o armazenamento das tarefas em um arquivo JSON por um banco de dados SQLite.

A aplicação permite criar, listar, atualizar e remover tarefas através de rotas HTTP.

## Funcionamento do Código

O arquivo `server.ts` é responsável por iniciar o servidor Express, criar a tabela `tasks` caso ela não exista e definir as rotas da aplicação.

O arquivo `core.ts` contém as funções responsáveis pela comunicação com o banco de dados SQLite.

### Funções Implementadas

**addItem(title)**

Adiciona uma nova tarefa ao banco utilizando o comando:

```sql
INSERT INTO tasks (title) VALUES (?)
```

**getItems()**

Retorna todas as tarefas cadastradas:

```sql
SELECT * FROM tasks
```

**deleteItem(id)**

Remove uma tarefa pelo ID:

```sql
DELETE FROM tasks WHERE id = ?
```

**updateItem(id, title)**

Atualiza o título de uma tarefa existente:

```sql
UPDATE tasks SET title = ? WHERE id = ?
```

## Banco de Dados

Foi utilizada a tabela `tasks` com a seguinte estrutura:

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL
)
```

## Como Executar o Projeto

1. Clonar repositório:

```bash
git clone <url-do-repositorio>
```

2. Entrar na pasta do projeto:

```bash
cd prog2.tri2.ativ2
```

3. Instalar as dependências:

```bash
npm install
```

4. Executar o servidor:

```bash
npm run dev
```

Se tudo estiver correto, aparecerá a mensagem:

```bash
Servidor rodando
```

## Como Testar as Rotas

### Listar tarefas

```bash
curl http://localhost:3000/tasks
```

### Criar tarefa

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Estudar SQLite"}'
```

### Atualizar tarefa

```bash
curl -X PUT http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d '{"title":"Estudar SQLite e Express"}'
```

### Remover tarefa

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

