## AI Assistance

I used an agentic AI tool during the whole development:

- **Architecture & stack decisions**
    - Asked AI to propose a folder structure and choice of tools (Vite + React TS, Spring Boot + H2).
- **Backend code generation**
    - Generated initial versions of `Task` entity, `TaskStatus`, `TaskRepository`, `TaskController`,
      and the global validation error handler.
- **Frontend scaffolding**
    - Generated React components: `TaskForm`, `TaskList`, and the main `App` logic including API calls.
- **Debugging & refactoring**
    - Used AI to clarify CORS configuration, H2 setup, and to simplify state handling (edit vs create) in `App.tsx`.
- **Tests**
    - Asked AI for a minimal example of a Spring Boot repository test.

### Critical reflection

- **Benefits**
    - Saved time on boilerplate (e.g., pom.xml, React form boilerplate).
    - Helped avoid common pitfalls (e.g. Bean Validation annotations, REST error structure).
    - Gave me a consistent data model between frontend and backend.

- **Limitations**
    - AI suggestions sometimes required adjustments (e.g., exact TypeScript types and imports).
    - I had to carefully verify validation rules and error handling to match the assignment.
    - The tool doesn’t know my exact project environment, so some paths and configs needed manual fixes.

- **What I would improve next time**
    - Use AI more for generating tests and documentation earlier.
    - Ask more targeted questions (smaller prompts) for cleaner, focused outputs.
