"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'

const ProductDetails = () => {
    const router = useRouter()
    const { id } = router.query
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
    <div className='min-h-screen p-6 bg-gray-100 flex justify-center'>
        <div className=''>
            <img src={product.image_url} alt="" />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
        </div>
    </div>
  )
}

export default ProductDetails