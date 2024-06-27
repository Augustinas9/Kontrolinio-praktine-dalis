import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../services/useAuth';
import '../../../styles/CreateTask.css';

const CreatePoster = () => {
  const { id: categoryId } = useParams(); // projectId is actually the category (project) ID
  const { token } = useAuth();
  const navigate = useNavigate();
  const [posterData, setPosterData] = useState({
    name: '',
    description: '',
    price: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosterData({ ...posterData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/api/categories/${categoryId}/tasks`, // Keep the endpoint as is, assuming backend uses tasks in the URL
        posterData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      navigate(`/categories/${categoryId}`); // Navigate to CategoryDetails page after task creation
    } catch (error) {
      console.error('Error creating poster:', error);
      alert('Failed to create poster. Please try again.');
    }
  };

  const handleBack = () => {
    navigate(`/categories/${categoryId}`); // Navigate back to CategoryDetails page
  };

  return (
    <div className="create-poster">
      <h1>Create New Poster</h1>
      <form onSubmit={handleSubmit} className="create-poster-form">
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={posterData.name}
          onChange={handleChange}
          required
        />
        <label>Description: </label>
        <textarea
          name="description"
          value={posterData.description}
          onChange={handleChange}
          required
        />
        <div className="form-buttons">
          <button type="submit">Create Poster</button>
          <button type="button" onClick={handleBack}>Cancel</button>
          <button onClick={handleBack} style={{ backgroundColor: '#3b256e', color: 'white', border: 'none', cursor: 'pointer', marginLeft: '151px'}}>Back to Category</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePoster;
