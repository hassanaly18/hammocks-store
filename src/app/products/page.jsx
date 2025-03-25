"use client"

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      alert(error.message);
    } else {
      setProducts(data);
    }
  }

  return <div className="min-h-screen p-6 bg-gray-100" >
    <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Products
    </h1>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-black/[0.8] rounded-lg shadow-md p-4">
            <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
            <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-gray-600 font-bold mt-2">${product.price}</p>
          </div>
        ))}
    </div>
  </div>;
};

export default ProductsPage;
