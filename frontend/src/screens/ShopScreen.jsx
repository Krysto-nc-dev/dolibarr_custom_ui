import React from 'react'
import { useGetProductsQuery } from '../slices/dolibarr/dolliProductApiSlice'
import { Loader } from 'lucide-react';

const ShopScreen = () => {

    const { data: products, error: productError, isLoading: productLoading } = useGetProductsQuery({
        mode: "1",
        variant_filter: "1",
        category: "33"
    })
    console.log(products);
    return (
        <>
            <div>
                <h1 className='text-primaryColor text-2xl'>Nos produits</h1>

                <p>
                    Krysto est une entreprise engagée pour un monde meilleur, ou le plastique devient une ressource précieuse plutôt qu'un déchet. Nous vous proposons une gamme de produits fabriqués à partir de plastique recyclé.
                    Nous vous proposons une gamme de produits fabriqués à partir de plastique recyclé. Vous êtes une entreprise, une collectivité ou un particulier, vous souhaitez vous engager pour l'environnement, vous êtes au bon endroit.
                </p>

            </div>

            <section className='mt-10 grid grid-cols-4'>
                {productLoading && <Loader/>}
                {productError && <p className='text-red-300'>Erreur lors du chargement des produits</p>}
                {products && products.map(product => (
                    <div className='card p-4' key={product.ref}>
                        <h1>{product.label}</h1>

                    </div>
                ))}
            </section>
        </>
    )
}

export default ShopScreen