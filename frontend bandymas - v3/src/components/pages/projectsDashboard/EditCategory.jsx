// EditCategory.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../services/useAuth';
import useFetch from '../../../services/useFetch';

const EditCategory = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  
  const { error, isPending, data: category } = useFetch(
    `http://localhost:8080/api/categories/${id}`,
    token
  );

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSave = () => {
    fetch(`http://localhost:8080/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
    .then(() => {
      navigate(`/list`);
    })
    .catch((err) => {
      console.error(err);
    });
  };

  return (
    <div className="edit-category">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {category && (
        <div>
          <h2>Edit Category</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <button type="button" onClick={handleSave}>Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
