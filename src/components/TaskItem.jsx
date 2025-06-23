import { useState } from 'react';
import { MdPriorityHigh } from 'react-icons/md';
import { PiPencil, PiTrash } from 'react-icons/pi';

const TaskItem = ({ task, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(task.name);
    const [newDescription, setNewDescription] = useState(task.description);

    const handleEditToggle = () => {
        setIsEditing(true);
        setNewName(task.name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(task.id, { ...task, name: newName, description: newDescription });
        setIsEditing(false);
    }

    const handleToggleComplete = () => {
        onUpdate(task.id, { ...task, complete: task.complete ? 0 : 1 });
    }

    const handleTogglePriority = () => {
        onUpdate(task.id, { ...task, priority: task.priority ? 0 : 1 });
    }

    return (
        <li className={`
                rounded shadow p-2 mb-3 transition-all hover:shadow-lg 
                ${task.complete ? 'bg-black/10' : task.priority ? 'bg-orange-300/40' : 'bg-white'} 
            }`}
        >
            {isEditing ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border rounded px-2 py-1"
                        placeholder="Enter a task name"
                    />
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        rows="3"
                        className="border rounded px-2 py-1"
                        placeholder="Enter a description (optional)"
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-300 text-black px-3 py-1 rounded cursor-pointer hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={!!task.complete}
                            onChange={handleToggleComplete}
                            className="w-5 h-5 cursor-pointer mr-2 transition-all"
                        />

                        <h4 className={`font-bold m-0 flex items-center h-8 transition-colors ${task.complete ? 'text-black/40 line-through' : ''}`}>
                            {task.name}
                        </h4>

                        <div className="ml-auto flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleTogglePriority}
                                aria-label="Priority"
                                className="ml-2 bg-transparent border-none cursor-pointer p-0 text-orange-500 hover:text-orange-600"
                            >
                                <MdPriorityHigh size={20} />
                            </button>
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                aria-label="Edit"
                                className="bg-transparent border-none cursor-pointer p-0 text-blue-400 hover:text-blue-500"
                            >
                                <PiPencil size={20} />
                            </button>
                            <button
                                type="button"
                                onClick={() => onDelete(task.id)}
                                aria-label="Delete"
                                className="bg-transparent border-none cursor-pointer p-0 text-red-500 hover:text-red-600"
                            >
                                <PiTrash size={20} />
                            </button>
                        </div>
                    </div>
                    {task.description !== '' && (
                        <div className={`
                                pl-8 pr-8 mt-1 text-sm text-left transition-colors max-w-sm text-wrap 
                                ${task.complete ? 'text-gray-600/40 line-through' : 'text-gray-600'}
                            `}
                        >
                            {task.description}
                        </div>
                    )}
                </div>
            )}
        </li>
    )
};

export default TaskItem;
