import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { getProduct, updateProduct } from "../services/api";
import { ERROR_OCCURRED } from "../constant/error.constant";
import Error from "../components/Error";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching product:", error);
        const errorMessage = error.response?.data?.message || ERROR_OCCURRED;
        setError(errorMessage);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateProduct(id, formData);
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
      const errorMessage = error.response?.data?.message || ERROR_OCCURRED;
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>
      {error && <Error error={error} />}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <ProductForm initialData={product} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default EditProduct;
