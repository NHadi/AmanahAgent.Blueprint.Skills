# {Project Name} — Technology Stack

> **Atlas Map: Tech Terrain**
> Languages, frameworks, databases, external services.
> The blueprint generator reads this to produce stack-correct code examples.

## Core Stack

- **Language**: {e.g., Python 3.11+}
- **Framework**: {e.g., FastAPI (async)}
- **ORM**: {e.g., SQLAlchemy 2.0}
- **Validation**: {e.g., Pydantic 2.x}
- **Server**: {e.g., Uvicorn + Gunicorn}
- **Migrations**: {e.g., Alembic}

## Databases

| DB | Purpose | Driver | Env Var |
|----|---------|--------|---------|
| {PostgreSQL} | {App data} | {asyncpg} | `DATABASE_URL` |
| {Redis} | {Cache, queues} | {redis-py} | `REDIS_URL` |

## External Services

| Service | Purpose | How to Call |
|---------|---------|-------------|
| {Stripe} | {Payments} | {SDK name + config location} |
| {SendGrid} | {Email} | {SDK + config} |

## Key Libraries

| Library | Purpose |
|---------|---------|
| {library} | {what it does} |

## Architecture Pattern

```
Client Request
    ↓
{Router Layer}          ← Auth + validation
    ↓
{Service Layer}         ← Business logic
    ↓
{Data Layer}            ← DB, cache, external APIs
```

## Auth Flow

```
{Step 1} → {Step 2} → {Step 3} → User context available
```

## Development Commands

```bash
# Run server
{command}

# Run migrations
{command}

# Run tests
{command}
```
