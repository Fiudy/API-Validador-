
# 🛡️ Validador de Dados - API

> API robusta para validação de CPF, CEP e Email, desenvolvida com **Fastify**, com documentação interativa via **Swagger UI**.

---

## 🔍 Visão Geral

Esta API tem como objetivo validar dados brasileiros comuns usados em formulários e sistemas, garantindo que os dados fornecidos estejam corretos antes de processá-los ou armazená-los.

- Validação de **CPF** com checagem dos dígitos verificadores.
- Consulta e validação de **CEP** via API pública do ViaCEP.
- Validação sintática e semântica de **emails**, incluindo checagem de domínios comuns e suspeitos.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** + **Fastify**: Servidor web ultra rápido e leve.
- **Axios**: Requisições HTTP para consulta do CEP.
- **Vitest**: Testes unitários para garantir qualidade.
- **Swagger UI**: Documentação interativa da API.
- **TypeScript**: Tipagem estática para maior segurança.

---

## ⚙️ Como Usar

### Requisitos

- Node.js >= 18.x
- npm ou yarn

### Instalação

```bash
git clone https://github.com/SeuUsuario/API-Validador.git
cd API-Validador
npm install
````

### Rodar a API

```bash
npm run dev
```

A API estará disponível em:
`http://localhost:3001`

### Documentação Swagger

Acesse a documentação interativa para testar endpoints no navegador:

`http://localhost:3001/docs`

---

## 🔧 Endpoints Principais

### Validar CPF

* **Método:** `POST`
* **URL:** `/validate/cpf`
* **Corpo:**

```json
{
  "cpf": "12345678909"
}
```

* **Resposta:**

```json
{
  "valido": true
}
```

---

### Consultar CEP

* **Método:** `GET`
* **URL:** `/validate/cep/:cep`
* **Exemplo:** `/validate/cep/01001000`
* **Resposta:**

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "complemento": "lado ímpar",
  "ddd": "11",
  "siafi": "7107",
  "gia": "1004",
  "ibge": "3550308",
  "regiao": "Sudeste",
  "unidade": ""
}
```

---

### Validar Email

* **Método:** `POST`
* **URL:** `/validate/email`
* **Corpo:**

```json
{
  "email": "exemplo@gmail.com"
}
```

* **Resposta (válido):**

```json
{
  "valido": true,
  "dominioComum": true
}
```

* **Resposta (inválido):**

```json
{
  "valido": false,
  "motivo": "Formato de email inválido"
}
```

---

## 🧪 Testes Unitários

Utilizamos **Vitest** para testes de validação dos dados. Para rodar:

```bash
npm run test
```

---

## 📜 Estrutura do Projeto

```plaintext
├── src/
│   ├── routes/
│   │   └── validate.ts        # Rotas da API para validação
│   ├── utils/
│   │   ├── validarCPF.ts      # Função de validação CPF
│   │   ├── validarEmail.ts    # Função de validação Email
│   │   └── viaCep.ts          # Consulta CEP via API ViaCEP
│   └── index.ts              # Inicialização do Fastify e registro de plugins
├── test/
│   ├── validarCPF.test.ts     # Testes unitários CPF
│   ├── validarEmail.test.ts   # Testes unitários Email
│   └── viaCep.test.ts         # Testes unitários CEP
├── package.json
├── tsconfig.json
└── README.md
```

---

## ✨ Autor

**Seu Nome** — Desenvolvedor Fullstack
[GitHub](https://github.com/SeuUsuario) | [LinkedIn](https://linkedin.com/in/seunome)

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

> Feito com ❤️ para garantir a qualidade dos seus dados!


