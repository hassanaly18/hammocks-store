"use client";

import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  async function completeOrder(){
    if(cartItems.length ===0){
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    const user = await supabase.auth.getUser();

    if(!user?.data?.user){
      alert("Login to complete your order");
      setLoading(false);
      return;
    }

    const totalPrice = cartItems.reduce((acc, item)=>{
      acc + item.products.price * item.products.quantity
    })

    //Insert into orders table
    const {data: order, error: orderError} = await supabase.from("orders").insert([{
      user_id: user.data.user.id,
      total_price: 800,
    }]).select().single();

    if(orderError){
      alert(orderError.message);
      setLoading(false);
      return;
    }

    const orderItems = cartItems.map((item)=>({
      order_id:order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.products.price,
    }))

    const {error: orderItemsError} = await supabase.from("order_items").insert(orderItems);

    if(orderItemsError){
      alert(orderItemsError.message);
      setLoading(false);
      return;
    }

    supabase.from("cart").delete().neq("id", "");
    setCartItems([]);
    setLoading(false);
    alert("Order completed successfully");
    router.push("/");
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
            <button onClick={completeOrder} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
              {loading ? "Processing..." : "Complete Order"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
