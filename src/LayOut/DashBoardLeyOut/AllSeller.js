import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSeller = () => {

    const {data:sellers=[],refetch }=useQuery({
        queryKey:['users-seller',],
        queryFn: async ()=>{
            const res = await fetch('https://y-alpha-sepia.vercel.app/users-seller')
            const data=res.json()
            return data
        }
    })

    const handleMakeVerify= id => {
      fetch(`https://y-alpha-sepia.vercel.app/users-seller/${id}`, {
       method: 'PUT', 
       headers: {
       authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
      })
      .then(res => res.json())
      .then(data => {
         if(data.modifiedCount > 0){
          toast('make admin successfully')
          refetch();
      }
      })
  }

    return (
        <div className='mt-5'>
               <div>
       <div className='bg-orange-400 w-40  rounded-xl'>
       <h2 className="text-2xl text-center font-bold">All Seller</h2>
       </div>
        <div className="overflow-x-auto mt-3">
<table className="table w-full ">
<thead>
  <tr>
    <th></th>
    <th>Name</th>
    <th>Email</th>
    <th>Role</th>
    <th>Status</th>
    <th>Verify</th>
  </tr>
</thead>
<tbody>
  {
    sellers.map((seller, i) =><tr key={seller._id}>
        <th>{i+1}</th>
        <td>{seller.name}</td>
        <td>{seller.email}</td>
        <td>{seller.role}</td>
        <th>{seller.status}</th>
        <td><button onClick={()=>{handleMakeVerify(seller._id)}} className='btn btn-xs btn-danger'>Verify</button></td>
       
      </tr>)
  }
  
</tbody>
</table>
</div>
    </div>
        </div>
    );
};

export default AllSeller;