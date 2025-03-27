import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../services/api";
import { ERROR_OCCURRED } from "../constant/error.constant";
import Error from "./Error";

const ProductList = ({ products, setProducts }) => {
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setError(null);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      const errorMessage = error.response?.data?.message || ERROR_OCCURRED;
      setError(errorMessage);
    }
  };

  const formattedDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="overflow-x-auto">
      {error && <Error error={error} />}
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Created At</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Stock</th>
            <th className="py-2 px-4 border-b text-left">Description</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">
                  {formattedDate(product.createdAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">
                  {product.description || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/edit/${product._id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
