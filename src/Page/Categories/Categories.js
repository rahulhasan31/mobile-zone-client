import React, { useEffect, useState } from 'react';
import CategoriesCard from './CategoriesCard';
import { useQuery } from '@tanstack/react-query';


const Categories = () => {

    const {data:categories=[],isLoading,  refetch}=useQuery({
        queryKey:['categories'],
        queryFn: async() =>{
            const res = await fetch('https://y-alpha-sepia.vercel.app/categories');
            const data = await res.json();
            return data;
            
        }
        

        
    })
    console.log(categories);


    return (
        <div className='grid grid-cols-1 xl:grid-cols-3 mt-5 gap-4'>
    
       {
        categories.map(category=><CategoriesCard
            category={category}
            key={category._id}
            refetch={refetch}
            isLoading={isLoading}
        ></CategoriesCard>)
       }
         
            
        </div>
    );
};

export default Categories;