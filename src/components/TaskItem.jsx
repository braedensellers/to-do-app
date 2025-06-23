import { useState } from 'react';
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

    return (
        <li>
            {isEditing ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border rounded px-2 py-1"
                    />
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        rows="3"
                        className="border rounded px-2 py-1"
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">Cancel</button>
                    </div>
                </form>
            ) : (
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={!!task.complete}
                            onChange={handleToggleComplete}
                            className="w-5 h-5 cursor-pointer mr-2"
                        />

                        <h4 className="font-bold m-0 flex items-center h-8">{task.name}</h4>

                        <div className="ml-auto flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                aria-label="Edit"
                                className="ml-2 bg-transparent border-none cursor-pointer p-0 text-orange-500 hover:text-orange-600"
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
                        <div className="pl-8 mt-1 text-gray-600 text-sm text-left">{task.description}</div>
                    )}
                </div>
            )}
        </li>
    )
};

export default TaskItem;
