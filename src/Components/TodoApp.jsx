import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import "../App.css";

export default function TodoApp() {
  const { currentUser, logout, isAuthReady } = useAuth();
  const navigate = useNavigate();
  const [myTasks, setMyTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState("");

  const tasksCollection = collection(db, "tasks");

  useEffect(() => {
    if (!isAuthReady) return;

    if (currentUser) {
      const q = query(
        tasksCollection,
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );

      //unsubscribe is the cleanup function to stop listening when not needed.
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
            completedAt: data.completedAt ? data.completedAt.toDate() : null,
          };
        });
        setMyTasks(tasks);
      });

      return () => unsubscribe();
    } else {
      setMyTasks([]);
    }
  }, [currentUser, isAuthReady, tasksCollection]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim() || !currentUser) return;

    try {
      const newTaskRef = doc(tasksCollection); // deterministic ID
      await setDoc(newTaskRef, {
        name: newTask.trim(),
        completed: false,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setNewTask("");
    } catch (err) {
      console.error("Add task error:", err);
      setMessage("Could not add task.");
    }
  };

  const deleteTask = async (taskId) => {
    if (!taskId) return;
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (err) {
      console.error("Delete task error:", err);
      setMessage(`Could not delete task: ${err.message}`);
    }
  };

  const toggleCompleteTask = async (task) => {
    if (!task.id) return;
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, {
        completed: !task.completed,
        completedAt: !task.completed ? serverTimestamp() : null,
      });
    } catch (err) {
      console.error("Toggle complete error:", err);
      setMessage("Could not update task.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const renderTasks = (completed) =>
    myTasks
      .filter((task) => task.completed === completed)
      .map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleCompleteTask}
          deleteTask={deleteTask}
        />
      ));

  return (
    <div
      className={`main-body d-flex justify-content-center align-items-center ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      <div className="todo-list-mainDiv">
        <div className="header d-flex justify-content-between align-items-center">
          <h1 className="todo-heading">My To-Do List</h1>
          <button
            className="dark-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Dark/Light Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        <form onSubmit={addTask} className="todo-task-input-div">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new task"
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            required
          />
          <button className="btn btn-primary" id="add-button" type="submit">
            +
          </button>
        </form>
        <h3 className="text-center section-title">To be completed</h3>
        <ul className="tasks-list">{renderTasks(false)}</ul>
        <hr />
        <h3 className="text-center section-title">Completed Tasks</h3>
        <ul className="tasks-list">{renderTasks(true)}</ul>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      {message && (
        <div className="alert-modal">
          <div className="alert-content">
            <p>{message}</p>
            <button onClick={() => setMessage("")}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
