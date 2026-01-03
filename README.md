📝 ReactJS Todo App

This repository contains the code for a modern, real-time Todo application built with ReactJS and Firebase.
It allows users to signup/login, add tasks, mark them as completed, and toggle dark/light mode with smooth animations.

Table of Contents

🤖 Introduction
⚙️ Tech Stack
🔋 Features
🤸 Quick Start
🕸️ Code Snippets to Copy
🔗 Assets
🚀 More
🚨 Tutorial / Learning Resource

🤖 Introduction

ReactJS Todo App is a responsive task management app that stores tasks in Firebase Firestore and uses Firebase Authentication for secure login/signup.

Users can:

Manage tasks in real-time
View pending and completed tasks separately
Switch between light and dark themes
Track task timestamps
If you need help or run into bugs, feel free to open an issue or check the project’s discussions on GitHub.

⚙️ Tech Stack

Frontend: ReactJS, React Router
Backend / Database: Firebase Authentication, Firestore
State Management: React Context API
Styling: CSS3 with animated gradients
Build Tool: Vite

🔋 Features

👉 Authentication: Signup/Login with secure Firebase Email/Password
👉 Task Management:
     1) Add new tasks
     2) Delete tasks
     3) Mark tasks as completed or pending
👉 Task Sections: Automatically separates Pending and Completed tasks
👉 Dark/Light Mode: Toggle between themes with smooth UI transitions
👉 Real-Time Updates: All changes reflect immediately across devices
👉 Responsive Design: Works seamlessly on desktop, tablet, and mobile

🤸 Quick Start

Follow these steps to set up the project locally.
Prerequisites
Make sure you have installed:
  1) Git
  2) Node.js
  3) npm (Node Package Manager)

Cloning the Repository
  -> git clone https://github.com/YOUR_USERNAME/reactjs-todo.git
  -> cd reactjs-todo

Installation
  -> npm install

Set Up Firebase

Create a Firebase project: Firebase Console
Enable Authentication → Email/Password
Enable Firestore Database
Replace firebaseConfig in src/firebase.js with your Firebase project config:

  -> const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
  };

Running the Project
npm run dev

Open http://localhost:5173
 in your browser.

🕸️ Code Snippets to Copy

   1) Firebase config: src/firebase.js
   2) Auth context: src/context/AuthContext.jsx
   3) Login Component: src/Components/Login.jsx
   4) Signup Component: src/Components/Signup.jsx
   5) Todo Component: src/Components/TodoApp.jsx
   6) Task Item Component: src/Components/TaskItem.jsx

🔗 Assets

Background gradients, icons, and UI animations are implemented via CSS in src/App.css.

🚀 More

Enhance this app with additional features:
   1) Task categories and labels
   2) Due dates and reminders
   3) Drag-and-drop task ordering
   4) Offline support with Firestore persistence
   5) Push notifications for deadlines
