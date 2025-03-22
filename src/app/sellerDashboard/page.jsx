"use client"

import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'

const SellerDashboard = () => {

    const[products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        image_url: "",
    })
  
    useEffect(() => {
        fetchProducts()
      }, [])

  async function fetchProducts(){
    const {data, error} = await supabase.from("products").select("*")

    if(error){
        alert(error.message)
    }
    else{
        console.log(data)
    }
  }

  async function uploadImage(file){
    const filename = `112-${file.name}`
    const {data, error } = await supabase.storage.from("product-images").upload(filename, file)

    if(error){
        alert(error.message)
        return
    }

    console.log(data)
    return `${supabase.storage.from("product-images").getPublicUrl(filename).data.publicUrl}`;
  }

  async function addProduct(){
    if(!newProduct.image_url){
        alert("Please upload an image")
        return;
    }

    const imageUrl = await uploadImage(newProduct.image_url)
    if(!imageUrl){
      return
    }

    const productData = {...newProduct,
         image_url: imageUrl,
        }
        delete productData.image_url

        const {data, error }= await supabase.from("products").insert([productData])
        if(error){
            alert(error.message)
            console.log(error.message)
            console.error(error)
        }
        else{
            setProducts([
                ...products,
                data[0]
            ])
            setNewProduct({
                name: "",
                description: "",
                price: "",
                image_url: null,
            })

        }
  }
 

  return (
    <div>
        <h1>
            seller dashboard
        </h1>

        <div>
            <h2>
                Add Product
            </h2>

            <input type="text" placeholder='Name' value={newProduct.name} onChange={(e)=>setNewProduct({
                ...newProduct,
                 name: e.target.value
            })}/>

            <input type="text" placeholder='Description' value={newProduct.description} onChange={(e)=>setNewProduct({
                ...newProduct,
                 description: e.target.value
            })}/>

            <input type="text" placeholder='Price' value={newProduct.price} onChange={(e)=>setNewProduct({
                ...newProduct,
                 price: e.target.value
            })}/>

            <input type="file" placeholder='Image' value={newProduct.image_url} onChange={(e)=>setNewProduct({
                ...newProduct,
                 image_url: e.target.value
            })}/>

            <button onClick={addProduct}>
                Add Product
            </button>


        </div>
    </div>
  )
}

export default SellerDashboard