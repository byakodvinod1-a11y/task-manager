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

This Task Manager application allows users to efficiently manage their tasks through a modern web interface. Users can create, read, update, and delete tasks with various statuses and due dates. The application was developed as part of the Agentic SDLC Fundamentals training program.

## ✨ Features

### Core Functionality
- **Create Tasks**: Add new tasks with title, description, status, and due date
- **View Tasks**: Display all tasks in an organized list
- **Update Tasks**: Edit existing task details and change status
- **Delete Tasks**: Remove completed or unwanted tasks
- **Status Management**: Track tasks through TODO, IN_PROGRESS, and DONE states

### Additional Features
- Form validation with error handling
- Responsive UI design
- Date picker for due dates
- Status dropdown with color-coded indicators
- Real-time updates
- Error message display for API failures

## 🔧 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 (custom styles)
- **HTTP Client**: Fetch API
- **Date Handling**: Native JavaScript Date API

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Build Tool**: Maven
- **Database**: H2 (In-Memory)
- **ORM**: Spring Data JPA
- **Validation**: Bean Validation API

### Architecture
- RESTful API design
- CORS enabled for frontend-backend communication
- MVC pattern with clear separation of concerns

## 📁 Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── TaskForm.tsx      # Task creation/editing form
│   │   ├── TaskList.tsx      # Task list display
│   │   └── api.ts            # API service layer
│   ├── App.tsx               # Main application component
│   ├── App.css               # Application styles
│   ├── main.tsx              # Application entry point
│   └── types.ts              # TypeScript type definitions
├── public/
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Backend Structure
```
backend/
└── src/main/java/org/accenture/taskmanager/
    ├── controller/
    │   └── TaskController.java           # REST API endpoints
    ├── model/
    │   ├── Task.java                     # Task entity
    │   └── TaskStatus.java               # Status enum
    ├── repository/
    │   └── TaskRepository.java           # Data access layer
    ├── exception/
    │   └── GlobalExceptionHandler.java   # Error handling
    └── TaskManagerApplication.java       # Spring Boot main class
```

## 📋 Prerequisites

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Java**: JDK 17 or higher
- **Maven**: 3.6 or higher
- **Git**: For version control

## 🚀 Installation & Setup

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager/backend
   ```

2. **Build the project**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

   The backend server will start on `http://localhost:8080`

4. **Access H2 Console** (Optional)
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:taskdb`
   - Username: `sa`
   - Password: (leave empty)

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd task-manager/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/tasks` | Retrieve all tasks | - |
| GET | `/api/tasks/{id}` | Retrieve task by ID | - |
| POST | `/api/tasks` | Create a new task | Task object |
| PUT | `/api/tasks/{id}` | Update existing task | Task object |
| DELETE | `/api/tasks/{id}` | Delete a task | - |

### Task Object Structure

```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API documentation",
  "status": "IN_PROGRESS",
  "dueDate": "2025-12-20"
}
```

### Validation Rules

- **title**: Required, maximum 100 characters
- **description**: Optional, maximum 500 characters
- **status**: Required, must be one of: TODO, IN_PROGRESS, DONE
- **dueDate**: Optional, must be a valid date

## 💻 Usage

### Creating a Task

1. Fill in the task form with required details
2. Select a status from the dropdown
3. Optionally set a due date
4. Click "Add Task" button

### Updating a Task

1. Click the "Edit" button on any task
2. Modify the task details in the form
3. Click "Update Task" to save changes

### Deleting a Task

1. Click the "Delete" button on the task you want to remove
2. The task will be immediately removed from the list

### Changing Task Status

1. Click "Edit" on a task
2. Select a new status from the dropdown
3. Save the changes

## 🤖 AI Development Process

This project was developed using AI assistance throughout the complete SDLC:

### AI Tools Used
- **Primary Tool**: Claude (Anthropic)
- **Supporting Tool**: [Other AI tool name if applicable]

### AI-Assisted Activities

#### 1. Architecture & Design
- Designed RESTful API structure
- Planned component hierarchy for React frontend
- Decided on project structure and folder organization
- Defined entity relationships and data models

#### 2. Code Generation
- Generated Spring Boot boilerplate code
- Created React components with TypeScript
- Implemented CRUD operations
- Built form validation logic

#### 3. Problem Solving & Debugging
- Resolved CORS configuration issues
- Fixed TypeScript type errors
- Debugged API integration problems
- Optimized component re-rendering

#### 4. Testing & Quality Assurance
- Generated unit tests for repository layer
- Created test cases for API endpoints
- Validated edge cases and error handling

#### 5. Documentation
- Generated comprehensive README
- Documented API endpoints
- Created inline code comments
- Wrote setup instructions

### Benefits of AI Assistance

✅ **Speed**: Reduced development time by ~60%
✅ **Code Quality**: Consistent coding patterns and best practices
✅ **Learning**: Gained insights into Spring Boot and React patterns
✅ **Problem Resolution**: Quick debugging and error resolution
✅ **Documentation**: Comprehensive and well-structured documentation

### Challenges & Limitations

⚠️ **Context Understanding**: Required clear prompts for complex requirements
⚠️ **Testing**: AI-generated tests needed manual verification
⚠️ **Integration**: Some manual adjustments needed for component integration
⚠️ **Best Practices**: Had to verify AI suggestions against industry standards

### Critical Reflection

**What Worked Well:**
- Rapid prototyping and boilerplate generation
- Pattern suggestions for common problems
- Documentation generation
- Explaining complex concepts

**What Needed Human Oversight:**
- Architecture decisions for scalability
- Security considerations
- Performance optimization
- Business logic validation

**Key Learnings:**
- AI is excellent for accelerating development but requires human validation
- Clear, specific prompts yield better results
- AI-generated code should be reviewed and understood, not blindly copied
- Combining AI assistance with human expertise produces the best outcomes

## 🧪 Testing

### Backend Tests

Run backend tests:
```bash
cd backend
mvn test
```

**Test Coverage:**
- Repository layer tests (TaskRepositoryTest.java)
- CRUD operation validation
- Entity constraint validation

### Frontend Testing

Run frontend tests:
```bash
cd frontend
npm test
```

## 🚀 Future Enhancements

- [ ] Task categories and tags
- [ ] Search and filter functionality
- [ ] Task priority levels
- [ ] User authentication and authorization
- [ ] Task assignment to users
- [ ] Notification system for due dates
- [ ] PostgreSQL database integration
- [ ] Deployment to cloud platforms (Vercel, Render)
- [ ] Dark mode support
- [ ] Export tasks to CSV/PDF

## 📝 License

This project is part of the Accenture Agentic SDLC Fundamentals training program.

## 👥 Contributors

Developed by [Your Name] with AI assistance as part of the Agentic SDLC training.

## 📞 Support

For questions or issues, please contact [your-email@example.com]

---

**Acknowledgments**: This project was developed as part of the Accenture Agentic SDLC Fundamentals training program, demonstrating the effective collaboration between human developers and AI tools in modern software development.
