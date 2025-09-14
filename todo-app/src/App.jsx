import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";

function TOdoList() {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim() === "") return;

        const newTodo = {
            id: crypto.randomUUID(),
            label: newTask,
            completed: false,
        };
        setTasks([...tasks, newTodo]);
        setNewTask("");
    };

    const handleDelete = (item) => {
        const newTask = tasks.filter((task) => task.id !== item.id);
        setTasks(newTask);
    };

    const handleToggle = (id) => {
        const newTable = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed,
                };
            } else {
                return task;
            }
        });
        setTasks(newTable);
    };

    const filterTasks = (tasks, filter) => {
        switch (filter) {
            case "active":
                return tasks.filter((task) => task.completed === false);
            case "completed":
                return tasks.filter((task) => task.completed === true);
            case "all":
                return tasks;
            default:
                return tasks;
        }
    };

    const visibleTasks = filterTasks(tasks, filter);

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Write a task"
                        />
                    </label>
                    <button type="submit">Add Task</button>
                </form>
            </div>

            <div className="filter-buttons">
                <button onClick={() => setFilter("all")}>Toutes</button>
                <button onClick={() => setFilter("active")}>Actives</button>
                <button onClick={() => setFilter("completed")}>Terminées</button>
            </div>

            <ul>
                {visibleTasks.map((task) => (
                    <li key={task.id}>
                        <span
                            style={{
                                textDecoration: task.completed ? "line-through" : "none",
                            }}
                        >
                            {task.label}
                        </span>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggle(task.id)}
                        />
                        <button onClick={() => handleDelete(task)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

function App() {
    useEffect(() => {
        document.title = "🌸 To Do List 🌸";
    }, []);

    return (
        <>
            <div className="App">
                <h1 className="todo">🌸 Todo List 🌸</h1>
            </div>
            <TOdoList />
        </>
    );
}

export default App;