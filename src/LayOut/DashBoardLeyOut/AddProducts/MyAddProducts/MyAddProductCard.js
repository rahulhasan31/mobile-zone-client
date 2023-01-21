import React from 'react';
import { Link } from 'react-router-dom';

const MyAddProductCard = ({product}) => {
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={product?.img} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">
      {product?.title}
      <div className="badge badge-secondary">{product?.condition}</div>
    </h2>
    
    <p className='text-xl text-orange-500 font-medium'>Price:${product?.price}</p>
    <p>{product?.details}</p>
    <div className="card-actions justify-end">
     <Link to={'/'}> <div className="badge badge-outline">Back</div> </Link>
      
    </div>
  </div>
</div>
        </div>
    );
};

export default MyAddProductCard;