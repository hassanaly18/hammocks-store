"use client"
import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className='text-center py-20 bg-gradient-to-r from-green-500 to-blue-500 text-white'>
        <h1 className='text-4xl font-bold mb-4'>
            Relax with our Premium Quality Hammocks!
        </h1>
        <p className='text-lg mb-6'>
            Comfortable, Durable and Perfect for Every Adventure..!
        </p>
        <Link href='/products' className="bg-white text-blue-400 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200">
         See Hammocks
        </Link>

    </section>
  )
}

export default Hero