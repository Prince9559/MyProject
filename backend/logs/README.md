# Assignment Backend (MySQL - XAMPP)

## Setup
1. Start XAMPP: Apache + MySQL.
2. Create DB `assignment_db` in phpMyAdmin (or update .env).
3. Copy `.env.example` → `.env` and set values.
4. Install and run:
   npm install
   npm run dev

## API
- POST /api/auth/register
- POST /api/auth/login
- GET/PUT /api/profile (protected)
- GET/POST/PUT/DELETE /api/tasks (protected)

Logs: ./logs/access.log
