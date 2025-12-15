# Task Manager Web Application

A full-stack web application for managing tasks with CRUD operations, built using React (TypeScript) and Spring Boot, developed with AI assistance.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [AI Development Process](#ai-development-process)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)

## 🎯 Project Overview

This Task Manager application allows users to efficiently manage their tasks through a modern web interface. Users can create, read, update, and delete tasks with various statuses and due dates.  
The application was developed as part of the **Agentic SDLC Fundamentals** training program to demonstrate practical AI-assisted development.

---

## ✨ Features

### Core Functionality
- **Create Tasks**: Add new tasks with title, description, status, and due date  
- **View Tasks**: Display all tasks in a structured table  
- **Update Tasks**: Modify existing tasks  
- **Delete Tasks**: Remove tasks you no longer need  
- **Status Management**: Track tasks with TODO, IN_PROGRESS, and DONE  

### Additional Features
- Client-side + server-side validation  
- Sorting by **status** or **due date**  
- Clean and responsive UI  
- Error banner for backend errors  
- Well-aligned buttons and layout  

---

## 🔧 Tech Stack

### Frontend
- **React 19 (TypeScript)**
- **Vite (Rolldown build)**
- **Custom CSS**
- **Fetch API**

### Backend
- **Spring Boot 3.x**
- **Java 17**
- **Maven**
- **H2 In-Memory Database**
- **Spring Data JPA**
- **Bean Validation**

### Architecture
- REST API  
- MVC structure  
- CORS enabled  

---

## 📁 Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── TaskForm.tsx
│   │   └── TaskList.tsx
│   ├── api.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── types.ts
├── index.html
└── package.json
```

### Backend Structure
```
backend/
└── src/main/java/org/accenture/taskmanager/
    ├── controller/TaskController.java
    ├── model/Task.java
    ├── model/TaskStatus.java
    ├── repository/TaskRepository.java
    ├── exception/GlobalExceptionHandler.java
    └── TaskManagerApplication.java
```

---

## 📋 Prerequisites

- **Node.js**: v18+  
- **npm**: v9+  
- **Java**: JDK 17  
- **Maven**: 3.6+  
- **Git**

---

## 🚀 Installation & Setup

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-manager/backend
   ```

2. Build:
   ```bash
   mvn clean install
   ```

3. Run:
   ```bash
   mvn spring-boot:run
   ```

Backend runs at:  
👉 `http://localhost:8080`

#### Access H2 Console  
- URL: `http://localhost:8080/h2-console`  
- JDBC URL: `jdbc:h2:mem:taskdb`  
- Username: `sa`  
- Password: *(empty)*  

---

### Frontend Setup

1. Navigate:
   ```bash
   cd task-manager/frontend
   ```

2. Install:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

Frontend runs at:  
👉 `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/{id}` | Retrieve a task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |

### Task JSON Example
```json
{
  "id": 1,
  "title": "Complete documentation",
  "description": "Write README for assignment",
  "status": "IN_PROGRESS",
  "dueDate": "2025-12-20"
}
```

---

## 💻 Usage

### Create a Task
- Fill out the form  
- Click **Create**  

### Edit a Task
- Click **Edit**  
- Update fields  
- Click **Save**  

### Delete a Task
- Click **Delete**  
- Confirm action  

### Sort Tasks
- Choose from: None / Status / Due date  

---

## 🤖 AI Development Process

The project was built with active support from an **Agentic AI assistant **, used throughout the SDLC.

### AI-Assisted Activities

#### 1. Architecture & Design
- Suggested API structure  
- Proposed frontend component design  
- Guided folder structure  

#### 2. Code Generation
- Generated React components  
- Generated Spring Boot CRUD controller, model, repository  
- Assisted with validation  

#### 3. Debugging
- Solved TypeScript import/export issues  
- Fixed Vite path resolution errors  
- Resolved Spring Boot `@PathVariable` error  
- Helped adjust UI alignment  

#### 4. Documentation
- Helped structure this README  
- Suggested installation & setup steps  

### Benefits of AI Assistance
- Faster prototyping  
- Improved debugging speed  
- Cleaner documentation  
- Reduced development time  

### Human Oversight
- Reviewing AI-generated code  
- Managing integrations  
- Ensuring UX consistency  
- Validating functional requirements  

---

## 🧪 Testing

### Backend
Run:
```bash
cd backend
mvn test
```

Covers:
- Repository CRUD operations  
- Validation behavior  

### Frontend
```bash
npm run lint
```

---

## 🚀 Future Enhancements

- [ ] Task categories  
- [ ] Search & filtering  
- [ ] Priority levels  
- [ ] Dark mode  
- [ ] PostgreSQL support  
- [ ] Authentication  
- [ ] Deployment (Vercel/Render)  

---

## 👥 Contributors

Developed by **Vinod Byakod**  
With AI collaboration using **Cloude (Agentic AI)**.
