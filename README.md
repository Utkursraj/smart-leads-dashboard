# GigFlow – Smart Leads Dashboard

A production-ready full-stack Lead Management Dashboard built using the MERN stack with TypeScript.

This project was developed as part of the Full Stack Development Internship Assignment for ServiceHive.

---

# Live Demo

## Frontend
https://smart-leads-dashboard-ppkw.onrender.com

## Backend
https://smart-leads-dashboard-backend.onrender.com

## GitHub Repository
https://github.com/Utkursraj/smart-leads-dashboard

---

# Features

## Authentication
- JWT-based authentication
- User registration & login
- Protected routes
- Password hashing with bcrypt
- Persistent login state
- Secure API access

## Lead Management
- Create leads
- Update leads
- Delete leads
- View all leads
- View individual lead details

## Advanced Filtering
- Filter by status
- Filter by source
- Debounced search
- Sort by latest/oldest
- Combined filtering support

## Pagination
- Backend pagination
- 10 records per page
- Pagination metadata support

## CSV Export
- Export leads as CSV
- Secure export for authenticated users

## UI/UX
- Responsive dashboard
- Professional clean UI
- Empty states
- Loading states
- Error handling
- Toast notifications
- Reusable components

## Security
- JWT authorization
- Protected APIs
- User-specific lead visibility
- Role-ready architecture

---

# Tech Stack

## Frontend
- React.js
- TypeScript
- TailwindCSS
- Axios
- React Router DOM
- React Hot Toast

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

## Deployment
- Render
- MongoDB Atlas

---

# Folder Structure

```txt
smart-leads-dashboard/
│
├── client/
│   ├── src/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layout/
│   │   ├── leads/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── utilities/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── validators/
