import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../services/AuthContext';
import '../../../styles/ProjectList.css';
import useFetch from '../../../services/useFetch';
import axios from 'axios';

const CategoryList = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [categoriesPage, setCategoriesPage] = useState(1);
  const [showCategories, setShowCategories] = useState("ALL");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetchData();
  }, [categoriesPage, showCategories]); // Fetch data when page or showCategories change

  const fetchData = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/categories?page=${categoriesPage}${showCategories === 'ALL' ? '' : `&show=${showCategories}`}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCategories(response.data); // Update categories state with fetched data
      setIsPending(false);
    } catch (error) {
      setError(error.message); // Handle fetch error
      setIsPending(false);
    }
  };

  const handlePageSwitch = (i) => {
    setCategoriesPage(categoriesPage + i);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8080/api/categories/${categoryId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Remove deleted category from categories state
      setCategories(categories.filter(category => category.id !== categoryId));
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <div className="category-list">
      <h2>Categories List</h2>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {!isPending && categories.length === 0 && <div>No categories found.</div>}
      {categories.length > 0 && (
        <div>
          {categories.map((category) => (
            <div className="category-preview" key={category.id}>
              <Link to={`/categories/${category.id}`}>
                <h2>{category.name}</h2>
              </Link>
              <button onClick={() => navigate(`/categories/${category.id}/edit`)}>Update</button>
              <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
            </div>
          ))}
          <div className="pagination-controls">
            <button onClick={() => handlePageSwitch(-1)} disabled={categoriesPage <= 1}>Previous</button>
            <button onClick={() => handlePageSwitch(1)}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
