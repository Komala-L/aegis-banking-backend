# 🏦 Aegis Banking Backend

A secure and scalable banking backend built with **Node.js**, **Express.js**, and **MongoDB**.

This project is being developed as my primary backend project to demonstrate production-level backend architecture, authentication, transaction processing, ledger accounting, and secure banking APIs.

> 🚧 **Project Status:** Under Development

---

## ✨ Features

### ✅ User Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Cookie-based Authentication
- Protected Routes

### ✅ Account Management
- Create Bank Account
- Multiple Account Types
- Account Status Management
- Automatic Account Number Generation

### 🚧 Transaction System *(In Progress)*
- Money Transfer
- Deposit
- Withdrawal
- Idempotent Transactions
- MongoDB Transactions (Sessions)
- Ledger-based Accounting
- Double Entry Bookkeeping

### 📧 Email Notifications
- Registration Success Email
- Transaction Success Email *(Coming Soon)*
- Transaction Failure Email *(Coming Soon)*

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt
- Cookie Parser

## Email

- Nodemailer
- Gmail OAuth2

## Database

- MongoDB Atlas

## Utilities

- dotenv
- MVC Architecture
- Middleware
- Services
- Utility Functions
- Constants

---

# 📁 Project Structure

```
src/
│
├── config/
│
├── constants/
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── services/
│   └── email/
│       ├── templates/
│       └── email.service.js
│
├── utils/
│
├── app.js
│
server.js
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/Komala-L/aegis-banking-backend.git
```

Go into the project

```bash
cd aegis-banking-backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

EMAIL_USER=your_email@gmail.com

CLIENT_ID=your_client_id

CLIENT_SECRET=your_client_secret

REFRESH_TOKEN=your_refresh_token
```

Run the project

```bash
npm run dev
```

---

# 🔐 Authentication

Protected APIs require either:

- JWT Token
- HTTP-only Cookie

---

# 📚 Current API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|-----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

---

## Accounts

| Method | Endpoint | Description |
|----------|-----------|-------------|
| POST | `/api/accounts/` | Create Account |

---

## Transactions *(Coming Soon)*

| Method | Endpoint | Description |
|----------|-----------|-------------|
| POST | `/api/transactions` | Transfer Money |

---

# 🏗 Architecture

This project follows a layered backend architecture.

- Controllers
- Models
- Routes
- Middleware
- Services
- Utilities
- Constants

The goal is to keep the code modular, reusable, and maintainable.

---

# 🚀 Upcoming Features

- Transaction Processing
- Double Entry Ledger
- MongoDB Transactions
- Account Balance Calculation from Ledger
- Transaction History
- Pagination
- Input Validation
- Rate Limiting
- Logging
- Error Handling Middleware
- Unit Testing
- API Documentation (Swagger)
- Docker Support
- CI/CD

---

# 📈 Development Progress

- ✅ Project Setup
- ✅ MongoDB Configuration
- ✅ User Authentication
- ✅ Registration Email
- ✅ Account Management
- 🚧 Transaction Module
- ⏳ Ledger Processing
- ⏳ Banking APIs
- ⏳ Testing
- ⏳ Deployment

---

# 👨‍💻 Author

**Komala L**

GitHub:
https://github.com/Komala-L

---