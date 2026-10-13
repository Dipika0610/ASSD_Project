# TaskBoard

A simple task list app. Add tasks, mark them complete, and delete them. Tasks are
stored in memory and are cleared when the server restarts.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm start
```

Open <http://localhost:3000>. Stop the server with `Ctrl+C`.

## Test

```bash
npm test
```

## Run with Docker Compose

```bash
docker compose up --build
```

Open <http://localhost:3000>. Stop the container with:

```bash
docker compose down
```

## CI/CD Pipeline

The project includes an automated GitHub Actions pipeline in `.github/workflows/ci.yml` that runs on every push and pull request to `main`:

1. **Job 1 (`test`)**: Checks out the code, installs Node.js 20, runs `npm install`, and executes the automated tests (`npm test`).
2. **Job 2 (`docker`)**: Depends on `test` passing (`needs: test`), and verifies the application container image builds successfully with `docker build -t taskboard .`.

## Beginner guide

`docs/ASSD_expalin.pdf` explains the whole project in plain language, with seven pictures: what each tool is for, where every file lives and why, how the app works, and how the Docker and GitHub Actions chains fit together.

