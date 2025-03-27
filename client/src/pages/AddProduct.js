import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/api";
import { ERROR_OCCURRED } from "../constant/error.constant";
import Error from "../components/Error";

const AddProduct = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      await createProduct(formData);
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      const errorMessage = error.response?.data?.message || ERROR_OCCURRED;
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
      {error && <Error error={error} />}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddProduct;
