<div align="center">
  <br />
    <h1 align="center">Task Management Web Application </h1>
     <img src="public/DashboardPage.png" alt="Project Banner">
  <br />

  <div>
    <img alt="Static Badge" src="https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react&logoColor=61DAFB">
        <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
        <img src="https://img.shields.io/badge/Express.js-yellow?style=for-the-badge&logo=express&logoColor=white" alt="express.js" />
    <img alt="Static Badge" src="https://img.shields.io/badge/MongoDB-DarkGreen?style=for-the-badge&logo=mongodb&logoColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">

  </div>


</div>


## <a name="introduction">✨ Introduction</a>

A modern, full‑stack task management web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features secure authentication, complete CRUD operations, search, filter, pagination, and a sleek SaaS‑style UI with various effects, animations, and responsive design.


## 🚀 Live Demo

🔗 **Live URL:** https://your-project-url.com


## <a name="features">✨ Features</a>

👉 **🔐 User Authentication**:  JWT‑based login/register with password hashing.

👉 **📝 Task Management**:  Create, read, update, delete tasks..

👉 **✅ Status Toggle**:  Mark tasks as completed or pending.

👉 **🔍 Search**: Find tasks by title or description (case‑insensitive).

👉 **🏷️ Filter**: Show all, pending, or completed tasks.

👉 **📄 Pagination**: Navigate through tasks (6 per page).

👉 **Modern UI/UX**: Clean, responsive design built with Tailwind CSS and shadcn/ui for a sleek user experience.


## <a name="Bonus Work">Bonus Work (Already Implemented)</a>
- ✅ Search & filter

- ✅ Pagination

- ✅ Deployment ready

## <a name="tech-stack">Tech Stack </a>
| Category | Technologies |
|-----------|-------------|
| 🎨 Frontend | React.js (Vite), Tailwind CSS,  Lucide React, React Hot Toast |
| ⚙️ Backend | Node.js, Express.js, JWT Authentication, bcryptjs |
| 🗄️ Database | MongoDB, Mongoose ODM |
| 🔧 Dev Tools | Git, npm, dotenv,  |

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**1. Cloning the Repository**

```bash
git clone https://github.com/Amit-yadav099/Task-Manager.git
cd Task-Manager
```
The repository should contain two folders: backend and frontend.

<br>

**2. Backend Setup**

```bash
cd backend
npm install
```
*Create a .env file in the backend folder:*
```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager   # or your MongoDB Atlas URI
JWT_SECRET=your_super_secret_key_change_this  # yout JWT secret
```
```bash
npm run dev ## backend runs on http://localhost:5000
```
<br>

**3. Frontend Setup**

Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
```

Create a .env file in the frontend folder:
```bash
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev   # frontend runs on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

## ScreenShots of the pages

**Login and Register Pages**

<img src="public/registerPage.png" alt="register page">
<img src="public/loginPage.png" alt="login page">


<br>
<br>

**Dahboard Page**
<img src="public/DashboardPage.png" alt="dashboard Page">


<br>
<br>

**CRUD operations**
 
Task Creation
<img src="public/TaskCreation.png" alt="creation">

Task deletion
<img src="public/TaskDeletion.png" alt="deletion Task">

Task updation
<img src="public/TaskEditing.png" alt="updation Task">

List of all created Tasks
<img src="public/CreatedTask.png" alt="created Task">
<br>

**Filter**

Pending Task filter
<img src="public/pendingStatus.png" alt="pending">

Completed Task Filter
<img src="public/CompletedStatus.png" alt="completed">

**pagination**
<img src="public/pagination.png" alt="pagination">



  