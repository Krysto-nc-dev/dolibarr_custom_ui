import React from 'react'
import { useGetProductsQuery } from '../slices/dolibarr/dolliProductApiSlice'

const ShopScreen = () => {

    const {data:products , error: productError , isLoading: productLoading} = useGetProductsQuery({
        mode:"1",
        variant_filter:"1",
        category:"33"
    })
    console.log(products);
  return (
    <div>
        <h1 className='text-primaryColor text-2xl'>Nos produits</h1>
    </div>
  )
}

export default ShopScreen