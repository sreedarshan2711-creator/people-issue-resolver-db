# People Issue Resolver — MERN Application

A full-stack MERN (MongoDB, Express, React, Node.js) civic grievance portal where citizens can file complaints and admins can manage them.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB running locally on port 27017

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```
Server runs at: http://localhost:5000

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```
App runs at: http://localhost:5173

---

## 🔑 Login Credentials

| Role    | Username | Password  |
|---------|----------|-----------|
| Admin   | admin    | admin123  |
| Citizen | (your mobile number) | (your name) |

Citizen login uses mobile number as identity — no registration needed.

---

## 🗂️ Features

### Citizen
- File complaints with personal details, Aadhaar, issue description, photo upload
- Select authority: Collector, MLA, or Counsellor
- View all submitted complaints and track status

### Admin
- View all complaints with filters (status, authority, search)
- Update complaint status (Pending / In Progress / Resolved / Rejected)
- Add admin notes to complaints
- Delete complaints
- Dashboard stats summary

---

## 📁 Folder Structure

```
people-issue-resolver/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ComplaintForm.jsx
│   │   │   ├── CitizenDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── ComplaintDetails.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ComplaintCard.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── models/
│   │   └── Complaint.js
│   ├── routes/
│   │   └── complaints.js
│   ├── uploads/         ← auto-created on first upload
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🔌 REST API Endpoints

| Method | Endpoint                          | Description                    |
|--------|-----------------------------------|--------------------------------|
| POST   | /api/complaints                   | Create complaint (multipart)   |
| GET    | /api/complaints                   | Get all complaints (admin)     |
| GET    | /api/complaints/:id               | Get single complaint           |
| GET    | /api/complaints/citizen/:mobile   | Get complaints by mobile       |
| PUT    | /api/complaints/:id               | Update status/note             |
| DELETE | /api/complaints/:id               | Delete complaint               |
| GET    | /api/complaints/stats/summary     | Dashboard stats                |

---

## 🧰 Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **File Upload**: Multer
- **Styling**: Custom CSS with CSS Variables
