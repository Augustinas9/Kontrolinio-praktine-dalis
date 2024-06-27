import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Poster from '../tasksDashboard/Poster';
import CreatePoster from '../tasksDashboard/CreatePoster';
import { useAuth } from '../../../services/useAuth';
import EditPoster from '../tasksDashboard/EditPoster';

const CategoryDetails = () => {
  const { id: categoryId } = useParams();
  const { token } = useAuth();
  const [category, setCategory] = useState(null);
  const [posters, setPosters] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/categories/${categoryId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategory(response.data);
        setIsPending(false);
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };

    const fetchPosters = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/categories/${categoryId}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosters(response.data);
        setIsPending(false);
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };

    fetchCategoryDetails();
    fetchPosters();
  }, [categoryId, token]);

  const onDeletePoster = async (posterId) => {
    try {
      await axios.delete(`http://localhost:8080/api/categories/${categoryId}/tasks/${posterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosters(posters.filter((poster) => poster.id !== posterId));
    } catch (error) {
      console.error('Failed to delete poster:', error);
    }
  };

  const onEditPoster = async (posterId, editedPosterData) => {
    try {
      await axios.put(`http://localhost:8080/api/categories/${categoryId}/tasks/${posterId}`, editedPosterData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosters((prevPosters) =>
        prevPosters.map((poster) => (poster.id === posterId ? { ...poster, ...editedPosterData } : poster))
      );
    } catch (error) {
      console.error('Failed to update poster:', error);
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="category-details">
      {error && <div>{error}</div>}
      {category && (
        <div>
          <h2>Category Details: {category.name}</h2>
        </div>
      )}
      <hr />
      <h3>Posters:</h3>
      {posters.length === 0 && <p>No posters found.</p>}
      <ul className="poster-list">
        {posters.map((poster) => (
          <div key={poster.id} className="poster-item">
            <Poster poster={poster} onDeletePoster={onDeletePoster} />
            <Link to={`/categories/:categoryId/posters/:posterId/edit`} className="edit-link">Edit</Link>
          </div>
        ))}
      </ul>
      <hr />
      <h3>Create New Poster:</h3>
      <CreatePoster />
      <hr />
      <Link to="/list">Back to Categories List</Link>
    </div>
  );
};

export default CategoryDetails;
