# Sistema de Gerenciamento de Funcionários

Projeto desenvolvido para a disciplina de Java do 2º semestre do curso de Análise e Desenvolvimento de Sistemas.

---

## Descrição

Sistema Full Stack para gerenciamento de funcionários, permitindo o controle de colaboradores por meio de diferentes níveis de acesso.

A aplicação possui dois perfis:

### Administrador

* Login no sistema
* Dashboard administrativo
* Cadastro de funcionários
* Listagem de funcionários
* Edição de funcionários
* Exclusão de funcionários
* Consulta de funcionários ativos

### Funcionário

* Login no sistema
* Visualização do perfil
* Visualização de agenda demonstrativa

> A agenda possui finalidade exclusivamente acadêmica e demonstrativa, utilizando dados estáticos. O foco principal do projeto está no gerenciamento de funcionários e controle de acesso.

---

## Tecnologias

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Spring Validation
* Lombok
* Maven

### Frontend

* Angular
* TypeScript
* HTML5
* CSS3

### Banco de Dados

* H2 Database (desenvolvimento)
* MySQL (implementação futura)

### Versionamento

* Git
* GitHub

---

## Dependências

```xml
spring-boot-starter-web
spring-boot-starter-data-jpa
spring-boot-starter-validation
lombok
h2-database
mysql-connector-j
spring-boot-devtools
```

---

## Arquitetura

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

---

## Estrutura do Projeto

```text
br.com.funcionarios

├── controller
├── service
├── repository
├── domain
└── dto
```

### Responsabilidades

| Pacote     | Descrição                        |
| ---------- | -------------------------------- |
| controller | Endpoints da API                 |
| service    | Regras de negócio                |
| repository | Acesso aos dados                 |
| domain     | Entidades da aplicação           |
| dto        | Comunicação entre API e Frontend |

---

## Endpoints

### Funcionários

```http
GET    /funcionarios
GET    /funcionarios/{id}
POST   /funcionarios
PUT    /funcionarios/{id}
DELETE /funcionarios/{id}
```

### Dashboard

```http
GET /dashboard
```

### Perfil

```http
GET /perfil
```

---

## Estrutura Inicial da Entidade Usuário

| Campo | Tipo    |
| ----- | ------- |
| id    | Long    |
| nome  | String  |
| email | String  |
| senha | String  |
| cargo | String  |
| salario | BigDecimal |

---

## Branches

```text
main
backend
frontend
```

---

## Equipe

### Backend

* Luciano Júnior
* Luiz Felipe

### Frontend

* Rafael
* Michel
* Laura

---

## Objetivos do Projeto

* Aplicar conceitos de Programação Orientada a Objetos
* Desenvolver APIs REST com Spring Boot
* Integrar Frontend e Backend
* Trabalhar com persistência de dados
* Utilizar Git e GitHub em ambiente colaborativo
* Aplicar boas práticas de desenvolvimento

---

## Status

Projeto em desenvolvimento.


**Disciplina:** Java
**Curso:** Análise e Desenvolvimento de Sistemas
**Semestre:** 2º Semestre
