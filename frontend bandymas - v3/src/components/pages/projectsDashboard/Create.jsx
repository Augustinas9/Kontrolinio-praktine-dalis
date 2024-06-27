import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../../services/AuthContext";
import '../../../styles/Create.css';

const Create = () => {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { token } = useAuth(); // Access token from AuthContext

  const validateForm = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Category Name is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const category = { name, status: 'IN_PROGRESS' };

    try {
      await axios.post('http://localhost:8080/api/categories', category, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/list');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create category. Please check your input and try again.');
    }
  }

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  }

  return (
    <div className="create">
      <h1>Create New Category</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category Name: </label>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <button type="submit" onClick={handleSubmit}>Create Category</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default Create;
