import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesCard = ({category  }) => {

  console.log(category);
 

    return (
        <div>
         
       <Link to={`/product/${category._id}`}>
       <div className="card  bg-base-100 shadow-xl">
  <figure className="px-10 pt-10 h-96">
    <img src={category.img} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
  <Link to={`/product/${category._id}`}>  <h2 className="card-title text-2xl text-orange-500">{category.name}</h2></Link>
    <p></p>
    <div className="card-actions">
      
    </div>
  </div>
</div>
       </Link>
       
        </div>
    );
};

export default CategoriesCard;