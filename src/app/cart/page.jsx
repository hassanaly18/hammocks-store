"use client";

import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Login to view your cart");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("cart")
      .select("id, quantity, products(name, price, image_url)")
      .eq("user_id", user.id);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setCartItems(data);
    }
  }

  async function removeItem(id){
    await supabase.from("cart").delete().eq("id",id)
    setCartItems(cartItems.filter(item=>item.id !== id))
  }

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Your Cart
        </h1>

        {loading ? (
          <p className="text-center text-gray-800">Loading</p>
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md text-gray-800">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 justify-between border-b pb-4 mb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.products.image_url}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.products.name}</h2>
                    <p className="text-gray-600">${item.products.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>

                <button onClick={()=> removeItem(item.id)} className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-700">
                    Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
