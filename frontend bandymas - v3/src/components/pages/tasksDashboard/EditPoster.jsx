import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../services/useAuth';

import { useNavigate } from 'react-router-dom';


const EditPoster = () => {
  const { categoryId, posterId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [posterData, setPosterData] = useState({
    name: '',
    description: '',
    price: '',
    city: ''
  });

  useEffect(() => {
    const fetchPosterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/categories/${categoryId}/tasks/${posterId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosterData(response.data);
      } catch (error) {
        console.error('Failed to fetch poster details:', error);
      }
    };

    fetchPosterDetails();
  }, [categoryId, posterId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosterData({ ...posterData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/categories/${categoryId}/tasks/${posterId}`, posterData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/categories/${categoryId}`);
    } catch (error) {
      console.error('Failed to update poster:', error);
      alert('Failed to update poster. Please try again.');
    }
  };

  return (
    <div className="edit-poster">
      <h2>Edit Poster</h2>
      <form onSubmit={handleSubmit}>
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
        <label>Price: </label>
        <input
          type="text"
          name="price"
          value={posterData.price}
          onChange={handleChange}
          required
        />
        <label>City: </label>
        <input
          type="text"
          name="city"
          value={posterData.city}
          onChange={handleChange}
          required
        />
        <div className="form-buttons">
          <button type="submit">Update Poster</button>
        </div>
      </form>
    </div>
  );
};

export default EditPoster;
