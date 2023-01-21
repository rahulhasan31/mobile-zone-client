import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../LayOut/DashBoardLeyOut/AddProducts/AddProducts";
import MyAddProducts from "../LayOut/DashBoardLeyOut/AddProducts/MyAddProducts/MyAddProducts";
import AllBuyerInfo from "../LayOut/DashBoardLeyOut/AllBuyerInfo/AllBuyerInfo";
import AllSeller from "../LayOut/DashBoardLeyOut/AllSeller";
import AllAddUser from "../LayOut/DashBoardLeyOut/AllUser/AllAddUser";
import DashBoardLayOut from "../LayOut/DashBoardLeyOut/DashBoardLayOut";
import MyProduct from "../LayOut/DashBoardLeyOut/MyProduct/MyProduct";

import Main from "../LayOut/Main";
import Payment from "../LayOut/Payment/Payment";
import Products from "../Page/Categories/Products/Products";
import Home from "../Page/Home";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import Blog from "../Shared/Blog/Blog";
import ErrorPage from "../Shared/ErrorPage";
import AdminRoute from "../Shared/Private/AdminRoute";
import PrivateRouter from "../Shared/Private/PrivateRouter";
import SellerRoute from "../Shared/Private/SellerRoute";

const router=createBrowserRouter([
    {
        path:'/',
        errorElement:<ErrorPage></ErrorPage>,
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            
            },
            {
              path:"/product/:id",
              element:<PrivateRouter><Products></Products></PrivateRouter>,
              loader:({params})=> fetch(`https://y-alpha-sepia.vercel.app/products/${params.id}`)
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<Register></Register>
            },
            {
                path:'blog',
                element:<Blog></Blog>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRouter><DashBoardLayOut></DashBoardLayOut></PrivateRouter>,
        children:[
            {
                path:'/dashboard',
                element:<MyProduct></MyProduct>
                
            },
            {
                path:'/dashboard/users',
                element:<AdminRoute><AllAddUser></AllAddUser></AdminRoute>
                
            },
            {
                path:'/dashboard/seller',
                element:<AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path:'/dashboard/buyer',
                element:<AdminRoute><AllBuyerInfo></AllBuyerInfo></AdminRoute>
            },
            {
                path:'/dashboard/add-product',
                element:<SellerRoute><AddProducts></AddProducts></SellerRoute>
            },
            {
                path:'/dashboard/my-product',
                element:<SellerRoute><MyAddProducts></MyAddProducts></SellerRoute>
            },
            {
                path:'/dashboard/payment/:id',
                element:<Payment></Payment>,
                loader:({params})=>fetch(`https://y-alpha-sepia.vercel.app/bookings/${params.id}`)
            },
            
            
        ]
    }

])


// 1234567












export default router