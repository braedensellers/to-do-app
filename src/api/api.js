const API_BASE = "http://localhost/task-tracker";

export async function fetchTasks() {
    const res = await fetch(`${API_BASE}/get_tasks.php`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
}

export async function addTask(task) {
    const res = await fetch(`${API_BASE}/add_task.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to add task");
    return data;
}

export async function deleteTask(id) {
    const res = await fetch(`${API_BASE}/delete_task.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to delete task");
    return data;
}

export async function editTask(task) {
    const res = await fetch(`${API_BASE}/edit_task.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to edit task");
    return data;
}
