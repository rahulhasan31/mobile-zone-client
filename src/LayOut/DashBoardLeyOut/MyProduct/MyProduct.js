import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../../Page/Loading/Loading';

const MyProduct = () => {
    const { user } = useContext(AuthContext)

    const url = `https://y-alpha-sepia.vercel.app/bookings?email=${user?.email}`;

    const { data: bookings , isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='mt-5'>
           <div className='bg-orange-400 w-40  rounded-xl'>
       <h2 className="text-2xl text-center font-bold">MY ORDER</h2>
       </div>
            <div className="overflow-x-auto mt-3">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Model</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Number</th>
                            <th>Location</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                   <tbody>
                        {
                            bookings &&
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.name}</td>
                                <td>{booking.title}</td>
                                <td>{booking.email}</td>
                                <td>{booking.price}</td>
                                <td>{booking.number}</td>
                                <td>{booking.location}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid && <Link
                                            to={`/dashboard/payment/${booking._id}`}
                                        >
                                            <button
                                                className='btn btn-primary btn-sm'
                                            >Pay</button>
                                        </Link>
                                    }
                                    {
                                        booking.price && booking.paid && <span className='text-green-500'>Sold</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProduct;