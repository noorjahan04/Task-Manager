import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterButtons from "./components/FilterButtons";
import "./index.css";

const API_URL = "https://task-manager-l68w.onrender.com/api";

function App() {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState("checking");

  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/health`);

      if (!res.ok) throw new Error("Server not responding");

      const data = await res.json();
      console.log(data);

      setServerStatus("connected");
      fetchTasks();

    } catch (err) {
      console.error(err);
      setServerStatus("error");
      setError("Cannot connect to backend server.");
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/tasks`);

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();

      setTasks(data?.data || []);

    } catch (err) {
      console.error(err);
      setTasks([]);
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {

      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
      });

      if (!res.ok) throw new Error("Failed to add task");

      const data = await res.json();

      setTasks(prev => [...prev, data.data]);

      return { success: true };

    } catch (error) {

      console.error("Add task error:", error);

      return {
        success: false,
        error: "Failed to add task"
      };
    }
  };

  const toggleTask = async (id) => {
    try {

      const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: "PATCH"
      });

      const data = await res.json();

      setTasks(prev =>
        prev.map(t => t._id === id ? data.data : t)
      );

    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {

      await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
      });

      setTasks(prev => prev.filter(t => t._id !== id));

    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = (tasks || []).filter(task => {
    if (!task) return false;

    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (serverStatus === "checking") {
    return <div className="app">Connecting to server...</div>;
  }

  if (serverStatus === "error") {
    return (
      <div className="app">
        <h1>Task Manager</h1>
        <p>{error}</p>
        <button onClick={checkServerStatus}>Retry</button>
      </div>
    );
  }

  if (loading) {
    return <div className="app">Loading tasks...</div>;
  }

  return (
    <div className="app">

      <h1>📋 Task Manager</h1>

      {error && <p>{error}</p>}

      <TaskForm onAddTask={addTask} />

      <FilterButtons
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      <TaskList
        tasks={filteredTasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />

      <div className="task-stats">
        Total: {tasks.length} |
        Active: {tasks.filter(t => !t.completed).length} |
        Completed: {tasks.filter(t => t.completed).length}
      </div>

    </div>
  );
}

export default App;