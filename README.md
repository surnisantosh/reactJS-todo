ReactJS Todo App with Firebase

A modern Todo List application built with ReactJS, Firebase Authentication, and Firestore. This app allows users to sign up, log in, manage tasks, mark them as completed, and toggle between light and dark modes.

Features

User Authentication

Sign up and login with email & password

Firebase handles authentication securely

Task Management

Add, delete, and mark tasks as completed

Tasks are synced in real-time using Firestore

Separate sections for pending and completed tasks

Dark/Light Mode

Toggle between dark and light themes

Smooth animated gradients for both modes

Responsive UI

Works well on desktop and mobile devices

Real-Time Updates

Any changes to tasks are instantly updated across sessions

Screenshots






Tech Stack

Frontend: ReactJS, React Router, CSS3

Backend / Database: Firebase Authentication, Firestore

State Management: React Context API

Deployment: Can be hosted on GitHub Pages, Netlify, or Vercel

Installation

Clone the repository

git clone https://github.com/USERNAME/reactjs-todo.git
cd reactjs-todo


Install dependencies

npm install


Configure Firebase

Create a Firebase project: https://console.firebase.google.com/

Enable Authentication (Email/Password) and Firestore

Replace firebaseConfig in src/firebase.js with your Firebase config

Run the project locally

npm run dev


Open http://localhost:5173 (Vite default) in your browser

Usage

Sign Up: Create a new account using your email and password

Login: Use your registered credentials

Add Tasks: Enter a task and click + to add it

Mark Complete: Click the ✔️ button to mark a task as completed

Delete Tasks: Click the 🗑️ button to remove a task

Dark/Light Mode: Toggle using the button at the top-right

Folder Structure
src/
 ├─ Components/
 │   ├─ Login.jsx
 │   ├─ Signup.jsx
 │   ├─ TodoApp.jsx
 │   └─ TaskItem.jsx
 ├─ context/
 │   └─ AuthContext.jsx
 ├─ firebase.js
 ├─ App.jsx
 ├─ main.jsx
 └─ App.css

Future Improvements

Add task categories or labels

Add due dates and reminders

Implement drag-and-drop reordering

Add offline support using Firestore persistence

Contributing

Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m "Add feature")

Push to the branch (git push origin feature-name)

Create a Pull Request
