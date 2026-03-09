# Task Manager AI Assignment

A full-stack Task Manager application built with React, Node.js, Express, and MongoDB following the MVC pattern. This project demonstrates AI-assisted development using Cursor/Copilot and serves as a learning exercise for AI collaboration in software development.


## ✨ Features

### Core Functionality
- ✅ **Create Tasks** - Add new tasks with title and priority (Low/Medium/High)
- ✅ **Read Tasks** - View all tasks with their current status
- ✅ **Update Tasks** - Mark tasks as complete/incomplete
- ✅ **Delete Tasks** - Remove individual tasks or all completed tasks at once
- ✅ **Filter Tasks** - Filter by All/Active/Completed status

### Technical Features
- ✅ **MVC Architecture** - Clean separation of concerns
- ✅ **RESTful API** - Well-structured endpoints
- ✅ **MongoDB Integration** - Persistent data storage with Mongoose ODM
- ✅ **Input Validation** - Both client-side and server-side validation
- ✅ **Error Handling** - Comprehensive error management
- ✅ **CORS Enabled** - Secure cross-origin requests
- ✅ **Environment Configuration** - Using dotenv for different environments
- ✅ **Proxy Setup** - Development proxy to avoid CORS issues

### UI/UX Features
- ✅ **Priority Badges** - Color-coded priority indicators
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Loading States** - Visual feedback during async operations
- ✅ **Error Messages** - User-friendly error displays
- ✅ **Success Feedback** - Confirmation for successful actions
- ✅ **Filter Controls** - Easy-to-use filter buttons
- ✅ **Task Statistics** - Count of total/active/completed tasks

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM for MongoDB |
| **Express Validator** | Input validation |
| **CORS** | Cross-origin resource sharing |
| **Dotenv** | Environment variables |
| **Nodemon** | Development auto-restart |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React** | UI library |
| **Vite** | Build tool and dev server |
| **CSS3** | Styling |
| **Fetch API** | HTTP requests |

## Project Structure

task-manager-ai-assignment/
├── server/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── models/
│   │   └── Task.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── config/
│       └── db.js
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       └── components/
│           ├── TaskList.jsx
│           ├── TaskForm.jsx
│           ├── TaskItem.jsx
│           └── FilterButtons.jsx
├── code-review.md
├── reflection.md
└── README.md

## 🔧 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/downloads)

### Verify Installation
```bash
node --version     # v14.0.0 or higher
npm --version      # v6.0.0 or higher
mongod --version   # v4.0.0 or higher
git --version      # Any recent version


## 🚀 Installation

Step 1: Clone the Repository
git clone https://github.com/yourusername/task-manager-ai-assignment.git
cd task-manager-ai-assignment

Step 2: Backend Setup
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (if not exists)
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
NODE_ENV=development" > .env

# Verify MongoDB is running
mongod --version

Step 3: Frontend Setup
# Open a new terminal
cd client

# Install dependencies
npm install

## 🏃 Running the Application

Method 1: Development Mode (Recommended)
Terminal 1 - Start MongoDB:
mongod
# Keep this running

Terminal 2 - Start Frontend:
npm run dev

