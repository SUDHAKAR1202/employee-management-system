Project Overview

The Employee Management Dashboard is a React-based web application designed to manage employee records and visualize key metrics through an interactive dashboard.
It allows users to add, edit, delete, filter, and print employee data while also displaying analytical insights such as employee status summary, sales distribution, and revenue trends.

The application follows a dashboard-style layout with a sidebar and top navigation, providing a clean and user-friendly interface.

Tech Stack Used

Frontend Framework: React

UI Library: Material UI (MUI)

Routing: React Router DOM

Charts & Visualization:

Recharts (Pie, Revenue, Growth charts)

React Simple Maps (Geographical visualization)

Icons: React Icons

State Management: React Hooks (useState, useEffect)

Data Storage: Browser LocalStorage

Styling: Material UI SX props + CSS (including print media styles)

Steps to Run the Project Locally

Clone the repository

git clone https://github.com/your-username/employee-management-dashboard.git


Navigate to the project directory

cd employee-management-dashboard


Install dependencies

npm install


Start the development server

npm start


Open in browser

http://localhost:3000

Assumptions & Design Decisions

The application uses LocalStorage instead of a backend API to simplify setup and focus on frontend logic.

Authentication is mock-based and implemented only for navigation and UI flow.

Charts and maps use static/sample data to demonstrate dashboard visualization capabilities.

Printing functionality is scoped to employee table data only, excluding action columns for clean PDF output.

Responsive design is achieved using Material UI Grid system.

The project is structured to be easily extendable for backend API integration in the future.
