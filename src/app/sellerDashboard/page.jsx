"use client";

import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      alert(error.message);
    } else {
      console.log(data);
    }
  }

  async function uploadImage(file) {
    const filename = `112-${file.name}`;
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filename, file);

    if (error) {
      alert(error.message);
      return;
    }

    console.log(data);
    return `${
      supabase.storage.from("product-images").getPublicUrl(filename).data
        .publicUrl
    }`;
  }

  async function addProduct() {
    if (!newProduct.imageFile) {
      alert("Please upload an image");
      return;
    }

    const imageUrl = await uploadImage(newProduct.image_url);
    if (!imageUrl) {
      return;
    }

    const productData = { ...newProduct, image_url: imageUrl };
    delete productData.image_url;

    const { data, error } = await supabase
      .from("products")
      .insert([productData]);
    if (error) {
      alert(error.message);
      console.log(error.message);
      console.error(error);
    } else {
      setProducts([...products, data[0]]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        image_url: null,
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Seller Dashboard
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add Product
        </h2>

        <input
          type="text"
          className="border p-2 w-full mb-2 text-gray-600"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              name: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Description"
          className="border p-2 w-full mb-2 text-gray-600"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              description: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Price"
          className="border p-2 w-full mb-2 text-gray-600"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: e.target.value,
            })
          }
        />

        <input
          type="file"
          placeholder="Image"
          className="border p-2 w-full mb-2 text-gray-600"
        //   value={newProduct.image_url}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              image_url: e.target.files[0],
            })
          }
        />

        <button className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-700" onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default SellerDashboard;
