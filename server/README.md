# Online API

Backend for teacher-published activities.

Required production env:
- DATABASE_URL
- ALLOWED_ORIGINS=https://yomismtz.github.io,http://localhost,capacitor://localhost

Run:
npm install
npm start

Endpoints:
POST /api/sessions
GET /api/sessions/:code
PATCH /api/sessions/:code
DELETE /api/sessions/:code
GET /health
