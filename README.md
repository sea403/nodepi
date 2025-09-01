# nodepi

An **Express + TypeScript + Prisma + MySQL API** with JWT authentication, Zod validation, Swagger docs, and Jest tests.
This project is fully dockerized and ready for development.

---

## 🔧 Requirements

* Node.js ≥ 18 (tested on 20)
* pnpm (or npm/yarn)
* Docker & Docker Compose

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/sea403/nodepi nodepi
cd nodepi

# install deps
pnpm install   # or npm install
```

---

## ⚙️ Environment

Copy and configure your `.env`:

```bash
cp .env.example .env
```

By default, it connects to MySQL at:

```
DATABASE_URL="mysql://root:root@localhost:3307/app_dev"
```

> 💡 if you already run MySQL locally on port 3306, we mapped the container to **3307**.

---

## 🐳 Database (Docker)

Start MySQL + Adminer:

```bash
docker compose up -d
```

* MySQL → `localhost:3307`
* Adminer → [http://localhost:8080](http://localhost:8080)

---

## 🗄️ Prisma

Generate the client and run migrations:

```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
```

Seed demo data:

```bash
pnpm prisma db seed
```

---

## 🚀 Development

Run the API in watch mode:

```bash
pnpm dev
```

* Healthcheck → [http://localhost:3333/health](http://localhost:3333/health)
* Swagger Docs → [http://localhost:3333/docs](http://localhost:3333/docs)

---

## 🧪 Testing

We use Jest + Supertest with a separate test database.

```bash
cp .env.test.example .env.test
pnpm prisma generate
pnpm test
```

---

## 🔑 Example Requests

Register:

```bash
curl -X POST http://localhost:3333/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","name":"You","password":"password123"}'
```

Login:

```bash
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password123"}'
```

Todos:

```bash
# Create
curl -X POST http://localhost:3333/api/todos \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Ship API"}'
```

---

## 📚 Tech Stack

* **Express.js** (API framework)
* **TypeScript**
* **Prisma** ORM (MySQL)
* **Zod** (validation)
* **JWT** (auth)
* **Swagger UI** (API docs)
* **Jest + Supertest** (tests)
* **Docker Compose** (MySQL + Adminer)

---

## ✅ Status

`nodepi` is now fully working with:

* Auth (register, login, refresh, me)
* CRUD Todos
* Validations with friendly error messages
* API docs at `/docs`
* Seeds & tests ready