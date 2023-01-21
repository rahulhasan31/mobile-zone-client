import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdmin from '../../Shared/Hook/useAdmin';
import useSeller from '../../Shared/Hook/useSeller';
import Navbar from '../../Shared/Navbar/Navbar';

const DashBoardLayOut = () => {
  const{user}=useContext(AuthContext)
  const[isAdmin]=useAdmin(user?.email)
  const[isSeller]=useSeller(user?.email)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
   <Outlet></Outlet>
    
  
  </div> 
  <div className="drawer-side ">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu  p-4 w-80  text-base-content ">

      <li className='shadow-2xl mb-3 bg-orange-400  rounded-xl' > <Link to={'/dashboard'}>My Order</Link> </li>
    {
      isAdmin && <>
      <li className='shadow-2xl mb-3 bg-orange-400  rounded-xl' > <Link to={'/dashboard/users'}>All User</Link> </li>
      <li className='shadow-2xl mb-3 bg-orange-400  rounded-xl' > <Link to={'/dashboard/seller'}>All Seller</Link> </li>
      <li className='shadow-2xl mb-3 bg-orange-400  rounded-xl' > <Link to={'/dashboard/buyer'}>All Buyer</Link> </li>
      </>
      
    }
    {
      isSeller &&<>
      <li className='shadow-2xl mb-3 bg-orange-400  rounded-xl' > <Link to={'/dashboard/add-product'}>Add Products</Link> </li>
      <li className='shadow-2xl mb-3 bg-orange-400  rounded-xl' > <Link to={'/dashboard/my-product'}>My Add Products</Link> </li>
      </>
    }
    
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default DashBoardLayOut;