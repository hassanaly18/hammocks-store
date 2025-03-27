"use client"

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'

const ProductDetails = () => {
    const router = useRouter()
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        if(id){
            fetchProduct()
        }
    }, [id])

    async function fetchProduct(){
        const {data, error} = await supabase.from("products").select("*").eq("id",id).single()
        if(error){
            alert(error.message)
        }
        else{
            setProduct(data)
        }
    }

    if(!product){
        return <div>Loading...</div>
    }

  return (
    <div className=' p-6 bg-gray-100 flex justify-center'>
        <div className='bg-white p-6 rounded-lg shadow-md max-w-lg w-full'>
            <img src={product.image_url} alt="" className='w-full h-64 object-cover rounded-lg'/>
            <h1 className='text-2xl font-semibold mt-4 text-gray-800'>{product.name}</h1>
            <p className='text-gray-600 mt-2 text-gray-700'>{product.description}</p>
            <p className='text-xl font-bold mt-2 text-gray-800'>${product.price}</p>
        </div>
    </div>
  )
}

export default ProductDetails