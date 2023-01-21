import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Page/Loading/Loading';

const AllBuyerInfo = () => {
    const {data:users , isLoading}=useQuery({
        queryKey:['user'],
        queryFn:async ()=>{
            const res= await fetch('https://y-alpha-sepia.vercel.app/users-user')
            const data= await res.json()
            return data
        }
        
    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
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
   
  </tr>
</thead>
<tbody>
  {
    users.map((users, i) =><tr key={users._id}>
        <th>{i+1}</th>
        <td>{users.name}</td>
        <td>{users.email}</td>
        <td>{users.role}</td>
    
       
      </tr>)
  }
  
</tbody>
</table>
</div>
    </div>
        </div>
        </div>
    );
};

export default AllBuyerInfo;