import React from 'react';

const ProductsCard = ({product, setProducts}) => {
  console.log(product);
    return (
        <div>
            <div className="card  bg-base-100 shadow-xl" key={product._id}>
            <figure className=''><img src={product.img} alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <h2 className="card-title  text-orange-500">Price:${product.price}</h2>
              <h2>Condition: <span className='text-orange-500'>{product.condition}</span></h2>
              <h2>Location: <span className='text-orange-500'>{product.location}</span></h2>
              <p> {product.details.slice(0,150)}</p>
              <div className="card-actions justify-end">
              <label
               
               onClick={()=>setProducts(product)}  htmlFor="my-modal-3" className="btn btn-warning bg-orange-500">Book Now</label>
              </div>
            </div>
          </div>
        </div>
    );
};

export default ProductsCard;