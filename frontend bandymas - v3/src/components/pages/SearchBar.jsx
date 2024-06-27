import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../services/AuthContext';
import "../../styles/SearchBar.css";

const SearchBar = () => {
    const { token } = useAuth();
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/api/categories?search=${searchInput.toLowerCase()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSearchResults(response.data);
            } catch (error) {
                setError("Error searching categories. Please try again later.");
                console.error("Error searching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        // Call the fetch function when searchInput changes and is at least 3 characters long
        if (searchInput.length >= 3) {
            fetchSearchResults();
        } else {
            // Clear search results if searchInput is less than 3 characters
            setSearchResults([]);
        }
    }, [searchInput, token]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <div className='search-bar-container'>
            <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Search catgories..."
            />
            {loading && <p></p>}
            {error && <p>{error}</p>}
            <div className='search-results-container'>
                {searchResults.map((category) => (
                    <div key={category.id} className='search-result'>
                        <Link to={`/categories/${category.id}`} className='link-result'>
                            <h3>{category.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;
