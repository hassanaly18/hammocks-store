"use client"

import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-600 p-4 text-white shadow-md'>
        <div className='max-w-6xl mx-auto flex justify-between items-center'>
            <Link href="/">
            <span className='text-2xl font-bold cursor-pointer'>Hammocks Store</span>
            </Link>
            <div className='flex space-x-4'>
                <Link href="/products">
                <span className='cursor-pointer'>Products</span>
                </Link>
                <Link href="/sellerDashboard">
                <span className='cursor-pointer'>Seller Dashboard</span>
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar