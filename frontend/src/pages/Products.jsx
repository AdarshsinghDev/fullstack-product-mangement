import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Package,
  Hash,
  RefreshCcw,
  SaveIcon,
} from "lucide-react";
import UploadProduct from "./UploadProduct";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Products = () => {
  const [products, setProducts] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    priceMax: "",
    color: "",
  });
  // Edit handler
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setUpdateForm({
      id: product.id,
      name: product.name,
      priceMax: product.priceMax,
      color: product.color,
    });
    setIsPopupOpen(true);
  };

  const handleReFetch = async () => {
    try {
      const res = await axios.get(`${process.env.BACKEND_URL}/api/get-product`);
      const fetchData = res.data.products;
      setProducts(fetchData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleReFetch();
  }, []);

  //update funtion
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.BACKEND_URL}/api/update-product/${selectedProduct.id}`,
        updateForm
      );

      if (res.status == 201) {
        console.log("Update successfully");
        handleReFetch();
        setIsPopupOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete funtion
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.BACKEND_URL}/api/delete-product/${id}`
      );
      if (res.status == 200) {
        alert("Product deleted successfully!");
        handleReFetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <Package className="w-10 h-10 text-blue-400" />
              Product Management
            </h1>
            <p className="text-slate-400 text-lg">
              Manage your products with ease
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
              <UploadProduct />
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full flex  flex-col gap-6 text-center m-8">
            <button
              onClick={handleReFetch}
              type="submit"
              className="m-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <RefreshCcw className="w-5 h-5" />
              Check new product
            </button>
            {/* Stats Footer */}
            {products.length > 0 && (
              <div className=" text-center w-full flex justify-center">
                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-3">
                  <Package className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300">
                    Total Products:{" "}
                    <span className="font-bold text-white">
                      {products.length}
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, id) => {
              return (
                <div
                  key={id}
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-white/15"
                >
                  {/* Serial Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {id + 1}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 p-2 rounded-lg transition-colors duration-200 hover:scale-110 transform"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition-colors duration-200 hover:scale-110 transform"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product ID */}
                  <div className="mb-3 w-fit flex items-center gap-1">
                    <p className="text-slate-400 text-sm mb-1">Product ID</p>
                    <p className="text-white font-mono bg-slate-800/50 px-2 rounded-md text-sm">
                      {product.id}
                    </p>
                  </div>

                  {/* Product Name */}
                  <div className="mb-4">
                    <p className="text-slate-400 text-sm mb-1 flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      Product Name
                    </p>
                    <h2 className="text-xl font-bold text-white leading-tight">
                      {product.name.charAt(0).toUpperCase() +
                        product.name.slice(1)}
                    </h2>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-slate-400 text-sm mb-1 flex items-center gap-1">
                      ₹ Maximum Price
                    </p>
                    <p className="text-2xl font-bold text-emerald-400">
                      ₹{product.priceMax}
                    </p>
                  </div>

                  {/* Action Buttons - Mobile Friendly */}
                  <div className="flex gap-2 mt-4 md:hidden">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">
                No Products Found
              </h3>
              <p className="text-slate-500">
                Start by uploading your first product above
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pop up window when user click on Edit button */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[400px] p-6 relative">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-red-500"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-slate-800">
              Edit Product
            </h2>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <input
                type="text"
                defaultValue={selectedProduct.name}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, name: e.target.value })
                }
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="number"
                defaultValue={selectedProduct.priceMax}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, priceMax: e.target.value })
                }
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                defaultValue={selectedProduct.color}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, color: e.target.value })
                }
                className="border rounded-lg px-3 py-2"
              />

              <button
                type="submit"
                className="bg-blue-600 w-full py-3 flex items-center justify-center text-white rounded-lg hover:bg-blue-700 transition"
              >
                <SaveIcon /> &nbsp; Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
