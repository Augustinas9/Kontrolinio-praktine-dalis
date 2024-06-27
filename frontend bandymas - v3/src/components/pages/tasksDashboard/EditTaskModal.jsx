// EditTaskModal.jsx
import React, { useState, useEffect } from 'react';

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const handleSave = () => {
    const updatedTask = { ...task, name, description, priority, status };
    onSave(updatedTask);
    onClose();
  };

  if (!task) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Priority:
            <input
              type="text"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
          <div className="modal-actions">
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
