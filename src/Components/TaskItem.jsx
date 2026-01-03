import React from "react";
import "../App.css";

export default function TaskItem({ task, toggleComplete, deleteTask }) {
  // Decide which timestamp to show
  const timestamp = task.completed ? task.completedAt : task.createdAt;

  // Format the timestamp safely
  const formattedDate = timestamp
    ? `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`
    : "Just now";

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      {/* Task Info Section */}
      <div className="task-info">
        <span className="task-name" style={{ marginRight: "10px" }}>
          {task.name}
        </span>
        <span className="task-date">{formattedDate}</span>
      </div>

      {/* Task Actions Section */}
      <div className="task-actions">
        {/* Show ✔️ button only if task is NOT completed */}
        {!task.completed && (
          <button
            className="btn btn-success btn-sm"
            onClick={() => toggleComplete(task)} // ✅ passing full task
            title="Mark complete"
          >
            ✔️
          </button>
        )}

        {/* Delete button (always visible) */}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteTask(task.id)} // ✅ passing correct task.id
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
