# Task Manager Web Application

A full-stack web application for managing tasks with CRUD operations, built using **React (TypeScript)** and **Spring Boot**, developed with **Agentic AI assistance** and human oversight.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Testing](#testing)
- [AI Development Process](#ai-development-process)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

The **Task Manager Web Application** enables users to manage tasks through a modern web interface.
Users can create, view, update, delete, and organize tasks with different statuses and due dates.

This project was developed as part of the **Agentic SDLC Fundamentals** training program to demonstrate **AI-assisted, test-driven full-stack development** following industry best practices.

---

## ✨ Features

### Core Functionality
- Create tasks with title, description, status, and due date
- View all tasks in a structured table
- Update tasks (edit form and inline status change)
- Delete tasks with confirmation
- Track task status: TODO, IN_PROGRESS, DONE

### Quality & UX
- Client-side and server-side validation
- Backend service layer for business logic
- Centralized exception handling
- Error banner for backend/API errors
- Sorting by status or due date
- Clean and responsive UI
- Environment-based configuration

---

## 🔧 Tech Stack

### Frontend
- React 19
- TypeScript
- Vite (Rolldown build)
- Fetch API
- Vitest + React Testing Library

### Backend
- Spring Boot 3.x
- Java 17
- Maven
- Spring Data JPA
- H2 In-Memory Database
- Bean Validation

---

## 🏗 Architecture

```
Frontend (React + TS)
        ↓ REST API
Controller Layer
        ↓
Service Layer
        ↓
Repository Layer
        ↓
H2 Database
```

---

## 📁 Project Structure

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── TaskForm.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskForm.test.tsx
│   │   └── TaskList.test.tsx
│   ├── api.ts
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
```

### Backend
```
backend/
├── src/main/java/org/accenture/taskmanager/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   └── exception/
└── src/test/java/org/accenture/taskmanager/
```

---

## 📋 Prerequisites

- Node.js 18+
- npm 9+
- Java JDK 17
- Maven 3.6+

---

## 🚀 Installation & Setup

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs at `http://localhost:8080`

H2 Console:
- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:taskdb
- User: sa
- Password: (empty)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 🌍 Environment Configuration

Frontend API URL is configured using environment variables:

```
VITE_API_URL=http://localhost:8080/api/tasks
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/{id} | Get task by ID |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |

---

## 🧪 Testing

### Backend Tests
- Repository tests (DataJpaTest)
- Service unit tests (Mockito)
- Controller tests (WebMvcTest)
- Integration test (TestRestTemplate)

```bash
cd backend
mvn test
```

### Frontend Tests
- Component tests for TaskForm and TaskList
- Validation and interaction coverage

```bash
cd frontend
npm test
npm run test -- --coverage
```

---

## 🤖 AI Development Process

Agentic AI was used throughout the SDLC for:

- Architecture guidance
- Code generation and refactoring
- Test strategy design
- Debugging TypeScript and Spring Boot issues
- Improving documentation quality

Human oversight ensured correctness, security, and maintainability.

---

## 🚀 Future Enhancements

- Authentication & authorization
- Task categories and priorities
- Search and filtering
- Dark mode
- PostgreSQL support
- Docker & CI/CD pipeline

---

## 👤 Author

**Vinod Byakod**  
Developed with Agentic AI assistance.
