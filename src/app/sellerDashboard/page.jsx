"use client";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageFile: "",
  });
  const [orders, setOrders]= useState([]);

  useEffect(() => {
    // fetchProducts();
    fetchOrders();
  }, []);

  async function fetchOrders(){
    const {data, error} = await supabase.from("orders").select("id, user_id, total_price, order_items(product_id ,price)")

    if(error){
      alert(error.message)
    }
    else{
      setOrders(data);
    }
  }

  // async function fetchProducts() {
  //   const { data, error } = await supabase.from("products").select("*");

  //   if (error) {
  //     alert(error.message);
  //   } else {
  //     console.log(data);
  //   }
  // }

  async function uploadImage(file) {
    if (!file) {
      alert("No file selected.");
      return null;
    }
  
    const filename = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filename, file);
  
    if (error) {
      alert("Image upload failed: " + error.message);
      return null;
    }
  
    return supabase.storage.from("product-images").getPublicUrl(filename).data.publicUrl;
  }
  
  async function addProduct() {
    if (!newProduct.imageFile) {
      alert("Please upload an image");
      return;
    }

    const imageUrl = await uploadImage(newProduct.imageFile); // <-- Use imageFile, not image_url
    if (!imageUrl) {
      alert("Image upload failed");
      return;
    }

    const productData = {
      ...newProduct,
      image_url: imageUrl, // <-- Use the returned URL
    };

    delete productData.imageFile; // <-- Remove file object before inserting into DB

    const { data, error } = await supabase
      .from("products")
      .insert([productData]);

    if (error) {
      alert(error.message);
      console.error(error);
    } else {
      setProducts([...products, data[0]]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        imageFile: null, // Reset imageFile instead of image_url
      });
    }
  }

  return (
    <>
    <div className=" bg-gray-100 p-6">
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
          className="border p-2 w-full mb-2 text-gray-600"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setNewProduct({ ...newProduct, imageFile: e.target.files[0] });
            }
          }}
        />

        <button
          className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-700"
          onClick={addProduct}
        >
          Add Product
        </button>
      </div>
    </div>
    <div className="max-w-4xl mx-auto bg-white text-gray-800 p-6 rounded-lg shadow-md mt-10 mb-10">
      <h2 className="text-2xl font-semibold mb-4 ">
        Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">
          No orders found!
        </p>
      ):(
        orders.map((order)=>(
          <div key={order.id} className="border-b border-gray-700 pb-4 mb-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800">
              Order #{order.id}
            </h3>
            <p className="text-gray-600 mb-2 ">
              User ID: {order.user_id}
            </p>
            <p className="text-gray-600 mb-2 font-semibold">
              Total: ${order.total_price}
            </p>

            <div className="mt-2 mb-2 pl-4">
              {order.order_items.map((item, index)=>(
                <>
                <div className="text-sm text-gray-700 mb-1">
                  -{item.price}
                </div>
                </>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default SellerDashboard;
