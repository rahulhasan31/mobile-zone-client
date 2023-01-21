

import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import OrderModal from '../../../Shared/OrderModal/OrderModal';
import ProductsCard from './ProductsCard';

const Products = () => {
   
    const data=useLoaderData()
  
   const [product, setProducts]=useState(null)
    

   
        
 
    return (
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 mt-5'>
            
         {
            data?.map(product=> <ProductsCard 
                product={product}
                key={product._id}
                setProducts={setProducts}
            ></ProductsCard>  )
         }
         <div>
            {
                product && <OrderModal
                products={product}
                setProducts={setProducts}
                ></OrderModal>
            }
         </div>
        </div>
    );
};

export default Products;