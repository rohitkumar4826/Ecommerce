// Import React and necessary dependencies
import React, { useState, useEffect} from "react";
import axios from "axios";
import "./check.css";
import { Product } from "./product";
// import {Product} from "./product";

// Define the products screen component
 export const ProductsScreen = () => {
  // State variables to store the products, the current category, and the skip and limit parameters for infinite scrolling
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [skip, setSkip] = useState(0);
  const [limit] = useState(6);
  const [loading, setLoading] = useState(false);
  const [categories] = useState([
    "All",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
  ]);
  // const containerRef = useRef(null);

  let bottomReached = false;
window.addEventListener('scroll', () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const currentPosition = window.scrollY;

  if (currentPosition === scrollableHeight && !bottomReached) {
    console.log('You are at the bottom of the document');
    setSkip(skip + limit);
    bottomReached = true;
  } else if (currentPosition < scrollableHeight) {
    bottomReached = false; // Reset the flag when scrolling up
  }
});

  // Effect hook to fetch the products from the API and set the initial state
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (currentCategory === "All") {
          response = await axios.get(
            `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
          );
        } else {
          response = await axios.get(
            `https://dummyjson.com/products/category/${currentCategory}?skip=${skip}&limit=${limit}`
          );
        }
        const newProducts = response.data.products;
        setProducts([...products, ...newProducts]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [skip, currentCategory]);
    // Function to handle category filtering
    const handleCategoryFilter = (cate) => {
      setCurrentCategory(cate);
      setSkip(0);
      setLoading(true);

      // Use the newly selected category (cate) for filtering
      const fetchProductsByCategory = async () => {
        try {
          if(cate=== "All")
          {
            setProducts([])
            setSkip(0);
            const response = await axios.get(
              `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
            );
            const newProducts = response.data.products;
            setProducts(newProducts ); 
            setLoading(false);
          }else{
            setProducts([]);
          const response = await axios.get(
            `https://dummyjson.com/products/category/${cate}`
          );
          const newProducts = response.data.products;
          setProducts(newProducts ); 
          setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          setLoading(false);
        }
      };

      fetchProductsByCategory();
    };

  // Render the products screen
  return (
    <div className="products-screen">
      <div className="category-filters">
        <div className="horizontal-scroll-container">
          {categories.map((category, index) => (
            <button
              key={index}
              className={currentCategory === category ? "active" : ""}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="products-container">
        {products.map((product,index) => (
          <Product key={product.id} product={product}/>
        ))}
      </div>

      {loading && <div>Loading...</div>}
      
    </div>
  );
};
