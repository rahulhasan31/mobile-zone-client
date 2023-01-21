import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';

const OrderModal = ({products, setProducts}) => {


    const { user } = useContext(AuthContext);
    const handleOder = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const name = form.name.value;
        const price = form.price.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const location = form.location.value;
    
        const orderProduct = {
           name,
           title,
           price,
            email,
            phone,
            location
            
        }
        console.log(orderProduct);
        
        fetch('https://y-alpha-sepia.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setProducts(null);
                    toast.success('Booking confirmed');
                    // refetch();
                }
                else{
                    toast.error(data.message);
                }
            })

    }
   

    return (

        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{products?.title}</h3>
                    <img src={products?.img} alt="" />
                    <form onSubmit={handleOder} className='grid grid-cols-1 gap-3 mt-10'>
                    
                   
                       <h3>Price</h3>
                        <input type="text" name='price'   disabled value={products?.price} className="input w-full input-bordered " />
                        <input type="text" name='title'  disabled value={products?.title} className="input w-full input-bordered " />
                       
                        <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <input name="location" type="text" placeholder="Your location address" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-warning bg-orange-500 w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>

    );
};

export default OrderModal;