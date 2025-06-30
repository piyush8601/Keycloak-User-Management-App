
# Keycloak User Management App (Node.js + Express + EJS)

A modern Node.js application using **Express**, **EJS**, and **Keycloak** as an Identity Provider. It supports:

- Custom **user registration** and **login**
- Integration with **Keycloak Admin API**
- **Role-based access control** (`admin`, `manager`, `employee`, `intern-employee`, `user`)
- **Sessions** for user login tracking
- Beautiful, responsive UI built with **TailwindCSS** and **EJS** templates.

---

## 📁 Project Structure

```
keycloak-registration-app/
├── app.js
├── .env
├── controllers/
│   ├── loginController.js
│   └── registerController.js
├── routes/
│   ├── loginRoutes.js
│   ├── registerRoutes.js
│   └── roleRoutes.js
├── services/
│   └── keycloakService.js
├── middlewares/
│   └── requireRole.js
├── views/
│   ├── register.ejs
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── rolePage.ejs
│   └── success.ejs
```

---

## ⚙️ Prerequisites

- Node.js (v18+ recommended)
- A running **Keycloak** server (v21+)
- A realm configured in Keycloak
- A client with:
  - `client_credentials` flow enabled
  - Service account enabled
  - Assigned roles: `admin`, `manager`, etc.

---

## 📦 Installation

```bash
git clone https://github.com/piyush8601/Keycloak-User-Management-App.git
cd Keycloak-User-Management-App
npm install
```

---

## 🔐 Environment Setup

Create a `.env` file:

```env
KEYCLOAK_BASE_URL=http://localhost:8080
KEYCLOAK_REALM=your-realm
KEYCLOAK_CLIENT_ID=your-admin-client
KEYCLOAK_CLIENT_SECRET=your-client-secret
SESSION_SECRET=your-session-secret
```

---

## 🚀 Running the App

```bash
npm start
# or
node app.js
```

Then open: [http://localhost:5000](http://localhost:5000)

---

## 🔑 Features

### ✅ Registration

- Uses a custom EJS form
- Sends user info to Keycloak Admin API
- Assigns predefined roles (`admin`, `user`, `manager`, etc.)
- Uses email as the username

### ✅ Login

- Validates credentials via Keycloak OpenID endpoint
- Saves access token + user info in session

### ✅ Dashboard

- Displays:
  - Full name
  - Email
  - Access token (copyable)
  - Role-based navigation

### ✅ Role-Based Routing

| Route        | Role Required         |
|--------------|------------------------|
| `/admin`     | `admin`                |
| `/manager`   | `manager`              |
| `/employee`  | `employee`, `intern-employee` |
| `/user`      | Any valid user role    |

All role routes are handled in `routes/roleRoutes.js`.

---

## 📄 Key Files

### `keycloakService.js`

- Auth via `client_credentials`
- User creation, role assignment
- Fetching user info, roles

### `requireRole.js`

Custom middleware for RBAC:

```js
requireRole('admin')        // for single role
requireRole(['user', 'admin']) // for multiple roles
```

### `register.ejs` / `login.ejs`

Beautiful TailwindCSS-powered forms for authentication UI.

---

## 🛠 To Do / Suggestions

- Add password reset flow
- Add email verification logic
- Add profile image support
- Store roles in DB/cache for performance

---

## 🤝 License

MIT © 2025 – Piyush Gupta
