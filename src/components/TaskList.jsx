import { useEffect, useState } from 'react'
import TaskItem from './TaskItem';
import { fetchTasks, addTask, deleteTask, editTask } from '../api/api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    const [error, setError] = useState(null);

    useEffect(() => {
      fetchTasks()
        .then(setTasks)
        .catch(err => setError(err.message));
    }, []);

    function handleChange(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    async function handleAddTask(e) {
        e.preventDefault();
        setError(null);
        
        if (!form.name) {
            setError("Please fill in all fields");
            return;
        }
        
        try {
            await addTask(form);
            setForm({ name: '', description: '' });
            fetchTasks().then(setTasks);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDeleteTask(id) {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    }

    async function handleUpdateTask(id, newTask) {
        const updatedTask = { id, ...newTask };
        await editTask(updatedTask);
        setTasks(tasks.map(task => (task.id === id ? newTask : task)));
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded shadow-md">
            <div className="text-2xl font-bold mb-4">My Tasks</div>
                
            {tasks.length > 0 ? (
                <div className="mb-6">
                    <ul className="space-y-3">
                        {tasks.map((task) => {
                            return (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onDelete={handleDeleteTask}
                                    onUpdate={handleUpdateTask}
                                />
                            )
                        })}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-500 mb-6">No tasks right now.</p>
            )}
            <form
                onSubmit={handleAddTask}
                className="bg-white p-6 rounded shadow-md flex flex-col gap-4 w-full max-w-2xl"
            >
                <input 
                    type="text"
                    name="name"
                    placeholder="Enter a task"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 hover:ring-1 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <textarea
                    name="description"
                    placeholder="Enter a description (optional)"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                    className="border border-gray-300 rounded px-3 py-2 hover:ring-1 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                <button 
                    type="submit"
                    className="bg-blue-600 text-white rounded px-4 py-2 cursor-pointer hover:bg-blue-700 transition"
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default TaskList