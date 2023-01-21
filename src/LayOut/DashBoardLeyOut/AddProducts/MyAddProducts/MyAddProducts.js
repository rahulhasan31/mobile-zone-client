import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';
import MyAddProductCard from './MyAddProductCard';

const MyAddProducts = () => {
    const{user}=useContext(AuthContext)

    const {data:product, }=useQuery({
        queryKey:['add-product'],
        queryFn:async ()=>{
          const res=await fetch(`https://y-alpha-sepia.vercel.app/add-products/${user?.email}`)
          const data= await res.json()
          console.log(data);
          return data
        }
    })
   
    
    
    return (
        <div className='grid grid-cols-1 xl:grid-cols-3'>
           {
            product &&  <MyAddProductCard
            product={product}
            ></MyAddProductCard>
           }
        </div>
    );
};

export default MyAddProducts;