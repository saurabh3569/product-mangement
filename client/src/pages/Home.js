import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import { listProduct } from "../services/api";
import Error from "../components/Error";
import { ERROR_OCCURRED } from "../constant/error.constant";

const Home = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listProduct();
        setProducts(response.data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        const errorMessage = error.response?.data?.message || ERROR_OCCURRED;
        setError(errorMessage);
      }
    };
    fetchProducts();
  }, [token]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add New Product
        </Link>
      </div>
      {error ? (
        <Error error={error} />
      ) : (
        <ProductList
          products={products}
          setProducts={setProducts}
          token={token}
        />
      )}
    </div>
  );
};

export default Home;
