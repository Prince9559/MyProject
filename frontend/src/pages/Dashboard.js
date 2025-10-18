import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/profile");
        setProfile(res.data);

        const taskRes = await API.get("/tasks");
        setTasks(taskRes.data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await API.post("/tasks", { title: newTask });
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">MyApp</h2>
        <nav>
          <a href="/dashboard" className="active">Dashboard</a>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
        </nav>
        
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1>Welcome {profile?.name || "User"} 👋</h1>
        </header>

        <section className="cards">
          <div className="card">
            <h3>User Info</h3>
            <p><b>Email:</b> {profile?.email}</p>
            <p><b>Name:</b> {profile?.name}</p>
          </div>

          <div className="card">
            <h3>Add New Task</h3>
            <div className="task-form">
              <input
                type="text"
                placeholder="Enter task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={addTask}>Add</button>
            </div>
          </div>
        </section>

        <section className="card full-width">
          <h3>Your Tasks</h3>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id}>
                {task.title}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
            {tasks.length === 0 && <p>No tasks found</p>}
          </ul>
        </section>
      </main>
    </div>
  );
}
