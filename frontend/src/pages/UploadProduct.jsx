import React, { useState } from "react";
import axios from "axios";
import {
  Edit,
  Trash2,
  Package,
  Hash,
  Upload,
  Tag,
  Palette,
} from "lucide-react";

const UploadProduct = () => {
  const [data, setData] = useState({
    id: "",
    name: "",
    price: "",
    color: "",
    categoery: "",
  });

  const categoryOptions = [
    "Electronic",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Books",
    "Toy & Games",
    "Sport & Fitness",
    "Grocery",
    "Automative",
    "Stationary & Office Supplies",
  ];

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload-product`,
        {
          id: data.id,
          name: data.name,
          priceMax: data.price,
          color: data.color,
          categoery: data.categoery,
        }
      );

      setData({
        id: "",
        name: "",
        price: "",
        color: "",
        categoery: "",
      });

      console.log(res);
      if (res.status === 201) {
        alert(`${data.name} Added Successfully!`);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="text-center py-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3">
        <Upload className="w-8 h-8 text-blue-400" />
        Upload New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product ID */}
          <div className="space-y-2">
            <label
              htmlFor="id"
              className="flex items-center gap-2 text-slate-300 font-medium"
            >
              <Hash className="w-4 h-4 text-blue-400" />
              Product ID
            </label>
            <input
              type="number"
              name="id"
              value={data.id}
              onChange={(e) => handleChange(e)}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter product ID"
            />
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-slate-300 font-medium"
            >
              <Package className="w-4 h-4 text-emerald-400" />
              Product Name
            </label>
            <input
              type="text"
              value={data.name}
              name="name"
              onChange={(e) => handleChange(e)}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label
              htmlFor="price"
              className="flex items-center gap-2 text-slate-300 font-medium"
            >
              ₹
              Price
            </label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={(e) => handleChange(e)}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              placeholder="Enter price"
            />
          </div>

          {/* Color */}
          <div className="space-y-2">
            <label
              htmlFor="color"
              className="flex items-center gap-2 text-slate-300 font-medium"
            >
              <Palette className="w-4 h-4 text-purple-400" />
              Color
            </label>
            <input
              type="text"
              name="color"
              value={data.color}
              onChange={(e) => handleChange(e)}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter color"
            />
          </div>

          {/* Category */}
          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="categoery"
              className="flex items-center gap-2 text-slate-300 font-medium"
            >
              <Tag className="w-4 h-4 text-orange-400" />
              Category
            </label>
            <select
              name="categoery"
              value={data.categoery}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg  px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            >
              <option value="" className="bg-slate-800">
                Select Category
              </option>
              {categoryOptions.map((cate, idx) => {
                return (
                  <option key={idx} value={cate} className="bg-slate-800">
                    {cate}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            <Upload className="w-5 h-5" />
            Upload Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
