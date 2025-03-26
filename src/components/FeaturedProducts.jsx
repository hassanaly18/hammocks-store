import React from 'react'

const FeaturedProducts = () => {
  return (
    <section className='py-16 bg-gray-100'>
        <h2 className='text-3xl text-center font-bold mb-8'>
            Our Best Selling Hammocks
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 px-6'>
            <div className='p-4 bg-white rounded-lg shadow'>
                Cozy Hammock -$59.99
            </div>
            <div className='p-4 bg-white rounded-lg shadow'>
                Cozy Hammock -$59.99
            </div>
            <div className='p-4 bg-white rounded-lg shadow'>
                Cozy Hammock -$59.99
            </div>
        </div>
    </section>
  )
}

export default FeaturedProducts