# Grappy: Scalable Link Sharing Platform (React + MongoDB + Kafka)

Grappy is a Linktree-style platform with:
- React frontend (creator dashboard + public profile pages)
- Node/Express API with JWT auth
- MongoDB for persistent data
- Kafka-based async analytics pipeline (producer + consumer worker)

## Architecture

- **Frontend**: CRA React app (this repo root)
- **API**: `backend/` Express service
- **Worker**: `backend/src/workers/analyticsWorker.js` consumes Kafka events and updates daily aggregates
- **MongoDB**: users, profiles, links, daily_stats
- **Kafka**: `link-events` topic for `profile_view` and `link_click` events

## Folder structure

- `src/` frontend code
- `backend/` API + worker
- `docker-compose.yml` local full-stack deployment
- `Dockerfile.frontend` production frontend image

## Local development

### 1) Frontend
```bash
npm install
cp .env.example .env
npm start
```

### 2) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 3) Analytics worker
```bash
cd backend
npm run worker
```

> Ensure MongoDB and Kafka are running (see Docker section).

## Run everything with Docker Compose

```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:3000`
- API: `http://localhost:4000`
- MongoDB: `localhost:27017`
- Kafka broker: `localhost:9092`

## Environment configuration

### Frontend (`.env` in repo root)
- `REACT_APP_API_URL=http://localhost:4000/api`

### Backend (`backend/.env`)
- `PORT=4000`
- `MONGO_URI=mongodb://mongo:27017/grappy`
- `JWT_SECRET=<strong-secret>`
- `CORS_ORIGIN=http://localhost:3000`
- `KAFKA_BROKERS=kafka:9092`
- `KAFKA_TOPIC=link-events`

## API summary

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/profiles/me`
- `PUT /api/profiles/me`
- `GET /api/profiles/:username`
- `POST /api/links`
- `PUT /api/links/:id`
- `DELETE /api/links/:id`
- `PUT /api/links/reorder`
- `POST /api/analytics/click/:linkId`
- `GET /api/analytics/me`

## Deployment guide

## Option A: VM + Docker Compose
1. Provision VM (2+ CPU, 4–8 GB RAM minimum).
2. Install Docker + Compose plugin.
3. Clone repository.
4. Copy `.env.example` → `.env`, and `backend/.env.example` → `backend/.env`.
5. Change secrets and production URLs.
6. Start services:
   ```bash
   docker compose up -d --build
   ```
7. Put Nginx/Caddy reverse proxy in front (TLS via Let’s Encrypt).

## Option B: Managed cloud services (recommended for scale)
- Frontend: Vercel/Netlify or container service
- API + Worker: ECS/Fargate, GKE, or Render/Railway
- MongoDB: MongoDB Atlas
- Kafka: Confluent Cloud / MSK / Aiven
- Redis (optional, next step): managed Redis for cache/rate limits

### Production scaling tips
- Run API instances horizontally behind load balancer.
- Run multiple analytics worker replicas with one consumer group.
- Create Mongo indexes for username, profileId+position, stats dimensions.
- Add profile payload caching with Redis.
- Separate redirect endpoint as high-throughput stateless service.
- Add observability: OpenTelemetry + centralized logs + dashboards.

## Why Kafka in this implementation?
- Decouples user-facing latency from analytics writes.
- Supports future consumers (fraud detection, recommendations, billing).
- Allows replay/backfill of event streams.

## Seed demo data
```bash
cd backend
npm run seed
```

Creates:
- email: `demo@grappy.app`
- password: `demo1234`
- username: `demo`
