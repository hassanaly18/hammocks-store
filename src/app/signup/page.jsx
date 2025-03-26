"use client"

import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup() {
    setLoading(true);

    const response = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (response.error) {
      alert(response.error.message);
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-600">Sign Up Now!</h2>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-3 text-gray-600"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-3 text-gray-600"
          />
          <button className="bg-blue-500 text-white w-full p-2 rounded cursor-pointer hover:bg-blue-700" onClick={handleSignup}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
