import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../../Page/Loading/Loading';

const AddProducts = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const{user}=useContext(AuthContext)
    const imageHostKey=process.env.REACT_APP_imgbb_key;
console.log(imageHostKey);
    const navigate = useNavigate();
    
    const { data: categories, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('https://y-alpha-sepia.vercel.app/categories');
            const data = await res.json();
            return data;
        }
    })

    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);
                
                const product = {
                    title: data.name, 
                    email: data.email,
                    price:data.price,
                    category_id:data.category,
                    image: imgData.data.url,
                    details:data.details,
                    condition:data.condition ,
                    location:data.location
                }
                console.log(product);

                
                fetch('https://y-alpha-sepia.vercel.app/products', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(product)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result);
                    toast.success(`${data.name} is added successfully`);
                    navigate('/dashboard/add-product')
                })
            }
        })
         
    }


    if(isLoading){
        return <Loading></Loading>
    }



    return (
        <div>
            
            <div className='w-96 p-7'>
            <div className='bg-orange-400 w-45  rounded-xl'>
       <h2 className="text-2xl text-center font-bold">ADD A PRODUCT </h2>
       </div>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Model</span></label>
                    <input type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full max-w-xs input-warning " />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs ">
                    <label className="label"> <span className="label-text">Price</span></label>
                    <input type="text" {...register("price", {
                        required: "price is Required"
                    })} className="input input-bordered w-full max-w-xs input-warning" />
                    {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email" defaultValue={user?.email} {...register("email", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs input-warning" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Category</span></label>
                    <select 
                    {...register('category')}
                    className="select input-bordered w-full max-w-xs input-warning">
                        {
                            categories.map(category =><option
                                key={category._id}
                                value={category._id}
                            >{category.name}</option>)
                        }
                        
                        
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered w-full max-w-xs input-warning" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Details</span></label>
                    <input type="text" {...register("details", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs input-warning" />
                    {errors.details && <p className='text-red-500'>{errors.details.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Location</span></label>
                    <input type="text" {...register("location", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs input-warning" />
                    {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Condition </span></label>
                    <input type="text" {...register("condition", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs input-warning" />
                    {errors.condition  && <p className='text-red-500'>{errors.condition.message}</p>}
                </div>
                <input className='btn btn-warning bg-orange-500 w-full mt-4' value="Add Product" type="submit" />
            </form>
        </div>
        </div>
    );
};

export default AddProducts;