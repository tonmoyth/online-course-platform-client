# 🎓 Online Course & Quiz Platform

A full-stack, multi-role web application that simulates a real-world online learning system with course management, quizzes, role-based access control, and admin governance.


-----
Live Url frontend:
[https://online-course-platform-client.vercel.app/]

-----

Live Url backend:
[https://online-course-platform-server.vercel.app/]

-----
ERD Diagram:
[https://drive.google.com/file/d/1eOgh4dsY9EjQLnQubgpudU7CDyu4WAIE/view?usp=sharing]

---
Admin:
Email: [tonmoynht1930@gmail.com]
Password: [12345678]

-----
Instructor:
Email: [instructor@gmail.com]
Password: [12345678]

----- 
Student:
Email: [student@gmail.com]
Password: [12345678]

## 📌 Project Overview

This platform supports three primary roles:

- 🛠️ **Admin**
- 👨‍🏫 **Instructor**
- 🎓 **Student**

Each role has its own dashboard, permissions, and capabilities.

The system enables:
- Course creation and management
- Student enrollment and learning progress tracking
- MCQ-based quiz system with auto-grading
- Dynamic role & permission management
- Admin approval workflow for users and courses

---

## 🚀 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend    | Next.js |
| Backend     | Node.js + Express.js |
| Database    | PostgreSql |
| Authentication | JWT (Access & Refresh Token) |
| Styling     | Tailwind CSS / MUI (any responsive UI library) |
| File Upload | Multer |

---

## 🧩 Features

### 🔐 Authentication & Authorization
- User registration (Student / Instructor)
- Admin approval system (Pending → Approved / Rejected)
- JWT-based authentication
- Protected routes (Frontend + Backend middleware)
- Role-based access control

---

### 👑 Admin Panel
- Dashboard with system overview:
  - Total users
  - Total courses
  - Enrollments
  - Quiz attempts
- User management:
  - Approve / Reject users
  - Suspend / Reactivate users
  - Edit user profiles
- Role & permission system:
  - Create custom roles
  - Assign permissions (View, Create, Edit, Delete)
- Course moderation:
  - Approve / Reject instructor courses
  - Publish / Unpublish courses

---

### 👨‍🏫 Instructor Panel
- Create & manage courses:
  - Title, description, category, thumbnail
  - Free / Paid courses
- Lesson management:
  - Add multiple lessons
  - Rich text / video / attachments
  - Reorder lessons
- Quiz management:
  - MCQ-based quizzes
  - Time limits & pass percentage
  - View student attempts & scores

---

### 🎓 Student Panel
- Course browsing & filtering
- Course enrollment
- Lesson progress tracking
- Quiz attempts with timer
- Instant result & score analysis
- Attempt history


---

## 🗄️ Database Design (postgresql)

Core entities:
- Users
- Roles
- Permissions
- Courses
- Lessons
- Enrollments
- Quizzes
- Questions
- Quiz Attempts
- Certificates

---

## 🔐 Authentication Flow

1. User registers → status = `PENDING`
2. Admin approves or rejects
3. Approved users can log in
4. JWT token issued (Access + Refresh)
5. Middleware validates protected routes

---

## 📂 Project Structure (Example)
