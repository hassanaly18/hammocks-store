"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [addingProduct, setAddingProduct] = useState(null);

  const router = useRouter();

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

  async function addToCart(productId) {
    // setLoading(true);
    setAddingProduct(productId);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Login to add to cart");
      // setLoading(false);
      setAddingProduct(null);
      return;
    }

    const { error } = await supabase
      .from("cart")
      .insert({ user_id: user.id, product_id: productId });

    // setLoading(false);
    setAddingProduct(null);

    if (error) {
      alert(error.message);
    } else {
      alert("Product added to cart successfully!");
    }
  }

  function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filtered = products.filter((product) => {
      return product.name.toLowerCase().includes(query);
    });
    setFilteredProducts(filtered);
    console.log(filtered);
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Products
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-black/[0.8] rounded-lg shadow-md p-4"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-gray-600 font-bold mt-2">${product.price}</p>

            <div className="flex gap-2 mt-4">
              <button
                className="bg-blue-500 text-white flex-1 p-2 rounded cursor-pointer hover:bg-blue-700"
                onClick={() => addToCart(product.id)}
              >
                {addingProduct === product.id
                  ? "Adding to cart..."
                  : "Add to cart"}
              </button>
              <button className="bg-green-500  text-white flex-1 p-2 rounded cursor-pointer hover:bg-green-800"
              onClick={() => router.push(`/products/${product.id}`)}
              >
                View more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
