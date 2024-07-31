# **Student Management System**

## **Project Overview**

Welcome to the **Student Management System**! This application is built using Angular and offers a complete solution for managing student records. Key features include:

- **Create, Read, Update, and Delete (CRUD)** student records
- **User Authentication** for secure access
- **Search Functionality** to quickly find student records

## **Project Structure and Organization**

The project is organized into the following key directories:

- **`src/`**: Contains all source files. 

  - **`components/`**: Contains all Angular components.
    - **`home/`**: The landing page component.
    - **`header/`**: Navigation bar component.
    - **`footer/`**: Footer with copyright information.
    - **`student-list/`**:
      - **Displays** student data in a table
      - **Allows** searching and
      - **Includes** a popup for adding and deleting students
    - **`edit-student/`**: Component for editing student information.
    - **`not-found/`**: 404 error page for invalid routes.
    - **`spinner/`**: Loading indicator for improved user experience.
    - **`Auth/`**:
      - **`login/`**: User login component.
      - **`register/`**: User registration component.

- **`core/`**: Contains core functionalities.

  - **`interfaces/`**: TypeScript interfaces for API interactions.
  - **`api-routes.ts`**: Manages API routes and endpoints.

- **`guards/`**: Route guards for access control.

  - **`auth.guard.ts`**: Manages authentication and route access.

- **`services/`**: Business logic and data management.

  - **`auth.service.ts`**: Handles user authentication.
  - **`student.service.ts`**: Manages CRUD operations for student records.
  - **`language.service.ts`**: Handles localization.

- **`assets/`**: Static files.

  - **`i18n/`**: Localization files.
    - **`ar.json`**: Arabic translations.
    - **`en.json`**: English translations.
  - **`images/`**: Directory for image assets.

- **`environments/`**: Environment-specific settings.

## **Installation Instructions**

To get started with the project, follow these steps:

## **live demo ** https://browser-dusky.vercel.app/
1. **Clone the repository**:

   ```bash
   git clone https://github.com/mahmoudsalah239/studentManagementSystem.git

   ```

2. **Install dependencies**:
   ```bash
      npm install

   ```
3. **Running the Application Locally**:
   ```bash
      ng serve
   ```
