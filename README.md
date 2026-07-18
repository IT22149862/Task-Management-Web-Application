# Simple Task Management Web Application (MERN Stack)

A full-stack task management app built with **MongoDB, Express.js, React.js, and Node.js**.

## Features
- Add tasks with title, description, priority, and due date
- View all tasks in a clean, responsive card layout
- Edit and delete tasks
- Update task status: Pending / In Progress / Completed
- Filter tasks by priority and status
- Client-side and server-side input validation
- Responsive UI (desktop, tablet, mobile)
- Data persisted in MongoDB

## Tech Stack
| Layer      | Technology            |
|------------|------------------------|
| Frontend   | React.js, Axios, CSS   |
| Backend    | Node.js, Express.js    |
| Database   | MongoDB (Mongoose ODM) |

## Project Structure
```
task-manager/
├── backend/
│   ├── config/db.js
│   ├── controllers/taskController.js
│   ├── middleware/validateTask.js
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/index.html
│   ├── src/
│   │   ├── api/taskApi.js
│   │   ├── components/ (TaskForm, TaskList, TaskItem, FilterBar)
│   │   ├── App.js / App.css
│   │   └── index.js / index.css
│   └── package.json
└── README.md
```

## Prerequisites
- Node.js (v18+) and npm installed
- MongoDB installed locally, OR a free MongoDB Atlas cluster
- Git

## 1. Setup MongoDB
**Option A - Local MongoDB**: install MongoDB Community Server and make sure the `mongod` service is running (default URI `mongodb://127.0.0.1:27017`).

**Option B - MongoDB Atlas (cloud, recommended if you don't want to install MongoDB)**:
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster, add a database user, and allow your IP address
3. Click "Connect" → "Drivers" and copy the connection string (looks like `mongodb+srv://user:password@cluster.mongodb.net/taskmanager`)

## 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
Open `.env` and set your MongoDB URI:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
```
(or paste your Atlas connection string)

Run the backend:
```bash
npm run dev
```
You should see:
```
MongoDB connected successfully
Server running on port 5000
```
Test it: open http://localhost:5000/ in your browser — you should see "Task Management API is running".

## 3. Frontend Setup
Open a **new terminal**:
```bash
cd frontend
npm install
npm start
```
The app will open automatically at http://localhost:3000

By default the frontend calls the API at `http://localhost:5000/api/tasks`. If you deploy the backend elsewhere, create a `.env` file in `frontend/` with:
```
REACT_APP_API_URL=https://your-backend-url/api/tasks
```

## 4. Using the App
1. Fill in the "Add New Task" form (title, description, priority, due date) and click **Add Task**
2. Tasks appear as cards on the right
3. Change the **Status** dropdown on any card to update it instantly
4. Click **Edit** to modify a task, or **Delete** to remove it
5. Use the filter dropdowns at the top of the list to filter by priority/status

## API Endpoints
| Method | Endpoint          | Description                     |
|--------|-------------------|----------------------------------|
| GET    | /api/tasks        | Get all tasks (supports `?priority=` & `?status=` query filters) |
| GET    | /api/tasks/:id    | Get a single task               |
| POST   | /api/tasks        | Create a new task                |
| PUT    | /api/tasks/:id    | Update a task (details or status)|
| DELETE | /api/tasks/:id    | Delete a task                    |

## Git & GitHub Setup (Assignment Submission)
1. Create a new repository on GitHub (e.g., `task-management-app`)
2. In your local project folder:
```bash
cd task-manager
git init
git add .
git commit -m "Initial commit: MERN task management app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
3. Create your own submission branch (per assignment instructions):
```bash
git checkout -b <your-name>-submission
git push -u origin <your-name>-submission
```
4. Confirm on GitHub.com that your branch and code appear correctly.

## Deliverables Checklist (per assignment)
- [ ] Working app tested locally (backend + frontend + MongoDB running)
- [ ] Code pushed to your personal Git branch
- [ ] This README included with setup instructions
- [ ] Screenshots of the running app (add to a `/screenshots` folder)
- [ ] 3–5 minute demo video recorded and uploaded to the shared Google Drive folder
- [ ] Submission document (Name, GitHub repo link, branch name) uploaded to Google Drive

## Troubleshooting
- **"Failed to load tasks / Network Error"**: make sure the backend is running on port 5000 and MongoDB is connected.
- **MongoDB connection error**: double-check `MONGO_URI` in `backend/.env`, and that your IP is whitelisted if using Atlas.
- **Port already in use**: change `PORT` in `.env` (backend) or stop the process using that port.
