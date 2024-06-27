import React, { useState } from 'react';
import CategoryList from './CategoryList';
import useFetch from "../../../services/useFetch";
import { useAuth } from '../../../services/AuthContext';
import "../../../styles/Home.css";

const Home = () => {
  const { token } = useAuth(); // Access token from AuthContext
  const [categoriesPage, setCategoriesPage] = useState(1);
  const [showCategories, setShowCategories] = useState("ALL");

  function getCategories() {
    return useFetch(`http://localhost:8080/api/categories?page=${categoriesPage}${showCategories == 'ALL' ? '' : `&show=${showCategories}`}`, token);
  }

  const { error, isPending, resCode, data: categories } = getCategories();

  const handlePageSwitch = async (i) => {
    setCategoriesPage(categoriesPage + i);
  }

  const handleShowCategoriesChange = async (str) => {
    setShowCategories(str);
  }

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { categories && <CategoryList categories={categories} categoriesPage={categoriesPage} updateCategories={handlePageSwitch} reachedMaxPage={resCode == 202} categoriesDisplayStr={showCategories} categoriesDisplay={handleShowCategoriesChange} /> }
    </div>
  );
}

export default Home;