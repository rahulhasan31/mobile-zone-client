import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllAddUser = () => {
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async() =>{
            const res = await fetch('https://y-alpha-sepia.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });
    
    const handleMakeAdmin = id => {
        fetch(`https://y-alpha-sepia.vercel.app/users/admin/${id}`, {
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
 
    const handleDeleted=user=>{
    fetch(`https://y-alpha-sepia.vercel.app/users/${user._id}`,{
        method: 'DELETE', 
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.deletedCount > 0){
            console.log(data);
            refetch();
            toast.success(`Doctor ${user.name} deleted successfully`)
        }
    })
        
    }
    return (
        <div className='mt-5'>
        <div className='bg-orange-400 w-40  rounded-xl'>
       <h2 className="text-2xl text-center font-bold">All User</h2>
       </div>
        <div className="overflow-x-auto mt-3">
<table className="table w-full">
<thead>
  <tr>
    <th></th>
    <th>Name</th>
    <th>Email</th>
    <th>Role</th>
   
    <th>Delete</th>
  </tr>
</thead>
<tbody>
  {
    users.map((user, i) =><tr key={user._id}>
        <th>{i+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
      
        <td><button onClick={()=>handleDeleted(user)} className='btn btn-xs btn-danger'>Delete</button></td>
      </tr>)
  }
  
</tbody>
</table>
</div>
    </div>
    );
};

export default AllAddUser;