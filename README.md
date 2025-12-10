# Student Project Hub

Student Project Hub is a full-stack web application designed to empower students to share personal projects, research topics, and innovative ideas. The backend is built with Django and Django REST Framework and the frontend uses React (Vite) to provide a fast, interactive user experience.

---

## Key features

- Create, edit and share project posts with title, description, media, links and tags
- User profiles with project portfolios and profile information
- Search and filter projects by tags and keywords
- Commenting and simple discussion on project pages
- Upvotes / likes and bookmarking projects
- Admin site for moderation and content management
- REST API for frontend and third-party integrations
- Authentication-ready (token / JWT) and extensible for OAuth/social logins

---

## Tech stack

- Backend: Python, Django, Django REST Framework
- Frontend: React, Vite
- DB: SQLite for development, PostgreSQL recommended for production
- Optional: Docker & Docker Compose for containerized development

---

## Repository layout

- Back-end/
  - django-react/ (Django project and apps)
- Front-end/
  - app/ (React + Vite application)
- README.md (this file)

---

## Prerequisites

- Git
- Python 3.10+ and pip
- Node.js 16+ and npm or yarn
- (Optional) Docker & Docker Compose

---

## Quick start — Backend (development)

1. Open a terminal and change into the backend folder:

   ```bash
   cd Back-end/django-react
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv .venv
   # macOS / Linux
   source .venv/bin/activate
   # Windows (PowerShell)
   .\.venv\Scripts\Activate.ps1
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file (or export env vars). Example `.env`:

   ```
   DJANGO_SECRET_KEY=replace-with-secret
   DEBUG=True
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_HOST=localhost
   DB_PORT=5432
   ```

5. Apply migrations and create a superuser:

   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

6. Run the dev server:

   ```bash
   python manage.py runserver
   ```

The backend dev server defaults to http://localhost:8000.

---

## Quick start — Frontend (development)

1. Change into frontend directory:

   ```bash
   cd Front-end/app
   ```

2. Install dependencies and run dev server:

   ```bash
   npm install
   npm run dev
   # or with yarn
   # yarn
   # yarn dev
   ```

Vite serves by default at http://localhost:5173. Ensure your frontend API base URL (VITE_API_BASE_URL or similar) points to the Django backend (http://localhost:8000 or the API path).

---

## Environment variables

- Backend: place env variables in `Back-end/django-react/.env` or export them. Use libraries such as `django-environ` or `python-dotenv` in settings to load them.
- Frontend: Vite uses `VITE_` prefixed env vars in `Front-end/app/.env` (e.g. `VITE_API_BASE_URL=http://localhost:8000/api/`).

---

## Database

- Development: comes configured for SQLite by default (check Django settings).
- Production: configure PostgreSQL (update envs and settings). Use connection pooling and secure credentials.

---

## Docker (optional)

You can create Dockerfiles for backend and frontend and a `docker-compose.yml` to orchestrate the services:

Example:
```bash
# from repo root
docker-compose up --build
```

(If you’d like, I can help author Dockerfile(s) and docker-compose.yml next.)

---

## Tests

- Backend tests (Django):

  ```bash
  cd Back-end/django-react
  python manage.py test
  ```

- Frontend tests:
  - Depends on chosen test runner (Jest/Vitest). From `Front-end/app` run the configured test command:

  ```bash
  npm test
  # or
  npm run test
  ```

---

## Linting & Formatting

- Backend: add and run tools like `flake8`, `black`, `isort`.
- Frontend: use `eslint`, `prettier`.

Add pre-commit hooks for formatting / linting to keep code consistent.

---

## Deployment (high level)

- Backend: serve with Gunicorn / Uvicorn behind Nginx; configure allowed hosts and environment variables; use PostgreSQL in production; set DEBUG=False.
- Frontend: build static assets (`npm run build`) and serve via CDN, a static server, or integrate into Django static files.
- Use CI for tests and linting; use a secrets manager for production credentials.

---

## Contributing

- Open issues for bugs and feature requests.
- Fork and create feature branches for pull requests.
- Include tests and update documentation for new features.
- Follow code style and add descriptive commit messages.

---

## License

Add a license file (e.g., MIT) in the repository root. If you already have a license, update the section above with the license name.

---

---

If you'd like, I can:
- Create a smaller README variant (one-page quickstart).
- Draft a Docker Compose setup.
- Prepare GitHub Actions workflows for CI.

Tell me which you'd like next and whether you want the README committed to a branch or directly to main.
