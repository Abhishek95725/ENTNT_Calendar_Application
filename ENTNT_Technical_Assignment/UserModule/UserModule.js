import React, { useState, useEffect } from 'react';

const UserModule = () => {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        description: '',
        dueDate: '',
        status: 'Pending',
    });

    useEffect(() => {
        // Fetch tasks from an API
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks'); // Replace with your API endpoint
            const data = await response.json();
            setTasks(data);
        };

        fetchTasks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.id) {
            // Update existing task
            await fetch(`/api/tasks/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        } else {
            // Add new task
            await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        }
        setFormData({
            id: null,
            title: '',
            description: '',
            dueDate: '',
            status: 'Pending',
        });
        fetchTasks(); // Refresh the list
    };

    const handleEdit = (task) => {
        setFormData(task);
    };

    const handleDelete = async (id) => {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        fetchTasks(); // Refresh the list
    };

    return (
        <div>
            <h2>User Module</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                />
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button type="submit">{formData.id ? 'Update Task' : 'Add Task'}</button>
            </form>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> - {task.status}
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserModule;