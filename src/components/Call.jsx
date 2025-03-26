import Link from 'next/link'
import React from 'react'

const Call = () => {
  return (
    <section className='text-center py-16 bg-gradient-to-r from-green-500 to-blue-500 text-white'>
        <h2 className='text-3xl font-bold mb-4'>
            Ready to Relax?
        </h2>
        <Link href='/products'  className='bg-white text-blue-400 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200'>
        Shop Now
        </Link>
    </section>
  )
}

export default Call