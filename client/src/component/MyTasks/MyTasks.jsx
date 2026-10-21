
import { useState } from "react";

const initialTasks = [
    {
        id: 1,
        title: "Complete project documentation",
        description: "Finish and review the project documents.",
        dueDate: new Date().toLocaleDateString("en-CA"),
        priority: "High",
        completed: false
    },
    {
        id: 2,
        title: "Review assigned work",
        description: "Check the progress of your assigned work.",
        dueDate: new Date().toLocaleDateString("en-CA"),
        priority: "Medium",
        completed: false
    },
    {
        id: 3,
        title: "Prepare weekly report",
        description: "Prepare the weekly progress report.",
        dueDate: new Date().toLocaleDateString("en-CA"),
        priority: "Low",
        completed: true
    }
];

const MyTasks = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [filter, setFilter] = useState("All");

    const toggleTask = (id) => {
        setTasks((previousTasks) =>
            previousTasks.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "Pending") return !task.completed;
        if (filter === "Completed") return task.completed;
        return true;
    });

    const completedCount = tasks.filter(
        (task) => task.completed
    ).length;

    const priorityColor = {
        High: "#f87171",
        Medium: "#facc15",
        Low: "#4ade80"
    };

    return (
        <div
            className="mt-4 p-4 rounded-4 border"
            style={{
                background:
                    "linear-gradient(145deg, rgba(124,58,237,0.12), rgba(0,0,0,0.8))",
                borderColor: "rgba(168,85,247,0.2)"
            }}
        >
            {/* Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                <div>
                    <h5 className="fw-bold mb-1">My Tasks</h5>
                    <small className="text-secondary">
                        Manage your assigned tasks
                    </small>
                </div>

                <span className="text-secondary small">
                    {completedCount} of {tasks.length} completed
                </span>
            </div>

            {/* Progress */}
            <div
                className="progress mb-4"
                style={{ height: "6px", background: "#292033" }}
            >
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                        width: `${
                            tasks.length
                                ? (completedCount / tasks.length) * 100
                                : 0
                        }%`,
                        background: "#a855f7"
                    }}
                    aria-valuenow={completedCount}
                    aria-valuemin="0"
                    aria-valuemax={tasks.length}
                />
            </div>

            {/* Filters */}
            <div className="d-flex gap-2 flex-wrap mb-3">
                {["All", "Pending", "Completed"].map((option) => (
                    <button
                        key={option}
                        type="button"
                        className="btn btn-sm"
                        onClick={() => setFilter(option)}
                        style={{
                            color: filter === option ? "#fff" : "#a1a1aa",
                            background:
                                filter === option
                                    ? "rgba(124,58,237,0.3)"
                                    : "transparent",
                            border: "1px solid rgba(168,85,247,0.25)"
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* Task list */}
            {filteredTasks.length === 0 ? (
                <p className="text-secondary mb-0 py-3">
                    No tasks in this category.
                </p>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            className="d-flex align-items-start gap-3 p-3 rounded-3"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)"
                            }}
                        >
                            <input
                                type="checkbox"
                                className="form-check-input mt-1"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                aria-label={`Mark ${task.title} as ${
                                    task.completed ? "pending" : "completed"
                                }`}
                            />

                            <div className="flex-grow-1">
                                <div
                                    className="fw-semibold"
                                    style={{
                                        color: task.completed
                                            ? "#9ca3af"
                                            : "#fff",
                                        textDecoration: task.completed
                                            ? "line-through"
                                            : "none"
                                    }}
                                >
                                    {task.title}
                                </div>

                                <small className="text-secondary d-block mt-1">
                                    {task.description}
                                </small>

                                <small className="text-secondary d-block mt-2">
                                    <i className="bi bi-calendar3 me-2" />
                                    Due: {task.dueDate}
                                </small>
                            </div>

                            <span
                                className="small rounded-pill px-2 py-1"
                                style={{
                                    color: priorityColor[task.priority],
                                    background: `${priorityColor[task.priority]}18`
                                }}
                            >
                                {task.priority}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTasks;
