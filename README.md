# Admin Todos

**Admin Todos** is a full-stack web application built with Next.js, Prisma, and PostgreSQL.  
It provides an admin dashboard for managing users, products, shopping carts, and todos.

Key features include:

- User authentication and role management
- CRUD operations for todos
- Product and shopping cart management (shopping cart uses cookies for persistence)
- Responsive sidebar and top menu navigation
- API endpoints for data operations using Next.js Route Handlers
- Server Actions for direct server-side logic and data mutations
- Database seeding for development

This guide outlines the steps to run the application in **development**, **production**, and **staging** environments.

---

## 📋 Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) >= 10
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)  
  (includes **Docker Engine** and **Docker Compose v2**, so no extra installation needed)

---

## ⚠️ Windows-Specific Notes (Docker + PostgreSQL)

If you are developing on Windows, some port ranges are reserved by the system. This can cause Docker containers to fail with errors like: "Error response from daemon: ports are not available..."

To check which TCP ports are reserved by Windows, run:

```powershell
netsh interface ipv4 show excludedportrange protocol=tcp
```

If the default PostgreSQL port (5432) falls within a reserved range, Docker cannot bind to it.

Solution: choose a port outside the reserved ranges and set it in your .env file. For example:

```env
HOST_DB_PORT=5558
```

## 🚀 Development

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start the Database

```bash
docker compose up
```

### 3. Set Up Environment Variables

Copy `.env.template` to `.env` and update the placeholder values with your environment-specific details.

```bash
cp .env.template .env
```

### 4. Set Up Prisma ORM

Run the migrations and generate the Prisma client:

```bash
pnpm exec prisma migrate dev
pnpm exec prisma generate
```

### 5. Start Next.js Development Server

```bash
pnpm run dev
```

### 6. Seed the Database

Open the following endpoint in your browser to seed the database:

```
http://localhost:5000/api/seed
```

Or run via curl:

```bash
curl http://localhost:5000/api/seed
```

### 7. View the Application in your browser

Visit:

```
http://localhost:5000
```

---

## 🏗️ Production

Work in progress: deployment guide coming soon.
(Consider adding Dockerfile, environment variables setup, and reverse proxy instructions.)

---

## 🧪 Staging

Work in progress: deployment guide coming soon.
(Staging usually mirrors production but with separate environment variables and database.)
