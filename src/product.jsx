import React, { useState, useEffect, useRef} from "react";
import "./check.css";
// import {Product} from "./product";

// Define the product component
 export const Product = ({ product }) => {
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleProductClick = (product) => {
    console.log('product is',product);
    closePopup();
    setSelectedProduct(product);
    console.log('selected product is ',selectedProduct);
  };
  const closePopup = () => {
    console.log('close popup');
    setSelectedProduct(null);
  };
  return (
    <>
    <div className="product" onClick={()=>{handleProductClick(product)}}>
      <img src={product.thumbnail} alt="thumbnail" />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <span>${product.price}</span>
      </div>
    </div>
    {selectedProduct && (
      
    <div ref={popupRef} className="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4 border-2">
  <button className="close-button absolute top-2 right-2 text-gray-600" onClick={closePopup}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 bg-white rounded-full border-2 scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
  <div className="image-container w-full h-72 overflow-y-scroll">
    <img src={selectedProduct.thumbnail} alt="thumbnail" className="w-full rounded-lg" />
  </div>
  <div className="product-info mt-4">
    <h3 className="text-xl font-medium text-gray-800">{selectedProduct.title}</h3>
    <p className="text-gray-600">{selectedProduct.description}</p>
    <span className="text-green-600 font-semibold text-lg">${selectedProduct.price}</span>
  </div>
</div>
      )}
    </>
  );
};